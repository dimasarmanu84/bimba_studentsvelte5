<script lang="ts">
  import { applyAction, enhance } from '$app/forms'
  import { Logo, AplicationName } from '$lib/Constant.json';
  import { goto } from '$app/navigation'
  import { PUBLIC_API_URL } from '$env/static/public'
  import { onMount } from 'svelte'
  import { fade, slide } from 'svelte/transition'
  import type { PageData, SubmitFunction } from './$types'
    import { ArrowRightAltOutline } from 'flowbite-svelte-icons'

  // Props
  let { data }: { data: PageData } = $props()

  // Reactive state
  let validations: any = $state()
  let textInstitution: string = $state('BIMBA (PRINCIPAL)')
  let showRegistrationModal = $state(false)
  let loading = $state(false)
  let showPassword = $state(false)

  // Registration form state
  let sellevelgroup_id: string = $state('')
  let sellevel_id: any = $state(1)
  let selinstitution_id: any = $state(1)
  let student_father_phonewa: string = $state('')

  // Computed values
  let disable = $derived(sellevelgroup_id === '')
  let filteredlevel = $derived(data.dropdownlevel?.filter((level: { levelgroup_id: string }) => level.levelgroup_id === sellevelgroup_id) || [])
  let filteredinstitution = $derived(data.dropdowninstitution?.filter((institution: { value: number }) => institution.value == selinstitution_id) || [])

  const gender = [
    { name: 'Laki-laki', value: 'L' },
    { name: 'Perempuan', value: 'P' },
  ]

  // Toast notification function (simplified)
  function showToast(message: string, type: 'success' | 'error' = 'success') {
    // Implement your toast notification here
    console.log(`${type}: ${message}`)
  }

  onMount(async () => {
    const url = `${PUBLIC_API_URL}api/master/levels/gellevel`
    try {
      const result = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Instance: textInstitution,
        },
      })
      const json = await result.json()
      data.dropdownlevel = json.data.Level
      data.dropdowngoruplevel = json.data.Levelgroup
    } catch (error) {
      console.error('Failed to fetch levels:', error)
    }
  })

  const loginHandler: SubmitFunction = ({ formElement, formData, action, cancel }) => {
    loading = true
    return async ({ result, update }) => {
      loading = false
      switch (result.type) {
        case 'success':
          await applyAction(result)
          goto('/tahapan')
          break
        case 'failure':
          validations = result
          await applyAction(result)
          if (validations?.data?.errors?.message) {
            showToast(validations?.data?.errors?.message, 'error')
          }
          break
      }
    }
  }

  const submitHandler: SubmitFunction = ({ formElement, formData, action, cancel }) => {
    formData.append('Instance', textInstitution)
    let lastThreeDigits = student_father_phonewa.slice(-3)
    formData.append('password', lastThreeDigits)
    formData.append('confirmpassword', lastThreeDigits)

    return async ({ result, update }) => {
      switch (result.type) {
        case 'success':
          showRegistrationModal = false
          showToast('Data berhasil disimpan!')
          break
        case 'failure':
          validations = result
          window.scrollTo({ top: 0, behavior: 'smooth' })
          if (validations?.data?.errors?.message) {
            showToast(validations?.data?.errors?.message, 'error')
          }
          break
      }
    }
  }

  async function onChangeInstitution(e: Event): Promise<void> {
    const target = e.target as HTMLSelectElement
    textInstitution = target.options[target.selectedIndex].text
    sellevel_id = ''

    const url = `${PUBLIC_API_URL}api/master/levels/gellevel`
    try {
      const result = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Instance: textInstitution,
        },
      })
      const json = await result.json()
      data.dropdownlevel = json.data.Level
      data.dropdowngoruplevel = json.data.Levelgroup
    } catch (error) {
      console.error('Failed to fetch levels:', error)
    }
  }

  function allowOnlyDigits(event: Event, maxLength: number) {
    const input = event.target as HTMLInputElement
    const value = input.value.replace(/[^0-9]/g, '')
    if (value.length > maxLength) {
      input.value = value.slice(0, maxLength)
    } else {
      input.value = value
    }
  }

  function closeModal() {
    showRegistrationModal = false
    validations = null
  }
