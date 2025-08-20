<script lang="ts">
  import { enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { PUBLIC_API_URL, PUBLIC_FILE_URL } from '$env/static/public';
  import ToastTop from '$lib/component/ToastTop.svelte';
  import { PrintDiv, SetHeaderApi } from '$lib/Helper';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Button, Modal, Spinner } from 'flowbite-svelte';
  import { FacebookSolid, GlobeSolid, InstagramSolid, PrinterOutline, UploadOutline } from 'flowbite-svelte-icons';
  import { onMount } from 'svelte';

  let { data } = $props<{ data: any }>();
  let tahapancontent: any = $state();
  let disabled: boolean = false;
  let loading = $state(false);
  let openUpload: boolean = $state(false);
  let files: any = $state();
  let comp: ToastTop;
  let filesize = $state(0);

  onMount(async () => {
    const result = await fetch(`${PUBLIC_API_URL}api/master/registrationcontent/edit/5`, {
      method: 'GET',
      headers: SetHeaderApi()
    });
    let jsonData = await result.json();
    tahapancontent = jsonData.data;
  });

  let avatar: string = $state(''),
    fileinput: HTMLInputElement;

  function onChageFile(e: Event & { currentTarget: EventTarget & HTMLInputElement }): any {
    filesize = 0;

    const fileInput = e.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    filesize = Number(file?.size) / 1000000;
    if (filesize > 1) {
      comp.OpenToast('Ukuran file tidak boleh lebih besar dari 1 Mb');
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        avatar = reader.result as string;
      };
    }
  }

  const uploadHandler: SubmitFunction = ({ formElement, formData, action, cancel }) => {
    formData.append('Instance', data?.useraccess?.institution_name);
    return async ({ result, update }) => {
      switch (result.type) {
        case 'success':
          comp.OpenToast('Data berhasil disimpan!');
          loading = false;
          disabled = true;
          openUpload = false;
          await invalidateAll();
          break;
        case 'failure':
          await invalidateAll();
          break;
      }
    };
  };

  function closeDialog() {
    avatar = '';
    openUpload = false;
    document.body.style.overflow = 'auto';
  }
  let printableContent: HTMLDivElement | null = $state(null);
</script>

