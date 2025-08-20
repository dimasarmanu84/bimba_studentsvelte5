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

<div class="justify-left flex w-full text-[16px] max-[500px]:w-full">
  <div class="w-full border border-blue-300 bg-white p-4 max-[500px]:p-0">
    <div class="bg-white p-4 text-left text-sm text-gray-500 max-[500px]:w-[100%]" style="margin: auto;">
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
          <tr>
            <td class="pt-2 pl-2" style="min-width:120px">Nama</td>
            <td class="pr-2 pl-2">:</td>
            <td class="pr-2">{data?.studentdata?.student_name} </td>
          </tr>
          <tr>
            <td class="pr-2 pl-2">Bank</td>
            <td class="pr-2 pl-2">:</td>
            <td>BSI (Bank Syariah Indonesia)</td>
          </tr>
          <tr>
            <td class="pr-2 pl-2">Nomor Pembayaran</td>
            <td class="pr-2 pl-2">:</td>
            <td>01{data?.studentdata?.registration_number}</td>
          </tr>
          <tr>
            <td class="pr-2 pb-2 pl-2">Total Bayar</td>
            <td class="pr-2 pl-2">:</td>
            <td>{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(data?.studentdata?.bill_amount)}</td>
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
  .payment ul {
    list-style-type: none;
  }

  .payment li {
    display: inline-block;
    border: 1px solid rgb(221, 221, 221);
  }

  input[type='radio'][id^='cb'] {
    display: none;
  }

  .radiocheck {
    border: 1px solid #fff;
    padding: 10px;
    display: block;
    position: relative;
    margin: 10px;
    cursor: pointer;
  }

  .radiocheck:before {
    background-color: white;
    color: white;
    content: ' ';
    display: block;
    border-radius: 50%;
    border: 1px solid grey;
    position: absolute;
    top: -5px;
    left: -5px;
    width: 25px;
    height: 25px;
    text-align: center;
    line-height: 28px;
    transition-duration: 0.4s;
    transform: scale(0);
  }

  .radiocheck:hover {
    background-color: rgb(99, 212, 139);
    font-size: 18px;
  }

  .radiocheck img {
    height: 100px;
    width: 100px;
    transition-duration: 0.2s;
    transform-origin: 50% 50%;
    object-fit: contain;
  }

  :checked + .radiocheck:before {
    content: '✓';
    background-color: grey;
    transform: scale(1);
  }

  :checked + .radiocheck img {
    transform: scale(0.9);
    z-index: -1;
    background-color: rgb(225, 235, 228);
    font-size: 18px;
  }
</style>
