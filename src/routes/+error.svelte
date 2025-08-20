<script lang="ts">
  import { page } from '$app/state';
  import { PUBLIC_APP_NAME } from '$env/static/public';
  import { Maintenance, NotFound, ServerError } from '$lib';
  import '../app.css';

  const pages = {
    400: Maintenance,
    404: NotFound,
    500: ServerError
  } as const;

  type ErrorCode = keyof typeof pages;

  const status = +page.status;
  const index = Object.keys(pages)
    .map((x) => +x)
    .reduce((p, c) => (p < status ? c : p)) as ErrorCode;
  const component = pages[index];

  import MetaTag from './utils/MetaTag.svelte';

  const path: string = `/errors/${index}`;
  const description: string = `${index} - ` + PUBLIC_APP_NAME;
  const title: string = PUBLIC_APP_NAME + `- ${index} page`;
  const subtitle: string = `${index} page`;
</script>

<MetaTag {path} {description} {title} {subtitle} />

<svelte:component this={component} />