<ToastTop bind:this={comp} />
<div class="flex w-full justify-center text-left max-[500px]:w-full">
  <div class="flex w-full min-w-[380px] flex-col bg-gray-500 max-[500px]:pr-0 max-[500px]:pb-4 max-[500px]:pl-0">
    <div class="grid gap-4 text-white xl:grid-cols-1 2xl:grid-cols-2">
      <div class="sm:col-span-1">
        <div class="pt-10 max-[500px]:ml-[5px] max-[500px]:pt-[10px]" bind:this={printableContent}>
          <center>
            <div class="kartu-ujian">
              <center>
                <img src="/images/dss_logo.png" class="img-responsive w-[45px]" alt="Darunnajah Smart Syetem" />
                <h5 style="margin-top: 1px;">
                  <b class="ng-binding">
                    KARTU SELEKSI<br />
                    SISWA BARU {data?.studentdata?.period_year}<br />
                    {data?.useraccess?.institution_name}
                  </b>
                </h5>
                <div class="pas-foto">
                  {#if data?.studentdata?.student_photo != ''}
                    <img class="img-thumbnail w-full" alt="Pas Foto" src="{PUBLIC_FILE_URL}{data?.studentdata?.student_photo}" />
                  {:else}
                    <img class="img-thumbnail w-full" alt="Pas Foto" src="https://ss1.darunnajah.com/v2/sisko/siswa/image?path=/globalfolder/photo/undefined&amp;width=200&amp;height=250" />
                  {/if}
                </div>
              </center>
              <div style="height: 0.2cm"></div>
              <div class="div-tbl-ujian ng-scope">
                <table border="0" style="width: 100%; color: #000;">
                  <tbody>
                    <tr>
                      <td width="45%">Nama</td>
                      <td class="ng-binding">: {data?.studentdata?.student_name}</td>
                    </tr>
                    <tr>
                      <td>No. Registrasi</td>
                      <td class="ng-binding">: {data?.studentdata?.registration_number}</td>
                    </tr>
                    <tr>
                      <td>Jenjang Pendidikan</td>
                      <td class="ng-binding">: {data?.studentdata?.levelgroup_name} - {data?.studentdata?.level_name}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mt-3 text-center">
                <center>
                  <div class="inline-flex content-center items-center justify-center text-center align-middle"><GlobeSolid size="xs" />www.darunnajah.com</div>
                  <div class="inline-flex content-center items-center justify-center pl-2 text-center align-middle">
                    <InstagramSolid size="xs" /> Darunnajah<FacebookSolid size="xs" />Darunnajah
                  </div>
                </center>
              </div>
            </div>
          </center>
        </div>
        <center>
          <br />
          <Button class="bg-green-500" size="xs" onclick={() => PrintDiv(printableContent)}><PrinterOutline></PrinterOutline> PRINT</Button>
          <Button class="bg-orange-500" size="xs" onclick={() => ((openUpload = true), (document.body.style.overflow = 'hidden'))}><UploadOutline></UploadOutline> PHOTO</Button>
        </center>
      </div>
      <div class="pt-4 pb-4 sm:col-span-1">
        {@html tahapancontent?.registrationcontent_text}
      </div>
    </div>
  </div>
</div>

<Modal title="Upload Foto" onclose={closeDialog} bind:open={openUpload} autoclose={false} class="relative w-full max-w-[500px]">
  <!-- Modal body -->
  <form action="?/uploadfoto" method="POST" use:enhance={uploadHandler} enctype="multipart/form-data">
    <div class="grid grid-cols-1 gap-x-6 gap-y-2">
      <input type="hidden" name="student_id" value={data?.studentdata?.student_id} />
      <center>
        {#if avatar}
          <img class="avatar" style="height: 80%;" src={avatar} alt="d" />
        {:else}
          <!-- svelte-ignore a11y-missing-attribute -->
          <img class="img-thumbnail" style="height: 80%;" src="https://ss1.darunnajah.com/v2/sisko/siswa/image?path=/globalfolder/photo/undefined&amp;width=200&amp;height=250" />
        {/if}
      </center>
      <div class="sm:col-span-3">
        <label for="Nama" class="block flex text-xs leading-6 font-medium text-gray-900">
          <input accept="image/png, image/jpeg" bind:files id="file" name="file" type="file" onchange={(e) => onChageFile(e)} />
          <div class="mt-2"></div>
        </label>
      </div>
      <br />
      Filesize : {filesize} Mb
    </div>
    <br />
    {#if files}
      <Button type="submit" size="sm" class="w-full text-sm text-white" color="blue"
        >{#if loading}<Spinner class="me-3" size="4" />{/if}Upload</Button
      >
    {/if}
  </form>
</Modal>

<style>
  :global(.kontent_kartu) {
    font-size: 14px;
    padding-left: 20px;
    padding-right: 20px;
  }
  :global(.tablepernyataan) {
    border: none;
    border-collapse: collapse;
    font-size: 12px;
  }

  :global(.tablepernyataan td) {
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
    padding: 3px;
  }

  :global(.tablepernyataan th) {
    border-left: 1px solid #fff;
    border-right: 1px solid #fff;
    border-bottom: 1px solid #fff;
  }

  .kartu-ujian {
    border: none;
    font-size: 14px;
    width: 9cm;
    height: 12cm;
    border: none;
    padding: 10px 30px 10px 30px;
    background-image: url(/images/kartu-04.png);
    background-size: 100%;
    color: #000;
  }
  .kartu-ujian table {
    font-size: 12px;
    text-align: left;
    width: 100%;
  }

  .kartu-ujian table {
    font-size: 11px;
    text-align: left;
  }

  .div-tbl-ujian {
    background-color: #fff;
    padding: 3px;
    border: none;
    font-size: 14px;
  }
  .pas-foto {
    width: 3cm;
    height: 4cm;
    border: none;
  }

  @media print {
    .no-print {
      display: none !important;
    }

    .print-area {
      box-shadow: none !important;
      border-radius: 0 !important;
    }

    @page {
      margin: 1cm;
      size: A4;
    }
  }

  /* Enhanced visual effects for screen */
  .print-area {
    transform: translateY(0);
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }
</style>
