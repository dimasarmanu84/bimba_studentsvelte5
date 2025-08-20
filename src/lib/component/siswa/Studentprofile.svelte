<script lang="ts">
  import { Modal } from 'flowbite-svelte';
  import { UserOutline } from 'flowbite-svelte-icons';
  import Tagihan from './Tagihan.svelte';

  interface Props {
    open?: boolean;
    pageData?: any;
    formData?: Record<string, string>;
    onsuccess?: () => void;
  }

  let { 
    open = $bindable(false), 
    pageData, 
    formData = $bindable({}),
    onsuccess
  }: Props = $props();

  let validations = $state<any>();

  function init(form: HTMLFormElement) {}

  function closeDialog() {
    // formData = {}
    validations = {
      errors: {}
    };
    open = false;
    document.body.style.overflow = 'auto';
    onsuccess?.();
  }

  let activeTabValue = $state(1);
  const handleClick = (tabValue: number) => () => (activeTabValue = tabValue);
</script>

<Modal bind:open size="xl" onclose={closeDialog} class="4xl relative w-full max-w-[2000px]">
  <!-- Modal body -->
  <div class="space-y-6 p-0"></div>
  <form>
    <ul class="flex flex-wrap border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-100 dark:text-gray-400">
      <li class="me-2">
        <button
          type="button"
          class="active text-primary-600 border-primary-600 dark:text-primary-500 dark:border-primary-500 flex inline-flex items-center rounded-t-lg border-b-2 bg-gray-100 p-2 p-4 pr-4 pl-4 text-center text-sm font-bold disabled:cursor-not-allowed dark:bg-white"
          aria-current="page"
        >
          <UserOutline />
          Informasi Tagihan
        </button>
      </li>
    </ul>
    <div class="border border-gray-200 p-5" hidden={activeTabValue !== 1}>
      <Tagihan {pageData} {formData} />
    </div>
  </form>
</Modal>