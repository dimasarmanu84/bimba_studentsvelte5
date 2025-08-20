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
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
      .card-hover {
        transition: all 0.3s ease;
      }
      .card-hover:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -5px rgba(0, 0, 0, 0.1);
      }
      .step-completed {
        background: linear-gradient(135deg, #10b981, #059669);
      }
      .animate-fade-in {
        animation: fadeIn 0.6s ease-in;
      }
      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .floating-icon {
        animation: float 3s ease-in-out infinite;
      }
      @keyframes float {
        0%,
        100% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(-8px);
        }
      }

      /* Mobile optimizations */
      .mobile-card {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .safe-bottom {
        padding-bottom: env(safe-area-inset-bottom, 0);
      }

      @media (max-width: 768px) {
        .mobile-padding {
          padding-left: 1rem;
          padding-right: 1rem;
        }
        .mobile-text {
          font-size: 0.875rem;
          line-height: 1.25rem;
        }
      }
    </style>
  </head>
  <body class="bg-gray-50">
    <!-- Header -->
    <nav class="gradient-bg shadow-lg sticky top-0 z-50">
      <div class="mobile-padding py-3">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center floating-icon">
              <i class="fas fa-mosque text-purple-600 text-lg"></i>
            </div>
            <div>
              <h1 class="text-lg md:text-xl font-bold text-white">Pesantren Darunnajah</h1>
              <p class="text-purple-100 text-xs">Sistem Pendaftaran Online</p>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <span class="bg-white/20 px-2 py-1 rounded-full text-xs text-white hidden sm:block">COBA1208252</span>
            <button class="hover:bg-white/20 p-2 rounded-full transition">
              <i class="fas fa-bell text-white text-sm"></i>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contact Info Section -->
    <div class="mobile-padding py-4">
      <div class="bg-white rounded-xl shadow-lg p-4 mb-6 animate-fade-in mobile-card">
        <div class="flex items-center mb-4">
          <i class="fas fa-phone-alt text-green-500 text-lg mr-3 floating-icon"></i>
          <h2 class="text-base md:text-lg font-bold text-gray-800">Narahubung Registrasi & Penerimaan</h2>
        </div>
        <div class="space-y-3">
          <div class="flex items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg card-hover">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <i class="fas fa-user text-blue-600 text-sm"></i>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-xs text-gray-600 truncate">Usth. Fannisha Rainandini</p>
              <a href="tel:+628131115280" class="font-semibold text-blue-600 text-sm">+62 813 1115 2800</a>
            </div>
            <button class="ml-2 p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition">
              <i class="fas fa-phone text-blue-600 text-xs"></i>
            </button>
          </div>

          <div class="flex items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg card-hover">
            <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <i class="fas fa-user text-purple-600 text-sm"></i>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-xs text-gray-600 truncate">Usth. Nabila Zahra</p>
              <a href="tel:+6287730935976" class="font-semibold text-purple-600 text-sm">+62 877 3093 5976</a>
            </div>
            <button class="ml-2 p-2 bg-purple-100 rounded-full hover:bg-purple-200 transition">
              <i class="fas fa-phone text-purple-600 text-xs"></i>
            </button>
          </div>

          <div class="flex items-center p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg card-hover">
            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <i class="fas fa-user text-green-600 text-sm"></i>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-xs text-gray-600 truncate">Usth. Miftahul Jannah</p>
              <a href="tel:+6281387824014" class="font-semibold text-green-600 text-sm">+62 813 8782 4014</a>
            </div>
            <button class="ml-2 p-2 bg-green-100 rounded-full hover:bg-green-200 transition">
              <i class="fas fa-phone text-green-600 text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Registration Steps -->
      <div class="space-y-4 pb-24">
        <!-- Step 2 - Completed -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden card-hover animate-fade-in mobile-card">
          <div class="flex items-start">
            <div class="w-16 h-16 step-completed flex items-center justify-center flex-shrink-0">
              <div class="text-white text-center">
                <div class="w-7 h-7 bg-white rounded-full flex items-center justify-center mx-auto mb-1">
                  <span class="text-green-600 font-bold text-sm">2</span>
                </div>
                <i class="fas fa-check text-xs"></i>
              </div>
            </div>
            <div class="flex-1 p-4 min-w-0">
              <div class="mb-3">
                <h3 class="text-base font-bold text-gray-800 mb-1">Isi Data Pendaftaran</h3>
                <p class="text-xs text-gray-600 mobile-text">Lengkapi formulir pendaftaran dengan data yang valid</p>
              </div>
              <div class="flex items-center justify-between">
                <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  <i class="fas fa-check mr-1"></i>Selesai
                </span>
                <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-xs transition flex items-center">
                  <i class="fas fa-eye mr-1"></i>Lihat
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3 - Completed -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden card-hover animate-fade-in mobile-card">
          <div class="flex items-start">
            <div class="w-16 h-16 step-completed flex items-center justify-center flex-shrink-0">
              <div class="text-white text-center">
                <div class="w-7 h-7 bg-white rounded-full flex items-center justify-center mx-auto mb-1">
                  <span class="text-green-600 font-bold text-sm">3</span>
                </div>
                <i class="fas fa-check text-xs"></i>
              </div>
            </div>
            <div class="flex-1 p-4 min-w-0">
              <div class="mb-3">
                <h3 class="text-base font-bold text-gray-800 mb-1">Ujian Masuk</h3>
                <p class="text-xs text-gray-600 mobile-text">Ikuti ujian seleksi masuk pesantren</p>
              </div>
              <div class="flex items-center justify-between">
                <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  <i class="fas fa-check mr-1"></i>Selesai
                </span>
                <button class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full text-xs transition flex items-center">
                  <i class="fas fa-graduation-cap mr-1"></i>Hasil
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 4 - Completed -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden card-hover animate-fade-in mobile-card">
          <div class="flex items-start">
            <div class="w-16 h-16 step-completed flex items-center justify-center flex-shrink-0">
              <div class="text-white text-center">
                <div class="w-7 h-7 bg-white rounded-full flex items-center justify-center mx-auto mb-1">
                  <span class="text-green-600 font-bold text-sm">4</span>
                </div>
                <i class="fas fa-check text-xs"></i>
              </div>
            </div>
            <div class="flex-1 p-4 min-w-0">
              <div class="mb-3">
                <h3 class="text-base font-bold text-gray-800 mb-1">Surat Keputusan & Biaya 2026-2027</h3>
                <p class="text-xs text-gray-600 mobile-text">Unduh surat keputusan dan informasi biaya pendidikan</p>
              </div>
              <div class="flex items-center justify-between">
                <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  <i class="fas fa-check mr-1"></i>Selesai
                </span>
                <button class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-xs transition flex items-center">
                  <i class="fas fa-download mr-1"></i>Unduh
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 5 - Completed -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden card-hover animate-fade-in mobile-card">
          <div class="flex items-start">
            <div class="w-16 h-16 step-completed flex items-center justify-center flex-shrink-0">
              <div class="text-white text-center">
                <div class="w-7 h-7 bg-white rounded-full flex items-center justify-center mx-auto mb-1">
                  <span class="text-green-600 font-bold text-sm">5</span>
                </div>
                <i class="fas fa-check text-xs"></i>
              </div>
            </div>
            <div class="flex-1 p-4 min-w-0">
              <div class="mb-3">
                <h3 class="text-base font-bold text-gray-800 mb-1">Dokumen</h3>
                <p class="text-xs text-gray-600 mobile-text">Upload dokumen persyaratan yang diperlukan</p>
              </div>
              <div class="flex items-center justify-between">
                <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  <i class="fas fa-check mr-1"></i>Selesai
                </span>
                <button class="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full text-xs transition flex items-center">
                  <i class="fas fa-folder-open mr-1"></i>Kelola
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 6 - Completed -->
        <div class="bg-white rounded-xl shadow-lg overflow-hidden card-hover animate-fade-in mobile-card">
          <div class="flex items-start">
            <div class="w-16 h-16 step-completed flex items-center justify-center flex-shrink-0">
              <div class="text-white text-center">
                <div class="w-7 h-7 bg-white rounded-full flex items-center justify-center mx-auto mb-1">
                  <span class="text-green-600 font-bold text-sm">6</span>
                </div>
                <i class="fas fa-check text-xs"></i>
              </div>
            </div>
            <div class="flex-1 p-4 min-w-0">
              <div class="mb-3">
                <h3 class="text-base font-bold text-gray-800 mb-1">Informasi Siswa Baru</h3>
                <p class="text-xs text-gray-600 mobile-text">Informasi penting untuk Siswa baru dan orang tua</p>
              </div>
              <div class="flex items-center justify-between">
                <span class="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  <i class="fas fa-check mr-1"></i>Selesai
                </span>
                <button class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-xs transition flex items-center">
                  <i class="fas fa-info-circle mr-1"></i>Detail
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <div class="fixed bottom-0 left-0 right-0 bg-white shadow-2xl border-t safe-bottom z-40">
      <div class="flex justify-center items-center py-3 px-4">
        <div class="flex justify-between items-center w-full max-w-xs">
          <button class="flex flex-col items-center space-y-1 text-blue-600 transition hover:text-blue-700 p-2">
            <div class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <i class="fas fa-home text-lg"></i>
            </div>
            <span class="text-xs font-medium">Home</span>
          </button>
          <button class="flex flex-col items-center space-y-1 text-gray-500 transition hover:text-blue-600 p-2">
            <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100">
              <i class="fas fa-clipboard-list text-lg"></i>
            </div>
            <span class="text-xs font-medium">Tagihan</span>
          </button>
          <button class="flex flex-col items-center space-y-1 text-gray-500 transition hover:text-blue-600 p-2">
            <div class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-100">
              <i class="fas fa-sign-out-alt text-lg"></i>
            </div>
            <span class="text-xs font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>

    <!-- WhatsApp Floating Button -->
    <a href="https://wa.me/628131115280" class="fixed bottom-20 right-4 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-xl hover:bg-green-600 transition floating-icon z-30">
      <i class="fab fa-whatsapp text-white text-xl"></i>
    </a>

    <script>
      // Mobile-optimized interactions
      document.addEventListener('DOMContentLoaded', function () {
        // Touch-friendly animations
        const observer = new IntersectionObserver(
          entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.style.opacity = '1'
                entry.target.style.transform = 'translateY(0)'
              }
            })
          },
          {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px',
          },
        )

        document.querySelectorAll('.card-hover').forEach(card => {
          card.style.opacity = '0'
          card.style.transform = 'translateY(20px)'
          card.style.transition = 'all 0.6s ease'
          observer.observe(card)
        })

        // Touch feedback for buttons
        document.querySelectorAll('button, a').forEach(element => {
          element.addEventListener('touchstart', function () {
            this.style.transform = 'scale(0.95)'
          })

          element.addEventListener('touchend', function () {
            this.style.transform = 'scale(1)'
          })
        })

        // Prevent zoom on double tap for iOS
        let lastTouchEnd = 0
        document.addEventListener(
          'touchend',
          function (event) {
            let now = new Date().getTime()
            if (now - lastTouchEnd <= 300) {
              event.preventDefault()
            }
            lastTouchEnd = now
          },
          false,
        )

        // Handle phone number clicks
        document.querySelectorAll('a[href^="tel:"]').forEach(link => {
          link.addEventListener('click', function (e) {
            // Add visual feedback
            this.style.opacity = '0.7'
            setTimeout(() => {
              this.style.opacity = '1'
            }, 200)
          })
        })

        // Smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth'
      })

      // Handle orientation change
      window.addEventListener('orientationchange', function () {
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 100)
      })
    </script>
  </body>
</html>
