<script lang="ts">
  import { applyAction, enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { PUBLIC_API_URL } from '$env/static/public';
  import ToastTop from '$lib/component/ToastTop.svelte';
  import { SetHeaderApi } from '$lib/Helper';
  import type { SubmitFunction } from '@sveltejs/kit';
  import { Button, Modal, Spinner } from 'flowbite-svelte';
  import { UploadOutline } from 'flowbite-svelte-icons';
  import { onMount } from 'svelte';

  let openUpload: boolean = false;
  let theadClass = 'border-y border-gray-200 text-sm p-2';
  let thClass = 'p-2 py-2 border-r border-l border-gray-200';
  let tdClass = 'p-2 pl-2 text-sm border-r border-l border-gray-200';
  let tdCenterClass = 'p-2 text-sm text-center border-r border-l border-gray-200';

  export let data: any;
  let tahapancontent: any;
  let uploadlist: any;
  let titlemodal: any;
  let registrationfile_id: any;
  let files: any;

  let disabled: boolean = false;
  let loading = false;
  let filesize = 0;
  let comp: ToastTop;
  let image = null;
  let imageUrl: any;

  onMount(async () => {
    const result = await fetch(`${PUBLIC_API_URL}api/master/registrationcontent/edit/3`, {
      method: 'GET',
      headers: SetHeaderApi()
    });
    let jsonData = await result.json();
    tahapancontent = await jsonData.data;

    loadDataUpload();
  });

  async function loadDataUpload() {
    const resultupload = await fetch(`${PUBLIC_API_URL}api/trans/fileupload/student/` + data?.studentdata?.student_id, {
      method: 'GET',
      headers: SetHeaderApi()
    });
    let jsonDataUpload = await resultupload.json();
    uploadlist = await jsonDataUpload.data;
  }

  function onChageFile(e: Event & { currentTarget: EventTarget & HTMLInputElement }): any {
    filesize = 0;

    const fileInput = e.target as HTMLInputElement;
    const file = fileInput.files?.[0];
    filesize = Number(file?.size) / 1000000;
    if (filesize > 1) {
      disabled = true;
      comp.OpenToast('Ukuran file tidak boleh lebih besar dari 1 Mb');
      return;
    }
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {};
      let image = file;
      imageUrl = URL.createObjectURL(image as Blob);
      disabled = false;
    }
  }

  const uploadHandler: SubmitFunction = ({ formElement, formData, action, cancel }) => {
    formData.append('Instance', data?.useraccess?.institution_name);
    return async ({ result, update }) => {
      switch (result.type) {
        case 'success':
          loading = false;
          disabled = true;
          openUpload = false;
          loadDataUpload();
          await applyAction(result);
          break;
        case 'failure':
          loading = false;
          openUpload = false;
          await invalidateAll();
          break;
      }
    };
  };

  function closeDialog() {
    openUpload = false;

    files = null;
    imageUrl = null;
  }
</script>

<div class="flex w-full justify-center max-[500px]:w-full">
  <div class="flex w-full gap-2 bg-blue-200 p-4 text-sm text-blue-600">Upload Kelengkapan Berkas / Dokumen</div>
</div>
<div class="flex w-full justify-center text-left max-[500px]:w-full" style="font-size:14px">
  <div class="flex w-full flex-col overflow-y-auto border border-blue-300 bg-white p-4 max-[500px]:p-0">
    <table style="border-collapse: collapse;min-width:600px">
      <thead>
        <tr>
          <td colspan="100" class={theadClass} style="text-align: center;">KELENGKAPAN ADMINISTRASI</td>
        </tr>
        <tr class={theadClass}>
          <td class={tdCenterClass} style="width:50px">No</td>
          <td class={tdCenterClass} style="width:100px">#</td>
          <td class={tdCenterClass}>Keterangan</td>
          <td class={tdCenterClass} style="width:100px">Dibutuhkan File</td>
          <td class={tdCenterClass} style="width:100px">Sudah di Upload</td>
        </tr>
      </thead>
      <tbody>
        {#if uploadlist}
          {#each uploadlist as row, i}
            <tr>
              <td class={tdCenterClass}>{row.registrationfile_id}</td>
              <td class={tdCenterClass}>
                {#if row.qty < row.registrationfile_qty}
                  <Button size="xs" class="bg-orange-400" onclick={() => ((openUpload = true), (titlemodal = row.registrationfile_name), (registrationfile_id = row.registrationfile_id))}
                    ><UploadOutline size="xs" color="green" class="me-2 h-4 w-4 text-white" /> Upload</Button
                  >
                {/if}
              </td>
              <td class={tdClass}>{row.registrationfile_name}</td>
              <td class={tdCenterClass}>{row.registrationfile_qty}</td>
              <td class={tdCenterClass}>{row.qty == null ? '-' : row.qty}</td>
            </tr>
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
</div>
<ToastTop bind:this={comp} />
<Modal title={titlemodal} headerClass="text-sm" bind:open={openUpload} autoclose={false} onclose={closeDialog} class="relative w-full max-w-[700px]">
  <!-- Modal body -->
  <form action="?/upload" method="POST" use:enhance={uploadHandler} enctype="multipart/form-data">
    <div class="grid grid-cols-1 gap-x-6 gap-y-2">
      <input type="hidden" name="student_id" value={data?.studentdata?.student_id} />
      <input type="hidden" name="registrationfile_id" value={registrationfile_id} />
      <div class="sm:col-span-3">
        <label for="Nama" class="block flex text-sm leading-6 font-medium text-gray-900">
          <input
            accept="image/png, image/jpeg"
            bind:files
            id="file"
            name="file"
            type="file"
            class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:placeholder-gray-400"
            onchange={(e) => onChageFile(e)}
          />

          <div class="mt-2"></div>
        </label>
      </div>
    </div>
    <br />
    <div class="sm:col-span-3">
      {#if imageUrl}
        <img src={imageUrl} alt="" class="h-40 w-40 rounded-lg object-cover" />
        <p class="text-sm">Filesize : {filesize} Mb</p>
      {/if}

      <div class="mt-2"></div>
    </div>

    {#if files}
      <Button type="submit" size="sm" class="w-full text-sm text-white" color="blue" {disabled}
        >{#if loading}<Spinner class="me-3" size="4" />{/if}Upload</Button
      >
    {/if}
  </form>
</Modal>
