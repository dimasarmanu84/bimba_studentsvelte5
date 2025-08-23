<script lang="ts">
  import { goto } from '$app/navigation'
  import { ArrowRightToBracketOutline, HomeSolid, WalletSolid } from 'flowbite-svelte-icons'
    import Studentprofile from './siswa/Studentprofile.svelte'

  interface Props {
    onbottomnavclick?: (detail: { param: string }) => void
  }

  let { onbottomnavclick }: Props = $props()

  function onClickMenu(param: string) {
    onbottomnavclick?.({ param })
  }

  function onLogoutHandler(event: Event) {
    document.cookie = 'sessionid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    goto('/logout')
  }
</script>

<div class="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform">
  <div class="glass-card rounded-full  px-6 py-2 shadow-2xl">
    <div class="flex items-center space-x-8">


      
      
      <button onclick={() => onClickMenu('home')} aria-label="Home" class="group rounded-full bg-gradient-to-r from-blue-500 to-blue-600 p-3 text-white shadow-lg">
        <i class="fas fa-home text-lg transition-transform group-hover:scale-110"></i>
      </button>
      <button
      onclick={() => onClickMenu('tagihan')}
        aria-label="Tagihan"
        class="group rounded-full p-4 text-gray-600 transition hover:bg-gray-300 hover:text-blue-600"
      >
        <i class="fas fa-receipt text-lg transition-transform group-hover:scale-110"></i>
      </button>
      <button onclick={() => onClickMenu('logout')} aria-label="Logout" class="group rounded-full p-4 text-gray-600 transition hover:bg-gray-300 hover:text-red-600">
        <i class="fas fa-sign-out-alt text-lg transition-transform group-hover:scale-110"></i>
      </button>
    </div>
  </div>
</div>
<!-- Enhanced WhatsApp Button -->
<div class="fixed right-6 bottom-6 z-40">
  <div class="relative">
    <div class="pulse-ring absolute inset-0 rounded-full bg-green-400"></div>
    <a
      href="https://wa.me/628131115280"
      aria-label="Whatsapp"
      class="relative block flex h-14 w-14 transform items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-2xl transition hover:scale-110 hover:from-green-500 hover:to-green-600"
    >
      <i class="fab fa-whatsapp text-2xl text-white"></i>
    </a>
  </div>
</div>
<!-- 
<Studentprofile bind:open={openProfile}  formData={data?.studentdata} /> -->
