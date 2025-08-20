<script lang="ts">
  import { Navbar, NavBrand, NavContainer } from 'flowbite-svelte'
  import '../../app.pcss'
  import { Logo, AplicationName } from '$lib/Constant.json';
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  export let fluid = true
  export let list = false
  export let data: any

  onMount(async () => {})

  function onLogoutHandler(event: any) {
    document.cookie = 'sessionid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    goto('/logout')
  }
</script>

<Navbar {fluid} class="text-black bg-blue-700 z-50" color="default" let:NavContainer>
  <NavContainer class="mb-px mt-px px-1" {fluid}>
    <div class="flex items-center justify-between w-full">
      <NavBrand href="/" class={list ? 'w-40' : 'lg:w-60'}>
        <img src="{Logo}" class="me-2.5 h-6 sm:h-8" alt="{AplicationName}" />
        <span class="ml-1 self-center whitespace-nowrap text-base text-white sm:text-base font-bold">{AplicationName}</span>
      </NavBrand>
      <div class="ms-auto flex items-center text-gray-500 dark:text-gray-400 sm:order-2">
        <span class="text-xs" style="color: white;">{data?.studentdata?.student_name}</span>
      </div>
    </div></NavContainer
  >
</Navbar>
