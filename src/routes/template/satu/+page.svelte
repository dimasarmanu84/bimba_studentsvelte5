<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aplikasi Administrasi Sekolah - Sistem Pendaftaran</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
    <style>
      .gradient-bg {
        background: linear-gradient(45deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
        background-size: 200% 200%;
        animation: gradient-shift 5s ease infinite;
      }

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

      .glass-card {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
      }

      .neumorphism {
        background: #f0f0f0;
        box-shadow:
          8px 8px 16px #d1d1d1,
          -8px -8px 16px #ffffff;
      }

      .hexagon {
        width: 60px;
        height: 52px;
        background: linear-gradient(135deg, #10b981, #059669);
        position: relative;
        margin: 26px 0;
        clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
      }

      .hexagon-small {
        width: 40px;
        height: 35px;
        margin: 17px 0;
        clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
      }

      .progress-line {
        height: 4px;
        background: linear-gradient(90deg, #10b981 0%, #3b82f6 50%, #8b5cf6 100%);
        border-radius: 2px;
        position: relative;
        overflow: hidden;
      }

      .progress-line::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 33%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
        animation: shimmer 2s infinite;
      }

      @keyframes shimmer {
        0% {
          left: -100%;
        }
        100% {
          left: 100%;
        }
      }

      .floating-card {
        transform: translateY(0);
        animation: float-card 6s ease-in-out infinite;
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

      .card-tilt {
        transition: all 0.3s ease;
        transform-style: preserve-3d;
      }

      .card-tilt:hover {
        transform: rotateX(5deg) rotateY(-5deg) translateY(-10px);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      }

      .wave-bg {
        background: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' width='1440' height='560' preserveAspectRatio='none' viewBox='0 0 1440 560'%3e%3cg mask='url(%26quot%3b%23SvgjsMask1001%26quot%3b)' fill='none'%3e%3crect width='1440' height='560' x='0' y='0' fill='rgba(102%2c 126%2c 234%2c 1)'%3e%3c/rect%3e%3cpath d='M 0%2c129 C 57.6%2c151.4 172.8%2c225.8 288%2c217 C 403.2%2c208.2 460.8%2c104 576%2c99 C 691.2%2c94 748.8%2c176.8 864%2c174 C 979.2%2c171.2 1036.8%2c92.6 1152%2c93 C 1267.2%2c93.4 1382.4%2c170.2 1440%2c188L1440 560L0 560z' fill='rgba(118%2c 75%2c 162%2c 1)'%3e%3c/path%3e%3cpath d='M 0%2c378 C 96%2c361.2 288%2c308.6 480%2c309 C 672%2c309.4 768%2c367.8 960%2c361 C 1152%2c354.2 1344%2c294.8 1440%2c279L1440 560L0 560z' fill='rgba(240%2c 147%2c 251%2c 1)'%3e%3c/path%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask1001'%3e%3crect width='1440' height='560' fill='white'%3e%3c/rect%3e%3c/mask%3e%3c/defs%3e%3c/svg%3e");
        background-size: cover;
        background-position: center;
      }

      .blob-bg {
        background: linear-gradient(45deg, #667eea, #764ba2);
        border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
        animation: blob-anim 8s ease-in-out infinite;
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
  </head>
  <body class="min-h-screen" style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
    <!-- Header with Wave Background -->
    <div class="wave-bg relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"></div>
      <nav class="relative z-10 px-4 py-6">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <div class="relative">
              <div class="absolute inset-0 bg-white/30 rounded-full pulse-ring"></div>
              <div class="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                <i class="fas fa-mosque text-purple-600 text-xl"></i>
              </div>
            </div>
            <div>
              <h1 class="text-xl md:text-2xl font-bold text-white drop-shadow-lg">Pesantren Darunnajah</h1>
              <p class="text-purple-100 text-sm">Portal Pendaftaran Digital</p>
            </div>
          </div>
          <div class="flex items-center space-x-3">
            <div class="hidden sm:block bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full">
              <span class="text-white text-sm font-medium">ID: COBA1208252</span>
            </div>
            <button class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition">
              <i class="fas fa-bell text-white"></i>
            </button>
          </div>
        </div>
      </nav>
    </div>

    <div class="px-4 -mt-8 relative z-20">
      <br /><br />
      <!--
      <div class="glass-card rounded-3xl p-6 mb-8 floating-card">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-gray-800">Progress Pendaftaran</h2>
          <div class="bg-amber-100 px-3 py-1 rounded-full">
            <span class="text-amber-700 text-sm font-medium">33% Selesai</span>
          </div>
        </div>
        <div class="progress-line mb-4"></div>
        <div class="text-center">
          <p class="text-gray-600 text-sm">Masih ada 4 tahapan yang perlu diselesaikan</p>
          <div class="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p class="text-amber-800 text-sm font-medium">
              <i class="fas fa-clock mr-2"></i>
              Batas waktu pendaftaran: <span class="font-bold">15 September 2025</span>
            </p>
          </div>
        </div>
      </div>
      
      <div class="glass-card rounded-3xl p-6 mb-8 card-tilt">
        <div class="flex items-center mb-6">
          <div class="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3">
            <i class="fas fa-headset text-white"></i>
          </div>
          <h2 class="text-lg font-bold text-gray-800">Tim Support Pendaftaran</h2>
        </div>

        <div class="grid gap-4">
          <div class="relative p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-100">
            <div class="absolute top-4 right-4">
              <div class="hexagon-small bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <i class="fas fa-phone text-white text-xs"></i>
              </div>
            </div>
            <div class="pr-16">
              <h3 class="font-semibold text-gray-800 mb-1">Ustadzah Fannisha Rainandini</h3>
              <p class="text-sm text-gray-600 mb-2">Koordinator Pendaftaran</p>
              <a href="tel:+628131115280" class="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 transition">
                <i class="fas fa-phone mr-2"></i>+62 813 1115 2800
              </a>
            </div>
          </div>

          <div class="relative p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-pink-50 to-rose-50 border border-purple-100">
            <div class="absolute top-4 right-4">
              <div class="hexagon-small bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <i class="fas fa-phone text-white text-xs"></i>
              </div>
            </div>
            <div class="pr-16">
              <h3 class="font-semibold text-gray-800 mb-1">Ustadzah Nabila Zahra</h3>
              <p class="text-sm text-gray-600 mb-2">Admin Registrasi</p>
              <a href="tel:+6287730935976" class="inline-flex items-center text-purple-600 font-medium hover:text-purple-700 transition">
                <i class="fas fa-phone mr-2"></i>+62 877 3093 5976
              </a>
            </div>
          </div>

          <div class="relative p-4 rounded-2xl bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border border-green-100">
            <div class="absolute top-4 right-4">
              <div class="hexagon-small bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <i class="fas fa-phone text-white text-xs"></i>
              </div>
            </div>
            <div class="pr-16">
              <h3 class="font-semibold text-gray-800 mb-1">Ustadzah Miftahul Jannah</h3>
              <p class="text-sm text-gray-600 mb-2">Customer Service</p>
              <a href="tel:+6281387824014" class="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition">
                <i class="fas fa-phone mr-2"></i>+62 813 8782 4014
              </a>
            </div>
          </div>
        </div>
      </div>
-->
      <!-- Registration Steps - Unique Cards -->
      <div class="space-y-6 pb-24">
        <!-- Step 2 -->
        <div class="relative glass-card rounded-3xl overflow-hidden card-tilt floating-card">
          <div class="absolute top-0 right-0 w-32 h-32 blob-bg opacity-10"></div>
          <div class="relative p-6">
            <div class="flex items-start space-x-4">
              <div class="hexagon bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
                <div class="text-white text-center">
                  <div class="text-lg font-bold">2</div>
                  <i class="fas fa-check text-xs"></i>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">Data Pendaftaran</h3>
                    <p class="text-sm text-gray-600">Form biodata dan informasi calon santri telah terisi lengkap</p>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span class="text-green-700 font-medium text-sm">Completed</span>
                  </div>
                  <button class="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-full text-sm transition transform hover:scale-105">
                    <i class="fas fa-eye mr-2"></i>Review
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="relative glass-card rounded-3xl overflow-hidden card-tilt floating-card" style="animation-delay: -1s;">
          <div class="absolute top-0 right-0 w-32 h-32 blob-bg opacity-10" style="animation-delay: -2s;"></div>
          <div class="relative p-6">
            <div class="flex items-start space-x-4">
              <div class="hexagon bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                <div class="text-white text-center">
                  <div class="text-lg font-bold">3</div>
                  <i class="fas fa-check text-xs"></i>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">Ujian Seleksi</h3>
                    <p class="text-sm text-gray-600">Tes akademik dan wawancara telah selesai dilaksanakan</p>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                    <span class="text-blue-700 font-medium text-sm">Completed</span>
                  </div>
                  <button class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-full text-sm transition transform hover:scale-105">
                    <i class="fas fa-chart-line mr-2"></i>Hasil
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 4 -->
        <div class="relative glass-card rounded-3xl overflow-hidden card-tilt floating-card" style="animation-delay: -2s;">
          <div class="absolute top-0 right-0 w-32 h-32 blob-bg opacity-10" style="animation-delay: -4s;"></div>
          <div class="relative p-6">
            <div class="flex items-start space-x-4">
              <div class="hexagon bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center flex-shrink-0">
                <div class="text-white text-center">
                  <div class="text-lg font-bold">4</div>
                  <i class="fas fa-check text-xs"></i>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">SK & Biaya 2026-2027</h3>
                    <p class="text-sm text-gray-600">Surat keputusan diterima dan rincian biaya tahun ajaran baru</p>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                    <span class="text-purple-700 font-medium text-sm">Completed</span>
                  </div>
                  <button class="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-6 py-2 rounded-full text-sm transition transform hover:scale-105">
                    <i class="fas fa-download mr-2"></i>Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 5 -->
        <div class="relative glass-card rounded-3xl overflow-hidden card-tilt floating-card" style="animation-delay: -3s;">
          <div class="absolute top-0 right-0 w-32 h-32 blob-bg opacity-10" style="animation-delay: -6s;"></div>
          <div class="relative p-6">
            <div class="flex items-start space-x-4">
              <div class="hexagon bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0">
                <div class="text-white text-center">
                  <div class="text-lg font-bold">5</div>
                  <i class="fas fa-check text-xs"></i>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">Upload Dokumen</h3>
                    <p class="text-sm text-gray-600">Semua berkas persyaratan telah diunggah dan diverifikasi</p>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
                    <span class="text-orange-700 font-medium text-sm">Completed</span>
                  </div>
                  <button class="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-2 rounded-full text-sm transition transform hover:scale-105">
                    <i class="fas fa-folder-open mr-2"></i>Manage
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 6 -->
        <div class="relative glass-card rounded-3xl overflow-hidden card-tilt floating-card" style="animation-delay: -4s;">
          <div class="absolute top-0 right-0 w-32 h-32 blob-bg opacity-10" style="animation-delay: -8s;"></div>
          <div class="relative p-6">
            <div class="flex items-start space-x-4">
              <div class="hexagon bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center flex-shrink-0">
                <div class="text-white text-center">
                  <div class="text-lg font-bold">6</div>
                  <i class="fas fa-check text-xs"></i>
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2">Info Santri Baru</h3>
                    <p class="text-sm text-gray-600">Panduan orientasi dan informasi penting untuk santri baru</p>
                  </div>
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-pink-400 rounded-full animate-pulse"></div>
                    <span class="text-pink-700 font-medium text-sm">Completed</span>
                  </div>
                  <button class="bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white px-6 py-2 rounded-full text-sm transition transform hover:scale-105">
                    <i class="fas fa-info-circle mr-2"></i>Detail
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Floating Bottom Navigation -->
    <div class="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div class="glass-card rounded-full px-6 py-3 shadow-2xl">
        <div class="flex items-center space-x-8">
          <button class="group p-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
            <i class="fas fa-home text-lg group-hover:scale-110 transition-transform"></i>
          </button>
          <button class="group p-3 rounded-full hover:bg-gray-100 text-gray-600 hover:text-blue-600 transition">
            <i class="fas fa-receipt text-lg group-hover:scale-110 transition-transform"></i>
          </button>
          <button class="group p-3 rounded-full hover:bg-gray-100 text-gray-600 hover:text-red-600 transition">
            <i class="fas fa-sign-out-alt text-lg group-hover:scale-110 transition-transform"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Enhanced WhatsApp Button -->
    <div class="fixed bottom-6 right-6 z-40">
      <div class="relative">
        <div class="absolute inset-0 bg-green-400 rounded-full pulse-ring"></div>
        <a href="https://wa.me/628131115280" class="relative block w-14 h-14 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-2xl hover:from-green-500 hover:to-green-600 transition transform hover:scale-110">
          <i class="fab fa-whatsapp text-white text-2xl"></i>
        </a>
      </div>
    </div>

    <script>
      document.addEventListener('DOMContentLoaded', function () {
        // Enhanced touch interactions
        document.querySelectorAll('.card-tilt').forEach(card => {
          card.addEventListener('mousemove', function (e) {
            if (window.innerWidth > 768) {
              const rect = card.getBoundingClientRect()
              const x = e.clientX - rect.left
              const y = e.clientY - rect.top

              const centerX = rect.width / 2
              const centerY = rect.height / 2

              const rotateX = (y - centerY) / 10
              const rotateY = (centerX - x) / 10

              card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`
            }
          })

          card.addEventListener('mouseleave', function () {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)'
          })
        })

        // Smooth reveal animations
        const observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.style.opacity = '1'
                entry.target.style.transform = 'translateY(0) scale(1)'
              }
            })
          },
          { threshold: 0.1 },
        )

        document.querySelectorAll('.glass-card').forEach(card => {
          card.style.opacity = '0'
          card.style.transform = 'translateY(30px) scale(0.95)'
          card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          observer.observe(card)
        })

        // Phone link interactions
        document.querySelectorAll('a[href^="tel:"]').forEach(link => {
          link.addEventListener('click', function () {
            this.style.transform = 'scale(0.95)'
            setTimeout(() => {
              this.style.transform = 'scale(1)'
            }, 150)
          })
        })

        // Button hover effects
        document.querySelectorAll('button').forEach(button => {
          button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-2px)'
          })

          button.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0)'
          })
        })
      })
    </script>
  </body>
</html>
