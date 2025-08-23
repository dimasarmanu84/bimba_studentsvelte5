<script lang="ts">
  import { PUBLIC_API_URL } from '$env/static/public';
  import { SetHeaderApi } from '$lib/Helper';
  import { onMount } from 'svelte';
  export let data: any;
  let tahapancontent: any;
  let panduancontent: any;
  let openCara: boolean = true;
  let openBayar: boolean = false;
  let showVA: boolean = false;

  onMount(async () => {
    const result = await fetch(`${PUBLIC_API_URL}api/master/registrationcontent/edit/3`, {
      method: 'GET',
      headers: SetHeaderApi()
    });
    let jsonData = await result.json();
    tahapancontent = jsonData.data;

    const resultPanduan = await fetch(`${PUBLIC_API_URL}api/master/registrationcontent/edit/1`, {
      method: 'GET',
      headers: SetHeaderApi()
    });
    let jsonDataPanduan = await resultPanduan.json();
    panduancontent = jsonDataPanduan.data;
  });
</script>

<div class="justify-left flex w-full text-[16px] max-[500px]:w-full bg-gray-900">
  <div class="w-full border border-blue-300 bg-gray-50 p-4 max-[500px]:p-0 ">
    <div class="bg-gray-50 p-4 text-left text-sm text-gray-500 max-[500px]:w-[100%]" style="margin: auto;">
      Yang terhormat {data?.studentdata?.student_name},
      <br />
      <br />
      Terima kasih Telah Bergabung di {data?.useraccess?.institution_name}. Pendaftaran akan segera kami proses setelah Anda melakukan pembayaran di ATM atau fasilitas Internet Banking yang terhubung
      dengan jaringan ATM Bersama, Prima, atau ALTO.
      <br />
      <br />
      Pembayaran Melalui:
      <br />
      <br />
      <table class="w-full border-collapse border">
        <tbody>
          <tr class="hover:bg-gray-100">
            <td class="pt-2 pl-2 text-left text-xs text-gray-500" style="min-width:120px">Nama</td>
            <td class="pr-2 pl-2  text-left text-xs text-gray-500">:</td>
            <td class="pr-2  text-left text-xs text-gray-500">{data?.studentdata?.student_name} </td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="pr-2 pl-2  text-left text-xs text-gray-500">Bank</td>
            <td class="pr-2 pl-2  text-left text-xs text-gray-500">:</td>
            <td class=" text-left text-xs text-gray-500">BSI (Bank Syariah Indonesia)</td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="pr-2 pl-2 text-left text-xs text-gray-500">Nomor Pembayaran</td>
            <td class="pr-2 pl-2 text-left text-xs text-gray-500">:</td>
            <td class=" text-left text-xs text-gray-500">01{data?.studentdata?.registration_number}</td>
          </tr>
          <tr class="hover:bg-gray-100">
            <td class="pr-2 pb-2 pl-2 text-gray-500">Total Bayar</td>
            <td class="pr-2 pl-2 text-gray-500">:</td>
            <td class="text-gray-500">{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(data?.studentdata?.bill_amount)}</td>
          </tr>
        </tbody>
      </table>

      <br />
      {@html tahapancontent?.registrationcontent_text.replace('{nomor_pembayaran}', data?.studentdata?.registration_number)}
      <!--
      <br />
      <Button size="xs" class="gap-2 text-xs" on:click={() => (openBayar = true)} color="red">Klik disini untuk melakukan pembayaran menggunakan layanan VA/Transfer lain</Button>
      -->
      <br />
    </div>
  </div>
</div>

<style media="screen">
 
</style>