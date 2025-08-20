import { writable, type Writable } from 'svelte/store';

/**
 * SvelteKit TypeScript API Fetch Helper
 * Optimized untuk SvelteKit dengan full TypeScript support
 */

// Types
export interface ApiResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: Record<string, string>;
    url: string;
}

export interface ApiRequestOptions extends RequestInit {
    timeout?: number;
    retries?: number;
    retryDelay?: number;
    baseURL?: string;
}

export interface ApiClientConfig {
    baseURL: string;
    timeout?: number;
    retries?: number;
    retryDelay?: number;
    headers?: Record<string, string>;
}

export interface QueryParams {
    [key: string]: string | number | boolean | null | undefined;
}

// Custom Error Classes
export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public statusText: string,
        public url: string,
        public data?: any
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export class NetworkError extends Error {
    constructor(message: string, public url: string) {
        super(message);
        this.name = 'NetworkError';
    }
}

export class TimeoutError extends Error {
    constructor(message: string, public url: string, public timeout: number) {
        super(message);
        this.name = 'TimeoutError';
    }
}

// Default configuration
const DEFAULT_CONFIG: Required<Omit<ApiRequestOptions, keyof RequestInit>> = {
    timeout: 10000,
    retries: 3,
    retryDelay: 1000,
    baseURL: '',
};

// Utility functions
const sleep = (ms: number): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, ms));

const isRetryableError = (error: Error, status?: number): boolean | undefined | number => {
    if (error instanceof NetworkError || error instanceof TimeoutError) {
        return true;
    }
    if (error instanceof ApiError) {
        return status === 408 || status === 429 || (status && status >= 500);
    }
    return false;
};

/**
 * Build query string dari object parameters
 */
export function buildQueryString(params: QueryParams): string {
    if (!params || typeof params !== 'object') return '';

    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
        if (value !== null && value !== undefined) {
            searchParams.append(key, value.toString());
        }
    }

    const queryString = searchParams.toString();
    return queryString ? `?${queryString}` : '';
}

/**
 * Main API request function
 */
export async function apiRequest<T = any>(
    url: string,
    options: ApiRequestOptions = {}
): Promise<ApiResponse<T>> {
    const config = {
        timeout: DEFAULT_CONFIG.timeout,
        retries: DEFAULT_CONFIG.retries,
        retryDelay: DEFAULT_CONFIG.retryDelay,
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    const { timeout, retries, retryDelay, baseURL, ...fetchOptions } = config;
    const fullUrl = baseURL ? `${baseURL.replace(/\/$/, '')}/${url.replace(/^\//, '')}` : url;

    let lastError: Error;

    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeout);

            const response = await fetch(fullUrl, {
                ...fetchOptions,
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            if (!response.ok) {
                let errorData: any = null;
                try {
                    const contentType = response.headers.get('content-type');
                    if (contentType?.includes('application/json')) {
                        errorData = await response.json();
                    } else {
                        errorData = await response.text();
                    }
                } catch {
                    // Ignore parse error
                }

                throw new ApiError(
                    `HTTP ${response.status}: ${response.statusText}`,
                    response.status,
                    response.statusText,
                    fullUrl,
                    errorData
                );
            }

            // Parse response based on content type
            const contentType = response.headers.get('content-type');
            let data: T;

            if (contentType?.includes('application/json')) {
                data = await response.json();
            } else if (contentType?.includes('text/')) {
                data = await response.text() as unknown as T;
            } else {
                data = await response.blob() as unknown as T;
            }

            return {
                data,
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries()),
                url: response.url,
            };

        } catch (error) {
            let lastError: Error | null = null;
            if (error instanceof Error) {
                lastError = error;

                // Handle AbortError (timeout)
                if (error.name === 'AbortError') {
                    lastError = new TimeoutError(
                        `Request timeout after ${timeout}ms`,
                        fullUrl,
                        timeout
                    );
                }

                // Handle network errors
                if (error instanceof TypeError && error.message.includes('fetch')) {
                    lastError = new NetworkError(`Network error: ${error.message}`, fullUrl);
                }

                // Don't retry client errors (except 408, 429)
                if (error instanceof ApiError && !isRetryableError(error, error.status)) {
                    throw error;
                }
            }

            if (attempt < retries && lastError && isRetryableError(lastError)) {
                await sleep(retryDelay);
                continue;
            }
        }
    }

    throw lastError!;
}

