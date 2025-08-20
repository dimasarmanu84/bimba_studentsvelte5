<script lang="ts">
  import { PUBLIC_API_URL } from '$env/static/public';
  import { SetHeaderApi } from '$lib/Helper';
  import { onMount } from 'svelte';
  export let data: any;
  let o = 1 * 3;
  let tahapancontent: any;
  let tahapancontentText = '';

  onMount(async () => {
    const result = await fetch(`${PUBLIC_API_URL}api/master/registrationcontent/edit/6`, {
      method: 'GET',
      headers: SetHeaderApi()
    });
    let jsonData = await result.json();
    tahapancontent = await jsonData.data;

    tahapancontentText = tahapancontent?.registrationcontent_text;
    tahapancontentText = tahapancontentText.replace('{o}', 'test');
  });
</script>

<div class="flex w-full justify-center text-left max-[500px]:w-full" style="font-size:16px">
  <div class="flex w-11/12 flex-col border border-blue-300 bg-white p-4 max-[500px]:p-0">
    <div class="w-full bg-white p-4 text-sm text-gray-500">
      <div class="keputusan">
        {@html tahapancontentText}
      </div>
    </div>

    <div class="mt-4 w-full p-4 text-base font-semibold text-gray-500">LAMPIRAN SURAT KEPUTUSAN</div>
    <div class="w-full bg-white p-4 text-sm text-gray-500">
      Hasil Tes Seleksi Masuk {data?.useraccess?.institution_name} Tahun Pelajaran {data?.studentdata?.period_year} <br />memutuskan:<br /><br />
      <table class="table">
        <tbody
          ><tr>
            <td style="max-width:100px">Nama</td>
            <td>:</td>
            <td>{data?.studentdata?.student_name}</td>
          </tr>
          <tr>
            <td style="max-width:100px">No. Registrasi</td>
            <td>:</td>
            <td>{data?.studentdata?.registration_number}</td>
          </tr>
          <tr>
            <td style="max-width:100px">Kelulusan</td>
            <td>:</td>
            <td>{data?.studentdata?.registrationstatus_name}</td>
          </tr>
          <tr>
            <td style="max-width:100px">Tanggal</td>
            <td>:</td>
            <td></td>
          </tr>
          <tr>
            <td style="max-width:100px">Tingkatan</td>
            <td>:</td>
            <td>1 - TMI</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--
    <div class="w-full text-base font-semibold text-gray-500 bg-orange-100 p-4 border border-orange-200 mt-4">INFORMASI TAGIHAN</div>
    <div class="w-full text-xm text-gray-500 bg-white p-4 border border-orange-200" style="font-size:14px">
      <table class="table">
        <tbody>
          <tr>
            <td style="max-width:100px">Kode Bank</td>
            <td style="max-width:10px">:</td>
            <td>147</td>
          </tr>
          <tr>
            <td style="max-width:100px">Nama Bank</td>
            <td>:</td>
            <td>Bank Muamalat</td>
          </tr>
          <tr>
            <td style="max-width:100px">No. Virtual Account / Rekening</td>
            <td>:</td>
            <td>8366200012300334</td>
          </tr>
          <tr>
            <td style="max-width:100px">Total Tagihan</td>
            <td>:</td>
            <td>Rp. 0</td>
          </tr>
        </tbody>
      </table>
      <table class="table">
        <tbody>
          <tr>
            <td>Keterangan</td>
            <td class="text-right">Jumlah</td>
          </tr>
          <tr>
            <td>Total</td>
            <td class="text-right ng-binding">0</td>
          </tr>
        </tbody>
      </table>
    </div>
    -->
  </div>
</div>

<style>
  .table {
    border-color: #eeeff1 !important;
  }
  .table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
  }
  table {
    background-color: transparent;
  }
  table {
    border-spacing: 0;
    border-collapse: collapse;
  }
  .table > tbody > tr > td {
    padding: 8px 4px;
    border-top: 1px solid #eeeff1;
  }
</style>
