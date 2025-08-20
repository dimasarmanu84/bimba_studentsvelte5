<script lang="ts">
  import { PUBLIC_API_URL, PUBLIC_FILE_URL } from '$env/static/public';
  import { PrintDiv, SetHeaderApi } from '$lib/Helper';
  import { Button } from 'flowbite-svelte';
  import { FacebookSolid, GlobeSolid, InstagramSolid, PrinterOutline } from 'flowbite-svelte-icons';
  import { onMount } from 'svelte';

  let { data } = $props<{ data: any }>();
  let print: boolean = $state(false);
  let tahapancontent: any;
  let tahapancontentText: string = $state('');

  onMount(async () => {
    const result = await fetch(`${PUBLIC_API_URL}api/master/registrationcontent/edit/8`, {
      method: 'GET',
      headers: SetHeaderApi()
    });
    let jsonData = await result.json();
    tahapancontent = await jsonData.data;

    tahapancontentText = tahapancontent?.registrationcontent_text;
    tahapancontentText = tahapancontentText.replace('{period_year}', data?.studentdata?.period_year);
  });

  let printableContent: HTMLDivElement | null = $state(null);
</script>

<div class="flex w-full justify-center text-left max-[500px]:w-full" style="font-size:16px">
  <div class="flex w-full min-w-[380px] flex-col bg-gray-500 max-[500px]:pr-0 max-[500px]:pb-4 max-[500px]:pl-0">
    <div class="grid gap-4 text-white xl:grid-cols-1 2xl:grid-cols-2">
      <div>
        <div class="print-area pt-10 max-[500px]:ml-[5px] max-[500px]:pt-[10px]" bind:this={printableContent}>
          <center>
            <div class="kartu-ujian">
              <center>
                <!-- svelte-ignore a11y-missing-attribute -->
                <img src="/images/dss_logo.png" class="img-responsive" style="width: 45px" />
                <h5 style="margin-top: 1px;">
                  <b class="ng-binding">
                    DORMITORY CARD<br />
                    {data?.useraccess?.institution_name.toUpperCase()}
                  </b>
                </h5>
                <div class="pas-foto">
                  {#if data?.studentdata?.student_photo != ''}
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <img class="img-thumbnail" style="height: 100%; width: 100%" src="{PUBLIC_FILE_URL}{data?.studentdata?.student_photo}" />
                  {:else}
                    <!-- svelte-ignore a11y-missing-attribute -->
                    <img
                      class="img-thumbnail"
                      style="height: 100%; width: 100%"
                      src="https://ss1.darunnajah.com/v2/sisko/siswa/image?path=/globalfolder/photo/undefined&amp;width=200&amp;height=250"
                    />
                  {/if}
                </div>
              </center>
              <div style="height: 0.2cm" class="ng-scope"></div>
              <div class="div-tbl-ujian ng-scope">
                <table border="0" style="width: 100%" class="tbl-ujian">
                  <tbody>
                    <tr>
                      <td width="40%">Nama</td>
                      <td class="ng-binding">: {data?.studentdata?.student_name} </td></tr
                    >
                    <tr>
                      <td>No. Registrasi</td>
                      <td class="ng-binding">: {data?.studentdata?.registration_number}</td>
                    </tr>
                    <tr>
                      <td>DOR/ROOM</td>
                      <td class="ng-binding">:</td>
                    </tr>
                    <tr>
                      <td>BED/WARDROBE</td>
                      <td class="ng-binding">:</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="mt-1 text-center">
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
        </center>
        <br />
        <br />
        <br />
      </div>
      <div class="no-print p-4 max-[500px]:p-0 max-[500px]:p-5">
        {@html tahapancontentText}
      </div>
    </div>
  </div>
</div>

<style>
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
