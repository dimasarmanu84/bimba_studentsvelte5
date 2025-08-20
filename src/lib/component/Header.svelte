<script lang="ts">
  import { Logo, AplicationName } from '$lib/Constant.json';

  let { data } = $props<{ data: any }>();
</script>

<!-- Header with Wave Background -->
<div class="wave-bg relative overflow-hidden">
  <div class="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
  <nav class="relative z-10 px-4 py-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-x-6">
        <div class="relative">
          <div class="pulse-ring absolute inset-0 rounded-full bg-white/30"></div>
          <div class="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm">
            <img src="{Logo}" class="h-8" alt="{Logo}" />
          </div>
        </div>
        <div>
          <h1 class="text-xl font-bold text-white drop-shadow-lg md:text-2xl">{AplicationName}</h1>
          <p class="text-sm text-purple-100">{AplicationName}</p>
        </div>
      </div>
      <div class="flex items-center space-x-3">
        <div class="hidden rounded-full bg-white/20 px-3 py-2 backdrop-blur-sm sm:block">
          <span class="text-sm font-medium text-white">{data?.studentdata?.student_name}</span>
        </div>
        <!--
        <div class="mr-3">
          <DarkMode class="rounded-lg p-2 text-sm text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 focus:outline-none dark:focus:ring-gray-700" />
        </div>
        -->
      </div>
    </div>
  </nav>
</div>

<style>
  @keyframes gradient-shift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes shimmer {
    0% {
      left: -100%;
    }
    100% {
      left: 100%;
    }
  }

  @keyframes float-card {
    0%,
    100% {
      transform: translateY(0px) rotate(0deg);
    }
    25% {
      transform: translateY(-5px) rotate(0.5deg);
    }
    50% {
      transform: translateY(-10px) rotate(0deg);
    }
    75% {
      transform: translateY(-5px) rotate(-0.5deg);
    }
  }

  .pulse-ring {
    animation: pulse-ring 2s infinite;
  }

  @keyframes pulse-ring {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(1.5);
      opacity: 0;
    }
  }

  .wave-bg {
    background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1001%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(102%2c 126%2c 234%2c 1)'%3e%3c/rect%3e%3cpath d='M 0%2c129 C 57.6%2c151.4 172.8%2c225.8 288%2c217 C 403.2%2c208.2 460.8%2c104 576%2c99 C 691.2%2c94 748.8%2c176.8 864%2c174 C 979.2%2c171.2 1036.8%2c92.6 1152%2c93 C 1267.2%2c93.4 1382.4%2c170.2 1440%2c188L1440 560L0 560z' fill='rgba(118%2c 75%2c 162%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c378 C 96%2c361.2 288%2c308.6 480%2c309 C 672%2c309.4 768%2c367.8 960%2c361 C 1152%2c354.2 1344%2c294.8 1440%2c279L1440 560L0 560z' fill='rgba(240%2c 147%2c 251%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1001'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
    background-size: cover;
    background-position: center;
  }

  @keyframes blob-anim {
    0%,
    100% {
      border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    }
    25% {
      border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%;
    }
    50% {
      border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%;
    }
    75% {
      border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%;
    }
  }
</style>
