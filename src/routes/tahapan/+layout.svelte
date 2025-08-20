<script lang="ts">
  import '../../app.css';
  import type { LayoutData } from './$types';
  export let data: LayoutData;
</script>

<div class="overflow-hidden lg:flex">
  <div class="relative h-full w-full justify-center lg:ml-0">
    <slot />
  </div>
</div>