/**
 * HTTP Method Helpers
 */

export async function apiGet<T = any>(
    url: string,
    params?: QueryParams,
    options?: ApiRequestOptions
): Promise<ApiResponse<T>> {
    const queryString = params ? buildQueryString(params) : '';
    const fullUrl = `${url}${queryString}`;

    return apiRequest<T>(fullUrl, {
        method: 'GET',
        ...options,
    });
}

export async function apiPost<T = any, D = any>(
    url: string,
    data?: D,
    options?: ApiRequestOptions
): Promise<ApiResponse<T>> {
    return apiRequest<T>(url, {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
        ...options,
    });
}

export async function apiPut<T = any, D = any>(
    url: string,
    data?: D,
    options?: ApiRequestOptions
): Promise<ApiResponse<T>> {
    return apiRequest<T>(url, {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
        ...options,
    });
}

export async function apiPatch<T = any, D = any>(
    url: string,
    data?: D,
    options?: ApiRequestOptions
): Promise<ApiResponse<T>> {
    return apiRequest<T>(url, {
        method: 'PATCH',
        body: data ? JSON.stringify(data) : undefined,
        ...options,
    });
}

export async function apiDelete<T = any>(
    url: string,
    options?: ApiRequestOptions
): Promise<ApiResponse<T>> {
    return apiRequest<T>(url, {
        method: 'DELETE',
        ...options,
    });
}

/**
 * API Client Class
 */
export class ApiClient {
    private config: ApiClientConfig;

    constructor(config: ApiClientConfig) {
        this.config = {
            timeout: DEFAULT_CONFIG.timeout,
            retries: DEFAULT_CONFIG.retries,
            retryDelay: DEFAULT_CONFIG.retryDelay,
            ...config,
            baseURL: config.baseURL.replace(/\/$/, ''),
        };
    }

    private buildUrl(endpoint: string): string {
        return `${this.config.baseURL}/${endpoint.replace(/^\//, '')}`;
    }

    private getOptions(options: ApiRequestOptions = {}): ApiRequestOptions {
        return {
            ...this.config,
            ...options,
            headers: {
                ...this.config.headers,
                ...options.headers,
            },
        };
    }

    async request<T = any>(endpoint: string, options?: ApiRequestOptions): Promise<ApiResponse<T>> {
        return apiRequest<T>(this.buildUrl(endpoint), this.getOptions(options));
    }

    async get<T = any>(
        endpoint: string,
        params?: QueryParams,
        options?: ApiRequestOptions
    ): Promise<ApiResponse<T>> {
        const queryString = params ? buildQueryString(params) : '';
        const url = `${this.buildUrl(endpoint)}${queryString}`;

        return apiRequest<T>(url, this.getOptions({
            method: 'GET',
            ...options,
        }));
    }

    async post<T = any, D = any>(
        endpoint: string,
        data?: D,
        options?: ApiRequestOptions
    ): Promise<ApiResponse<T>> {
        return apiRequest<T>(this.buildUrl(endpoint), this.getOptions({
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined,
            ...options,
        }));
    }

    async put<T = any, D = any>(
        endpoint: string,
        data?: D,
        options?: ApiRequestOptions
    ): Promise<ApiResponse<T>> {
        return apiRequest<T>(this.buildUrl(endpoint), this.getOptions({
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined,
            ...options,
        }));
    }

    async patch<T = any, D = any>(
        endpoint: string,
        data?: D,
        options?: ApiRequestOptions
    ): Promise<ApiResponse<T>> {
        return apiRequest<T>(this.buildUrl(endpoint), this.getOptions({
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined,
            ...options,
        }));
    }

    async delete<T = any>(
        endpoint: string,
        options?: ApiRequestOptions
    ): Promise<ApiResponse<T>> {
        return apiRequest<T>(this.buildUrl(endpoint), this.getOptions({
            method: 'DELETE',
            ...options,
        }));
    }

    setHeader(key: string, value: string): void {
        if (!this.config.headers) {
            this.config.headers = {};
        }
        this.config.headers[key] = value;
    }

