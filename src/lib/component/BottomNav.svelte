<script lang="ts">
  import { goto } from '$app/navigation'
  
  interface Props {
    onbottomnavclick?: (detail: { param: string }) => void
  }

  let { onbottomnavclick }: Props = $props()
  
  // Simple active state tracking
  let activeMenu = $state('home')

  function onClickMenu(param: string) {
    if (param !== 'logout') {
      activeMenu = param
    }
    onbottomnavclick?.({ param })
  }

  function onLogoutHandler(event: Event) {
    document.cookie = 'sessionid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
    goto('/logout')
  }
</script>

<div class="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform">
  <div class="glass-card rounded-full bg-white px-6 py-2 shadow-2xl">
    <div class="flex items-center space-x-8">
      <!-- Home Button -->
      <button 
        onclick={() => onClickMenu('home')} 
        aria-label="Home" 
        class="group rounded-full p-3 text-white shadow-lg transition-all duration-200 {activeMenu === 'home' ? 'bg-gradient-to-r from-blue-500 to-blue-600 scale-105' : 'bg-gray-400 hover:bg-blue-500'}"
      >
        <i class="fas fa-home text-lg transition-transform group-hover:scale-110"></i>
      </button>

      <!-- Tagihan Button -->
      <button 
        onclick={() => onClickMenu('tagihan')} 
        aria-label="Tagihan" 
        class="group rounded-full p-3 transition-all duration-200 {activeMenu === 'tagihan' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg scale-105' : 'text-gray-600 hover:bg-gray-100 hover:text-blue-600'}"
      >
        <i class="fas fa-receipt text-lg transition-transform group-hover:scale-110"></i>
      </button>

      <!-- Logout Button (always inactive style) -->
      <button 
        onclick={() => onClickMenu('logout')} 
        aria-label="Logout" 
        class="group rounded-full p-3 text-gray-600 transition-all duration-200 hover:bg-red-50 hover:text-red-600 hover:scale-105"
      >
        <i class="fas fa-sign-out-alt text-lg transition-transform group-hover:scale-110"></i>
      </button>
    </div>
  </div>
</div>

<!-- Enhanced WhatsApp Button -->
<div class="fixed right-6 bottom-6 z-40">
  <div class="relative">
    <div class="pulse-ring absolute inset-0 rounded-full bg-green-400"></div>
    <a href="https://wa.me/628131115280" aria-label="Whatsapp" class="relative block flex h-14 w-14 transform items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-green-500 shadow-2xl transition hover:scale-110 hover:from-green-500 hover:to-green-600">
      <i class="fab fa-whatsapp text-2xl text-white"></i>
    </a>
  </div>
</div>