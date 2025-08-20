<script lang="ts">
  import { Toast } from 'flowbite-svelte';
  import { CheckCircleSolid } from 'flowbite-svelte-icons';
  let { open = false, counterToast = 6, message = 'Data berhasil disimpan!.' } = $props();

  export function OpenToast(m: string) {
    if (m != '') {
      message = m;
    }
    open = true;
    counterToast = 2;
    TimeoutToast();
  }

  export function TimeoutToast() {
    if (--counterToast > 0) return setTimeout(TimeoutToast, 1000);
    open = false;
  }
</script>

{#if open}
  <Toast dismissable={true} position="top-right" class="text-xs" style="position: fixed;z-index:1000">
    <div class="flex gap-x-2">
      <CheckCircleSolid class="h-5 w-5" />
      <p class="text-xs">{message}</p>
    </div>
  </Toast>
{/if}