</script>

<main class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
  <!-- Header -->
  <header class=" bg-gradient-to-r from-white via-indigo-400 to-purple-600  backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <img src="{Logo}" class="h-8" alt="{Logo}" />
          </div>
          <div>
            <h1 class="text-xl font-bold text-purple-700">Portal Siswa</h1>
            <p class="text-sm  text-purple-700">Sistem Pendaftaran Online</p>
          </div>
        </div>
        <div class="hidden sm:flex items-center space-x-4">
          <span class="text-sm text-white font-semibold hover:text-gray-800">Butuh bantuan?</span>
          <a href="https://wa.me/083808872110" target="_blank" class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
              />
            </svg>
            <span class="text-xs font-medium"> WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  </header>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-12rem)]">
      <!-- Left Column - Hero Content -->
      <div class="space-y-12">
        <div class="space-y-6">
          <div class="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              />
            </svg>
            Pendaftaran Tahun Ajaran {data.registrationperiod?.period_name || '2024/2025'}
          </div>

          <div class="space-y-4">
            <h1 class="text-sm lg:text-2xl font-bold text-gray-600 leading-tight">
              Bergabunglah dengan
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Masa Depan </span>
              Pendidikan
            </h1>
            <p class="text-sm text-gray-600 leading-relaxed">Daftar sekarang untuk menjadi bagian dari komunitas pembelajaran yang inovatif dan inspiratif. Wujudkan impian akademis Anda bersama kami.</p>
          </div>
        </div>

        <div class="grid sm:grid-cols-3 gap-6">
          <div class="text-center space-y-2">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto">
              <svg class="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900">Mudah & Cepat</h3>
            <p class="text-sm text-gray-600">Proses pendaftaran online yang simple dan efisien</p>
          </div>
          <div class="text-center space-y-2">
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto">
              <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900">Terpercaya</h3>
            <p class="text-sm text-gray-600">Sistem keamanan data tingkat tinggi</p>
          </div>
          <div class="text-center space-y-2">
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto">
              <svg class="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" />
              </svg>
            </div>
            <h3 class="font-semibold text-gray-900">Support 24/7</h3>
            <p class="text-sm text-gray-600">Tim dukungan siap membantu Anda</p>
          </div>
        </div>

       
      </div>

      <!-- Right Column - Login Form -->
      <div class="lg:pl-30 lg:w-2/2">
        <div class="bg-gray-100 bg-opacity-50/80 backdrop-blur-sm rounded-lg shadow-sm border border-white/20 p-8">
          <div class="text-center space-y-2 mb-8">
            <h2 class="text-sm font-bold text-gray-900">Masuk ke Akun Anda</h2>
            <p class="text-gray-600">Login untuk melanjutkan ke dashboard siswa</p>
          </div>

          <form method="POST" action="?/getsession" use:enhance={loginHandler} class="space-y-6">
            <div class="space-y-2">
              <label for="username" class="text-xs font-medium text-gray-800 flex items-center">
                <svg class="w-4 h-4 mr-2 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
                </svg>
                NIK (Nomor Induk Kependudukan)
              </label>
              <input type="text" id="username" name="username" class="text-xs w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-100 bg-opacity-50/50" placeholder="Masukkan NIK Anda" autocomplete="username" />
              {#if validations?.data?.errors?.username}
                <p class="text-sm text-red-600">
                  {validations.data.errors.username}
                </p>
              {/if}
            </div>

            <div class="space-y-2">
              <label for="userpassword" class="text-xs font-medium text-gray-800 flex items-center">
                <svg class="w-4 h-4 mr-2 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
                No. Telp (3 Digit Terakhir)
              </label>
              <div class="relative">
                <input type={showPassword ? 'text' : 'password'} id="userpassword" name="userpassword" class="text-xs w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-100 bg-opacity-50/50" placeholder="3 digit terakhir no. telepon" autocomplete="current-password" />
                <button type="button" class="absolute inset-y-0 right-0 pr-4 flex items-center" onclick={() => (showPassword = !showPassword)}>
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {#if showPassword}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    {:else}
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    {/if}
                  </svg>
                </button>
              </div>
              {#if validations?.data?.errors?.userpassword}
                <p class="text-sm text-red-600">
                  {validations.data.errors.userpassword}
                </p>
              {/if}
            </div>

            <button type="submit" disabled={loading} class="text-xs w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center">
              {#if loading}
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Memproses...
              {:else}
                <ArrowRightAltOutline class="w-5 h-5 mr-2" />
                Masuk
              {/if}
            </button>
          </form>

          <div class="mt-8 pt-6 border-t border-gray-200">
            <div class="text-center">
              <p class="text-sm text-gray-600">
                Belum memiliki akun?
                <button onclick={() => (showRegistrationModal = true)} class="font-semibold text-blue-600 hover:text-blue-500 transition-colors"> Daftar Sekarang </button>
              </p>
            </div>

            <div class="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
              <div class="flex items-center justify-center space-x-2">
                <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                  />
                </svg>
                <span class="text-sm text-green-700 font-medium">Butuh bantuan? WhatsApp: 0838-0887-2110</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>

<!-- Registration Modal -->
{#if showRegistrationModal}
  <div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" transition:fade>
    <div class="bg-gray-100 bg-opacity-50 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" transition:slide>
      <div class="sticky top-0  bg-gradient-to-r from-white via-indigo-400 to-purple-600  backdrop-blur-sm rounded-t-2xl border-b border-gray-200 px-6 py-4 z-10">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-bold text-purple-800">Pendaftaran Siswa Baru</h2>
          <!-- svelte-ignore a11y_consider_explicit_label -->
          <button onclick={closeModal} class="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div class="p-6 bg-gray-100 bg-opacity-50 rounded-b-2xl">
        {#if validations?.data?.error}
          <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl" transition:fade>
            <div class="flex">
              <svg class="w-5 h-5 text-red-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
              <div>
                <h3 class="text-red-800 font-semibold text-sm">Periksa kembali!</h3>
                <p class="text-red-700 text-sm mt-1">
                  {#if validations?.data?.errors?.message}
                    {validations.data.errors.message}
                  {:else}
                    Terdapat kesalahan dalam pengisian form
                  {/if}
                </p>
              </div>
            </div>
          </div>
        {/if}

        <form method="POST" action="?/create" use:enhance={submitHandler} class="space-y-6">
          <!-- Institution Selection -->
          <div class="space-y-2">
            <label class="text-xs font-medium text-gray-800 flex items-center" for="namasekoalh">
              <svg class="w-4 h-4 mr-2 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clip-rule="evenodd" />
              </svg>
              Nama Sekolah
            </label>
            <select name="institution_id" bind:value={selinstitution_id} onchange={onChangeInstitution} class="text-xs text-gray-800 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-100 bg-opacity-50 ">
              <option value="">Pilih Nama Sekolah</option>
              {#if filteredinstitution}
                {#each filteredinstitution as option}
                  <option value={option.value}>{option.name}</option>
                {/each}
              {/if}
            </select>
            {#if validations?.data?.errors?.institution_id}
              <p class="text-sm text-red-600">
                {validations.data.errors.institution_id}
              </p>
            {/if}
          </div>

          <div class="grid sm:grid-cols-2 gap-6">
            <!-- Level Group -->
            <div class="space-y-2">
              <label for="lembaga" class="text-xs font-medium text-gray-800 flex items-center">
                <svg class="w-4 h-4 mr-2 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.84L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.84l-7-3z" />
                </svg>
                Lembaga
              </label>
              <select name="grouplevel_id" bind:value={sellevelgroup_id} class="text-xs w-full text-gray-800 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-100 bg-opacity-50">
                <option value="">Pilih lembaga</option>
                {#if data?.dropdowngoruplevel}
                  {#each data.dropdowngoruplevel as option}
                    <option value={option.value}>{option.name}</option>
                  {/each}
                {/if}
              </select>
              {#if validations?.data?.errors?.grouplevel_id}
                <p class="text-sm text-red-600">
                  {validations.data.errors.grouplevel_id}
                </p>
              {/if}
            </div>

            <!-- Level -->
            <div class="space-y-2">
              <label for="tingkatan" class="text-xs font-medium text-gray-800 flex items-center">
                <svg class="w-4 h-4 mr-2 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Tingkatan
              </label>
              <select name="level_id" bind:value={sellevel_id} disabled={disable} class="text-gray-800 text-xs w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-100 bg-opacity-50 disabled:bg-gray-100 disabled:cursor-not-allowed">
                <option value="">Pilih tingkatan</option>
                {#each filteredlevel as option}
                  <option value={option.value}>{option.name}</option>
                {/each}
              </select>
              {#if validations?.data?.errors?.level_id}
                <p class="text-sm text-red-600">
                  {validations.data.errors.level_id}
                </p>
              {/if}
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-6">
            <!-- Student Name -->
            <div class="space-y-2">
              <label for="nama" class="text-sm font-medium text-gray-800 flex items-center">
                <svg class="w-4 h-4 mr-2 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
                Nama Calon Siswa Sesuai Akta Kelahiran
              </label>
              <input type="hidden" name="period_year" value={data.registrationperiod?.period_name} />
              <input type="text" name="student_name" class="text-xs  text-gray-800 w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-100 bg-opacity-50" placeholder="Masukkan nama lengkap" />
              {#if validations?.data?.errors?.student_name}
                <p class="text-xs text-red-600">
                  {validations.data.errors.student_name}
                </p>
              {/if}
            </div>

            <!-- NIK -->
            <div class="space-y-2">
              <label for="nik" class="text-xs font-medium text-gray-800 flex items-center">
                <svg class="w-4 h-4 mr-2 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
                </svg>
                NIK
              </label>
              <input type="text" name="username" autocomplete="off" class="text-gray-800 text-xs w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-100 bg-opacity-50" placeholder="Masukkan NIK 16 digit" />
              {#if validations?.data?.errors?.username}
                <p class="text-sm text-red-600">
                  {validations.data.errors.username}
                </p>
              {/if}
            </div>
          </div>

          <div class="grid sm:grid-cols-2 gap-6">
            <!-- Email -->
            <div class="space-y-2">
              <label for="" class="text-sm font-medium text-gray-800 flex items-center ">
                <svg class="w-4 h-4 mr-2 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email
              </label>
              <input type="email" name="student_email" autocomplete="off" class="text-gray-800 text-xs w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-100 bg-opacity-50" placeholder="Masukkan email aktif" />
              {#if validations?.data?.errors?.student_email}
                <p class="text-sm text-red-600">
                  {validations.data.errors.student_email}
                </p>
              {/if}
            </div>

            <!-- Phone WhatsApp -->
            <div class="space-y-2">
              <label for="" class="text-sm font-medium text-gray-800 flex items-center">
                <svg class="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                  />
                </svg>
                Telepon Aktif Ayah (Support WhatsApp)
              </label>
              <input type="tel" name="student_father_phonewa" bind:value={student_father_phonewa} oninput={e => allowOnlyDigits(e, 15)} pattern="[0-9]*" class="text-gray-800 text-xs w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-gray-100 bg-opacity-50" placeholder="Contoh: 08123456789" />
              {#if validations?.data?.errors?.student_father_phonewa}
                <p class="text-sm text-red-600">
                  {validations.data.errors.student_father_phonewa}
                </p>
              {/if}
            </div>
          </div>

          <div class="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button type="button" onclick={closeModal} class="text-xs px-6 py-3 border border-gray-300 text-gray-800 rounded-xl hover:bg-gray-50 transition-colors font-medium"> Batal </button>
            <button type="submit" class="text-xs px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold flex items-center">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              Daftar Sekarang
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Custom scrollbar for modal */
  .overflow-y-auto::-webkit-scrollbar {
    width: 6px;
  }

  .overflow-y-auto::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 3px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }

  .overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }

  /* Smooth transitions */
  * {
    transition: all 0.2s ease;
  }

  /* Focus states */
  input:focus,
  select:focus {
    transform: translateY(-1px);
    box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.15);
  }

  /* Button hover effects */
  button:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  /* Glass morphism effect */
  .bg-gray-100 bg-opacity-50\/80 {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }

  .bg-gray-100 bg-opacity-50\/60 {
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
  }
</style>