    setAuth(token: string, type: string = 'Bearer'): void {
        this.setHeader('Authorization', `${type} ${token}`);
    }

    updateConfig(newConfig: Partial<ApiClientConfig>): void {
        this.config = { ...this.config, ...newConfig };
    }
}

/**
 * Factory function untuk membuat API client
 */
export function createApiClient(config: ApiClientConfig): ApiClient {
    return new ApiClient(config);
}

/**
 * Svelte Store Integration
 */

export interface ApiState<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

export function createApiStore<T = any>(): {
    subscribe: Writable<ApiState<T>>['subscribe'];
    execute: (apiCall: () => Promise<ApiResponse<T>>) => Promise<void>;
    reset: () => void;
} {
    const initialState: ApiState<T> = {
        data: null,
        loading: false,
        error: null,
    };

    const store = writable<ApiState<T>>(initialState);

    return {
        subscribe: store.subscribe,
        async execute(apiCall: () => Promise<ApiResponse<T>>) {
            store.update(state => ({ ...state, loading: true, error: null }));

            try {
                const response = await apiCall();
                store.update(state => ({
                    ...state,
                    data: response.data,
                    loading: false,
                    error: null,
                }));
            } catch (error) {
                store.update(state => ({
                    ...state,
                    loading: false,
                    error: error instanceof Error ? error : new Error('Unknown error'),
                }));
                throw error;
            }
        },
        reset() {
            store.set(initialState);
        },
    };
}

/**
 * SvelteKit Load Function Helper
 */
export function createLoadHelper(apiClient: ApiClient) {
    return {
        async loadData<T = any>(
            endpoint: string,
            params?: QueryParams,
            options?: ApiRequestOptions
        ) {
            try {
                const response = await apiClient.get<T>(endpoint, params, options);
                return {
                    data: response.data,
                    status: response.status,
                };
            } catch (error) {
                if (error instanceof ApiError) {
                    return {
                        error: {
                            message: error.message,
                            status: error.status,
                            data: error.data,
                        },
                    };
                }
                return {
                    error: {
                        message: error instanceof Error ? error.message : 'Unknown error',
                        status: 500,
                    },
                };
            }
        },
    };
}

/**
 * CONTOH PENGGUNAAN UNTUK SVELTEKIT:
 */

/*
// 1. lib/api.ts - Setup API client
import { createApiClient } from './api-helper';

export const api = createApiClient({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Accept': 'application/json',
  },
});

// 2. lib/types.ts - Type definitions
export interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

// 3. routes/users/+page.server.ts - Server-side loading
import type { PageServerLoad } from './$types';
import { api } from '$lib/api';
import type { User } from '$lib/types';

export const load: PageServerLoad = async () => {
  try {
    const response = await api.get<User[]>('/users');
    return {
      users: response.data,
    };
  } catch (error) {
    return {
      users: [],
      error: error instanceof Error ? error.message : 'Failed to load users',
    };
  }
};

// 4. routes/users/+page.svelte - Component usage
<script lang="ts">
  import type { PageData } from './$types';
  import { api } from '$lib/api';
  import { createApiStore } from '$lib/api-helper';
  import type { User } from '$lib/types';

  export let data: PageData;

  // Reactive API store
  const userStore = createApiStore<User[]>();
  
  // Functions
  async function refreshUsers() {
    await userStore.execute(() => api.get<User[]>('/users'));
  }

  async function createUser(userData: Omit<User, 'id'>) {
    try {
      const response = await api.post<User>('/users', userData);
      console.log('User created:', response.data);
      await refreshUsers();
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  }
</script>

{#if data.error}
  <div class="error">Error: {data.error}</div>
{/if}

<div class="users">
  {#each data.users as user}
    <div class="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  {/each}
</div>

<button on:click={refreshUsers}>Refresh Users</button>

{#if $userStore.loading}
  <p>Loading...</p>
{/if}

{#if $userStore.error}
  <p class="error">{$userStore.error.message}</p>
{/if}

// 5. app.d.ts - Global types (optional)
declare global {
  namespace App {
    interface Error {
      code?: string;
    }
  }
}
*/