<script lang="ts">
  import { goto } from '$app/navigation';
  import BottomNav from '$lib/component/BottomNav.svelte';
  import Header from '$lib/component/Header.svelte';
  import Step1 from '$lib/component/tahapan-component/Step1.svelte';
  import Step3 from '$lib/component/tahapan-component/Step3.svelte';
  import Step4 from '$lib/component/tahapan-component/Step4.svelte';
  import Step6 from '$lib/component/tahapan-component/Step6.svelte';
  import { Button, Modal } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import Home from '$lib/component/Home.svelte'
    import Tagihan from '$lib/component/siswa/Tagihan.svelte'

  interface Props {
    data: PageData
  }

  let { data }: Props = $props();

  let openProfile = $state<boolean>(false);
  let openCara = $state<boolean>(false);

  onMount(async () => {
    switch (data?.studentdata?.registrationstep_id) {
      case 1:
        if (openCara) {
          document.body.style.overflow = 'hidden';
        }
        break;
      case 2:
        goto('/step-2');
        break;
      case 5:
        goto('/step-5');
        break;
    }
  });

  function closeModal() {
    openCara = true;
    document.body.style.overflow = 'auto';
  }

  let selected = $state<any>('home');

  function toggleDiv(item: any) {
    if (selected === item) {
      selected = null;
    } else {
      selected = item;
    }
  }

  function onBottomNavClick(e: any): void {
    console.log(e.param);
    selected = e.param;
    openProfile = false;

    switch (selected) {
      case 'tagihan':
        selected = 'tagihan';
        break;
      case 'logout':
        document.cookie = 'sessionid=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
        goto('/logout');
        break;
    }
  }
</script>

<Header {data}></Header>
<!-- Step -->


