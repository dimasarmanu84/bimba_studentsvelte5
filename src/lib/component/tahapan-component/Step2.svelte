<script lang="ts">
  import { enhance } from '$app/forms';
  import { goto } from '$app/navigation';
  import ToastTop from '$lib/component/ToastTop.svelte';
  import { type SubmitFunction } from '@sveltejs/kit';
  import { Button, Modal } from 'flowbite-svelte';
  import { FloppyDiskSolid } from 'flowbite-svelte-icons';
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import DomicileProfile from './Profile/DomisiliProfile.svelte';
  import EducationStageProfile from './Profile/JenjangProfile.svelte';
  import ParentProfile from './Profile/OrangTuaProfile.svelte';
  import StudentProfile from './Profile/SiswaProfile.svelte';
  export let data: any;
  let validations: any;
  let comp: ToastTop;
  let formdata: Record<string, string> = {};
  var strvalidation = '';
  let openSuccess: boolean = false;

  let jenisKelamin = [
    { value: 'L', name: 'Laki-laki' },
    { value: 'P', name: 'Perempuan' }
  ];

  formdata = data?.studentdata;

  function init(form: HTMLFormElement) {
    if (formdata) {
      for (const key in formdata) {
        const el: any = form.elements.namedItem(key);
        if (el) el.value = formdata[key];
      }
    }
  }

  let tanggal: { name: string; value: string }[] = [];
  let bulan: { name: string; value: string }[] = [];
  let tahun: { name: string; value: string }[] = [];
  let groupLevel: any;

  onMount(() => {
    const currentYear = new Date().getFullYear();

    for (let i = 1; i < 32; i++) {
      tanggal.push({ name: i.toString(), value: i.toString() });
    }

    for (let i = 1; i < 13; i++) {
      bulan.push({ name: i.toString(), value: i.toString() });
    }

    for (let i = currentYear - 5; i > currentYear - 90; i--) {
      tahun.push({ name: i.toString(), value: i.toString() });
    }
  });

  const submitHandler: SubmitFunction = ({ formElement, formData, action, cancel }) => {
    formData.append('Instance', data?.useraccess?.institution_name);
    return async ({ result, update }) => {
      switch (result.type) {
        case 'success':
          comp.OpenToast('Data berhasil disimpan!');
          if (result.data?.iscompelete) {
            openSuccess = true;
            setTimeout(() => {
              goto('/tahapan');
            }, 2000);
          }

          break;
        case 'failure':
          strvalidation = '';
          validations = result;
          window.scrollTo({ top: 0, behavior: 'smooth' });
          if (validations?.data?.errors?.message) {
            comp.OpenToast(validations?.data?.errors?.message!);
            return;
          }
          let oo: any[] = [];
          validations?.data.errors.forEach(function (value: any, key: number) {
            oo.push(value?.message);
          });
          strvalidation = oo.join(', ');
          break;
      }
    };
  };

  let activeTabValue = 1;
  const handleClick = (tabValue: number) => () => (activeTabValue = tabValue);

  function onClose() {
    openSuccess = false;
    document.body.style.overflow = 'auto';
  }
</script>

<ToastTop bind:this={comp} />
<div class="justify-left flex w-full text-[16px] max-[500px]:w-full">
  <div class="flex w-full min-w-[380px] flex-col border border-blue-300 bg-white p-4 max-[500px]:p-0">
    <!--Data Pribadi-->

    <form use:init action="?/updatestudent" method="POST" use:enhance={submitHandler}>
      {#if validations?.data?.error}
        <div transition:fade>
          <div role="alert" class="gap-3 divide-red-300 rounded-lg border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:divide-red-800 dark:border-red-800 dark:bg-gray-800 dark:text-red-400">
            <h3 class="text-xm font-bold" style="font-size: 14px;">Periksa kembali!</h3>
            <hr class="mt-2 mb-2" />
            <div class="flex content-start text-xs">
              {strvalidation}
            </div>
          </div>
        </div>
      {/if}
      <StudentProfile {data} {jenisKelamin} {tanggal} {bulan} {tahun}></StudentProfile>
      <EducationStageProfile {data}></EducationStageProfile>
      <ParentProfile {data} {tanggal} {bulan} {tahun}></ParentProfile>
      <DomicileProfile {data}></DomicileProfile>
      <div class="text-xm mt-2 w-full font-semibold text-gray-500 max-[500px]:p-2">
        <Button type="submit" size="xl" class="w-full bg-lime-500 font-semibold"><FloppyDiskSolid class="mr-2" />SIMPAN</Button>
      </div>
    </form>
  </div>
</div>

<Modal title="Konfirmasi" onclose={onClose} bind:open={openSuccess} autoclose={false} class="relative w-full max-w-[700px]">
  <!-- Modal body -->
  <form>
    <div class="grid grid-cols-1 gap-x-6 gap-y-2">
      <div class="sm:col-span-3">
        <label for="Nama" class="block flex text-xs leading-6 font-medium text-gray-900">
          <h3 class="mb-5 text-sm font-normal text-gray-500 dark:text-gray-400">Proses akan dilanjutkan ke tahapan selanjutnya.</h3>
        </label>
      </div>
    </div>
    <br />
  </form>
</Modal>