{#if selected === 'home'}
<div class="relative z-20 mt-0 px-4 bg-gray-100 bg-opacity-50">
  <br />
  <!-- <div class="flex w-full items-center justify-center pt-10 max-[600px]:pt-[50px]">
    <img src="/images/bismillah-w.png" style="width: 250px;" alt="Bismillah" class="" />
  </div> -->
  <div class="flex w-full items-center justify-center p-3 pt-5 text-center">
    <button class="flex"><h1 class="w-full text-xl font-semibold text-gray-800 uppercase">{data?.useraccess?.institution_name}</h1></button>
  </div>
  <br />
  <!-- Registration Steps - Unique Cards -->
  <div class="space-y-6 pb-24 ">
    <!-- 1. Registration Steps -->
    <div class="glass-card card-tilt relative overflow-hidden rounded-3xl">
      <div class="relative px-6 py-2 pt-4">
        <div class="flex items-start gap-x-6">
          <div class="hexagon {data?.studentdata?.registrationstep_id >= 1 ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-red-200'} flex flex-shrink-0 items-center justify-center">
            <div class="text-center text-white">
              <div class="text-lg font-bold">1</div>
            </div>
          </div>
          <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="mb-2 text-lg font-bold text-gray-800">Pendaftaran</h3>
                <p class="text-sm text-gray-600">Pendaftaran dan Biaya Pendaftaran</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {#if data?.studentdata?.registrationstep_id === 1}
        <Step1 {data} />
      {/if}
    </div>
    <!-- 2. Isi Data Steps -->
    <div class="glass-card card-tilt relative overflow-hidden rounded-3xl">
      <div class="blob-bg absolute top-0 right-0 h-32 w-32 opacity-10"></div>
      <div class="relative p-6">
        <div class="flex items-start gap-x-6">
          <div class="hexagon {data?.studentdata?.registrationstep_id >= 2 ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-red-200'} flex flex-shrink-0 items-center justify-center">
            <div class="text-center text-white">
              <div class="text-lg font-bold">2</div>
            </div>
          </div>
          <div class="min-w-0 flex-1">
            <div class="mb-3 flex items-start justify-between">
              <div>
                <h3 class="mb-2 text-lg font-bold text-gray-800">Data Pendaftaran</h3>
                <p class="text-sm text-gray-600">Form biodata dan informasi calon santri telah terisi lengkap</p>
              </div>
            </div>
            {#if data?.studentdata?.registrationstep_id > 2}
              <div class="flex items-center justify-between">
                <button
                  onclick={() => (data?.studentdata?.registrationstep_id > 2 ? goto('/step-2') : '')}
                  class="transform rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 text-sm text-white transition hover:scale-105 hover:from-blue-600 hover:to-blue-700"
                >
                  <i class="fas fa-chart-line mr-2"></i>Preview
                </button>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
    <!-- 3. Ujian Steps -->
    <div class="glass-card card-tilt relative overflow-hidden rounded-3xl">
      <div class="blob-bg absolute top-0 right-0 h-32 w-32 opacity-10"></div>
      <div class="relative p-6">
        <div class="flex items-start gap-x-6">
          <div class="hexagon {data?.studentdata?.registrationstep_id >= 3 ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-red-200'} flex flex-shrink-0 items-center justify-center">
            <div class="text-center text-white">
              <div class="text-lg font-bold">3</div>
            </div>
          </div>
          <div class="min-w-0 flex-1">
            <div class="mb-3 flex items-start justify-between">
              <div>
                <h3 class="mb-2 text-lg font-bold text-gray-800">Ujian Masuk</h3>
                <p class="text-sm text-gray-600">Calon santri atau siswa akan mengikuti Ujian Masuk</p>
              </div>
            </div>
          </div>
        </div>
        {#if data?.studentdata?.registrationstep_id === 3}
          <Step3 {data} />
        {/if}
      </div>
    </div>
   
    <!-- 5. Dokumen Steps -->
    <div class="glass-card card-tilt relative overflow-hidden rounded-3xl">
      <div class="blob-bg absolute top-0 right-0 h-32 w-32 opacity-10"></div>
      <div class="relative p-6">
        <div class="flex items-start gap-x-6">
          <div class="hexagon {data?.studentdata?.registrationstep_id >= 4 ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-red-200'} flex flex-shrink-0 items-center justify-center">
            <div class="text-center text-white">
              <div class="text-lg font-bold">5</div>
            </div>
          </div>
          <div class="min-w-0 flex-1">
            <div class="mb-3 flex items-start justify-between">
              <div>
                <h3 class="mb-2 text-lg font-bold text-gray-800">Dokumen</h3>
                <p class="text-sm text-gray-600">Upload kelengkapan dokumen</p>
              </div>
            </div>
            {#if data?.studentdata?.registrationstep_id > 4}
              <div class="flex items-center justify-between">
                <button
                  onclick={() => (data?.studentdata?.registrationstep_id > 5 ? goto('/step-5') : '')}
                  class="transform rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-2 text-sm text-white transition hover:scale-105 hover:from-blue-600 hover:to-blue-700"
                >
                  <i class="fas fa-chart-line mr-2"></i>Preview
                </button>
              </div>
            {/if}
          </div>
        </div>
      </div>
    </div>
    
  </div>

</div>
{/if}

{#if selected === 'tagihan'}
<div class="relative z-20 mt-0 px-4 bg-gradient-to-b from-purple-600  to-purple-100">

  
  
   
</div>

<div class="relative z-20 mt-0 px-4 bg-gray-100 bg-opacity-50">
  <br />
  <div class="flex w-full items-center justify-center pt-6 text-center ">
    <button class="flex"><h1 class="w-full text-xl font-semibold text-gray-800">INFORMASI TAGIHAN</h1></button>
  </div>
  
  <br />
  <!-- Registration Steps - Unique Cards -->
  <div class="space-y-6 pb-24 ">
    <!-- 1. Registration Steps -->
    <div class="glass-card card-tilt relative overflow-hidden rounded-3xl">
      <div class="relative px-6 py-2 pt-4">
        <div class="flex items-start gap-x-6">
          
          <div class="min-w-0 flex-1">
            <div class="flex items-start justify-between">
              <div>
                <h3 class="mb-2 text-lg font-bold text-gray-800">Tagihan Siswa</h3>
                <p class="text-sm text-gray-600">Pendaftaran dan Biaya Pendaftaran</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
        <Tagihan pageData={data.useraccess} formData={data.studentdata}></Tagihan>
    </div>
   
    
  </div>

</div>
{/if}
<!-- Floating Bottom Navigation -->
<BottomNav onbottomnavclick={onBottomNavClick} ></BottomNav>

<Modal title="Persyaratan menjadi Santri {data?.useraccess?.institution_name}" bind:open={openCara} autoclose={false} class="relative w-full max-w-[1000px]">
  <!-- Modal body -->
  <div class="grid grid-cols-1 gap-x-6 gap-y-2">
    <div class="text-left sm:col-span-3" style="font-size: 15px;">
      <ol style="list-style:number;padding-left:20px;line-height:25px">
        <li>
          Persyaratan umum
          <ul style="list-style: circle;padding-left:10px">
            <li>Berijazah MI/SD atau sederajat (masuk tingkat MTs/SMP)</li>
            <li>Berijazah MTs/SMP atau yang sederajat (masuk tingkat MA/SMA/Kelas Intensif)</li>
          </ul>
        </li>
        <li>
          Pendafaran
          <ul style="list-style: circle;padding-left:10px">
            <li>Pendaftaran diadakan secara online</li>
            <li>
              Dokumen yang perlu dilengkapi:
              <ol style="list-style-type: lower-roman;padding-left:15px">
                <li>Fotokopi Kartu Keluarga dan KTP kedua orang tua</li>
                <li>Fotokopi Akte Kelahiran</li>
                <li>Fotokopi NISN (Nomor Induk Siswa Nasional) atau Surat Keterangan belum mendapat NISN (bagi yang belum memiliki dari sekolah asal</li>
                <li>Surat Pernyataan, Surat Keterangan Sehat & Surat Keterangan Bebas Narkoba</li>
                <li>Fotokopi ijazah yang dilegalisir</li>
                <li>Fotokopi Surat Keterangan Lulus (SD/MI/Sederajat) dilegalisir untuk yang masuk tingkat MTs</li>
                <li>Fotokopi Surat Keterangan Lulus (SMP/MTs/Sederajat) dilegalisir untuk yang masuk tingkat MA/SMA/Intensif</li>
              </ol>
            </li>
          </ul>
        </li>
        <li>
          Materi Test
          <ul style="list-style: circle;padding-left:10px">
            <li>
              Materi ujian masuk tingkat MTs/SMP:
              <ol style="list-style-type: lower-roman;padding-left:15px">
                <li>Membaca Al-Quran</li>
                <li>Imla (Tulis Arab)</li>
                <li>Pengetahuan Agama</li>
                <li>Pengetahuan Umum (IPA, IPS dan Matematika)</li>
                <li>Wawancara Calon Santri</li>
                <li>Wawancara Orang Tua</li>
              </ol>
            </li>
            <li>
              Materi ujian masuk tingkat MA/SMA/Intensif:
              <ol style="list-style-type: lower-roman;padding-left:15px">
                <li>Membaca Al-Quran</li>
                <li>Imla (Tulis Arab)</li>
                <li>Pengetahuan Agama</li>
                <li>Pengetahuan Umum (IPA, IPS dan Matematika)</li>
                <li>Wawancara Calon Santri</li>
                <li>Wawancara Orang Tua</li>
              </ol>
            </li>
          </ul>
        </li>
      </ol>
    </div>
  </div>
  <br />
  <Button size="xs" onclick={() => closeModal()} class="gap-2 text-xs" color="red">Lanjutkan Pendaftaran</Button>
</Modal>

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

  .glass-card {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }
  .hexagon {
    width: 60px;
    height: 52px;
    position: relative;
    margin: 26px 0;
    clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
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
