<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import { AngleDownOutline, AngleUpOutline } from 'flowbite-svelte-icons';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
  import { TableStyles } from '$lib/Constant.json';
  import { getallbillstudentamount, getbillbystudentyear, getbillpayment, getbillstudent } from './DataComponent';
  export let pageData: any;
  export let formData: Record<string, string> = {};

  let listbill: any;
  let liststudentbill: any;
  let listbillpayment: any;
  let no = 1;
  let databill: any;

  let bill_amount = '';
  let paid_amount = '';
  let bill_amount_remind = '';

  onMount(async () => {
    listbill = await getbillstudent(pageData, formData.student_id);
    databill = await getallbillstudentamount(pageData, Number(formData.student_id));

    bill_amount = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0
    }).format(databill.bill_amount);
    paid_amount = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0
    }).format(databill.paid_amount);
    bill_amount_remind = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 0
    }).format(databill.bill_amount_remind);
  });

  let openRowBill: any;
  function ShowBill(i: number, student_id: any): any {
    openRowPayment = null;
    openRowBill = openRowBill === i ? null : i;
    if (openRowBill != null) {
      loadbillstudent(student_id);
    }
  }

  let openRowPayment: any;

  async function loadbillstudent(student_id: number) {
    liststudentbill = [];
    liststudentbill = await getbillbystudentyear(pageData, student_id, formData.period_year);
  }

  async function loadbillpayment(studentbill_id: number) {
    listbillpayment = [];
    listbillpayment = await getbillpayment(pageData, studentbill_id);
  }

  function OpenPayment(i: number, studentbill_id: any): any {
    openRowPayment = openRowPayment === i ? null : i;
    if (openRowPayment != null) {
      loadbillpayment(studentbill_id);
    }
  }

  function formatDate(dateString: any) {
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, '0'); // Get day and pad with zero if needed
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Get month (0-indexed) and pad
    const year = date.getUTCFullYear(); // Get full year
    const hour = String(date.getUTCHours()).padStart(2, '0'); // Get hour and pad with zero if needed
    const minute = String(date.getUTCMinutes()).padStart(2, '0'); // Get minute and pad with zero if needed
    const second = String(date.getUTCSeconds()).padStart(2, '0'); // Get second and pad with zero if needed

    return `${day}-${month}-${year} ${hour}:${minute}:${second}`; // Return in dd-mm-yyyy hh:mm:ss format
  }
</script>

<div class="relative z-20 mt-6 px-4">

  
  <div class="mt-2 mb-2 ml-2 text-sm">
    Keterangan nomor bayar : <br />
  </div>
  <table class="w-full border-b border-gray-200 hover:bg-gray-10">
    <thead>
      <tr class="{TableStyles.trClass}">
        <td class="{TableStyles.trClass} text-xs text-gray-800 w-30">Registrasi</td>
        <td class="{TableStyles.trClass} text-gray-800">:</td>
        <td class="{TableStyles.trClass} text-xs text-gray-800">
          01{formData.registration_number}
        </td>
      </tr>
    </thead>
    <tbody>
      {#if formData.student_nisl != ''}
        <tr class="{TableStyles.trClass}">
          <td class="{TableStyles.trClass}" >Uang Pangkal</td>
          <td class="{TableStyles.trClass}">:</td>
          <td class="{TableStyles.trClass}">
            02{formData.student_nisl.replace(/\./g, '')}
          </td>
        </tr>
        <tr class="{TableStyles.trClass}">
          <td class="{TableStyles.trClass}">SPP</td>
          <td class="{TableStyles.trClass}">:</td>
          <td class="{TableStyles.trClass}">03{formData.student_nisl.replace(/\./g, '')} </td>
        </tr>
      {/if}
    </tbody>
  </table>

  <br />

  <table class="w-full border-b border-gray-200 hover:bg-gray-10">
    <tbody>
      <tr class="{TableStyles.trClass} p-2">
        <td class="{TableStyles.trClass} text-xs text-gray-800 p-2 w-30">Total Tagihan</td>
        <td class="{TableStyles.trClass} text-xs text-gray-800 p-2">:</td>
        <td class="{TableStyles.trClass} text-xs text-gray-800 p-2">
          Rp
          {bill_amount}
        </td>
      </tr>
      
      <tr class="{TableStyles.trClass} p-2">
        <td class="{TableStyles.trClass} text-xs text-gray-800 p-2 w-30">Tagihan Dibayar</td>
        <td class="{TableStyles.trClass} text-xs text-gray-800 p-2">:</td>
        <td class="{TableStyles.trClass} text-xs text-gray-800 p-2">
          Rp {paid_amount}
        </td>
      </tr>
      <tr class="{TableStyles.trClass} p-2">
        <td class="{TableStyles.trClass} text-xs text-gray-800 p-2 w-30">Sisa Tagihan</td>
        <td class="{TableStyles.trClass} text-xs text-gray-800 p-2"> :</td>
        <td class="{TableStyles.trClass} text-xs text-gray-800 p-2"
          >Rp
          {bill_amount_remind}
        </td>
      </tr>
    </tbody>
  </table>
  <br />

  <br />
  <div class="mt-2 mb-2 flex text-xs text-gray-800">
    Klik tombol <AngleDownOutline class="text-white border-white-700 focus-within:ring-primary-300 mr-2 ml-2 h-4 w-4 rounded-full border bg-orange-400 p-1 " strokeWidth="3.3" size="xs" /> untuk melihat
    detail informasi
  </div>
  <div class="clearfixrelative overflow-x-auto pb-10">
    <table class="w-full min-w-[800px] bg-white border border-gray-300 rounded-lg shadow-sm">
      <thead>
        <tr class="bg-gray-100 border-b border-gray-300">
          <td class="w-[50px] border-r border-gray-300 p-3 text-center text-xs font-semibold text-gray-800">No</td>
          <td class="w-[50px] border-r border-gray-300 p-3 text-center text-xs font-semibold text-gray-800"></td>
          <td class="border-r border-gray-300 p-3 text-center text-xs font-semibold text-gray-800">Periode</td>
          <td class="w-[200px] border-r border-gray-300 p-3 text-center text-xs font-semibold text-gray-800">Total</td>
          <td class="w-[200px] border-r border-gray-300 p-3 text-center text-xs font-semibold text-gray-800">Dibayar</td>
          <td class="w-[200px] p-3 text-center text-xs font-semibold text-gray-800">Sisa</td>
        </tr>
      </thead>
      <tbody>
        {#if listbill}
          {#each listbill as row, i}
            <tr class="border-b border-gray-200 bg-gray-50 hover:bg-gray-50 transition-colors">
              <td class="border-r border-gray-200 p-3 text-center text-sm text-gray-800">{i + no}</td>
              <td class="flex cursor-pointer border-r border-gray-200 p-3 text-center text-sm items-center justify-center space-x-2 hover:bg-blue-50" on:click={() => ShowBill(i, row.student_id)}>
               
                
                {#if openRowBill === i}
                  <AngleUpOutline class="border-white-700 focus-within:ring-primary-300 mr-2 ml-2 h-4 w-4 rounded-full border bg-orange-400 p-1 text-white" strokeWidth="3.3" size="xs" />
                {:else}
                  <AngleDownOutline class="border-white-700 focus-within:ring-primary-300 mr-2 ml-2 h-4 w-4 rounded-full border bg-orange-400 p-1 text-white" strokeWidth="3.3" size="xs" />
                {/if}
                <Tooltip class="z-10 text-xs">Lihat {row.costpackage_name}</Tooltip>
              </td>
              <td class="border-r border-gray-200 p-3 text-center text-sm text-gray-800">{formData.period_year} </td>
              <td class="border-r border-gray-200 p-3 text-right text-sm text-gray-800 font-medium">
                {new Intl.NumberFormat('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 0
                }).format(row.bill_amount.toLocaleString('en'))}
              </td>
              <td class="border-r border-gray-200 p-3 text-right text-sm text-green-600 font-medium">
                {new Intl.NumberFormat('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 0
                }).format(row.paid_amount.toLocaleString('en'))}
              </td>
              <td class="p-3 text-right text-sm text-red-600 font-medium">
                {new Intl.NumberFormat('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 0
                }).format(row.bill_amount_remind.toLocaleString('en'))}
              </td>
            </tr>
    
            {#if openRowBill === i}
              <tr>
                <td colspan="6" class="p-0 bg-gray-100 bg-opacity-50 ">
                  <div class="m-4 bg-gray-50 border border-gray-200 " transition:slide={{ duration: 300, axis: 'y' }}>
                    <table class="w-full">
                      <thead>
                        <tr class="bg-gray-50 border-b border-blue-200">
                          <td colspan="7" class="p-3 text-center text-sm font-bold text-gray-800 uppercase tracking-wide">
                            Tagihan
                          </td>
                        </tr>
                        <tr class="bg-yellow-50 border-b border-yellow-200">
                          <td class="w-[50px] border-r border-yellow-200 p-2 text-center text-xs font-semibold text-gray-800">No</td>
                          <td class="border-r border-yellow-200 p-2 text-center text-xs font-semibold text-gray-800" style="width: 400px;">Nama Tagihan</td>
                          <td class="w-[150px] border-r border-yellow-200 p-2 text-center text-xs font-semibold text-gray-800">Tanggal</td>
                          <td class="w-[150px] border-r border-yellow-200 p-2 text-center text-xs font-semibold text-gray-800">Bulan</td>
                          <td class="w-[150px] border-r border-yellow-200 p-2 text-center text-xs font-semibold text-gray-800">Total Tagihan</td>
                          <td class="w-[150px] border-r border-yellow-200 p-2 text-center text-xs font-semibold text-gray-800">Dibayar</td>
                          <td class="w-[150px] p-2 text-center text-xs font-semibold text-gray-800">Sisa</td>
                        </tr>
                      </thead>
                      <tbody>
                        {#if liststudentbill}
                          {#each liststudentbill as rowitem, o}
                            <tr class="border-b border-gray-200 bg-gray-50 hover:bg-yellow-25 transition-colors">
                              <td class="border-r border-gray-200 p-2 text-center text-sm text-gray-800">{o + no}</td>
                              {#if rowitem.paid_amount > 0}
                                <td class="flex cursor-pointer border-r border-gray-200 p-2 text-xs items-center space-x-2 hover:bg-green-50" 
                                    on:click={() => OpenPayment(o, rowitem.studentbill_id)}>
                                  <span class="text-gray-800">{rowitem.costgroup_name}</span>
                                  <AngleDownOutline
                                    class="h-4 w-4 rounded-full border bg-orange-400 p-1 text-white hover:bg-orange-500 transition-colors"
                                    strokeWidth="3.3"
                                    size="xs"
                                  />
                                  <Tooltip class="z-10 text-sm">Lihat Pembayaran</Tooltip>
                                </td>
                              {:else}
                                <td class="border-r border-gray-200 p-2 text-sm text-gray-800">{rowitem.costgroup_name}</td>
                              {/if}
                              <td class="border-r border-gray-200 p-2 text-center text-sm text-gray-800">
                                {formatDate(rowitem.bill_date).replace('00:00:00', '')}
                              </td>
                              <td class="border-r border-gray-200 p-2 text-center text-sm text-gray-800">{rowitem.month_name}</td>
                              <td class="border-r border-gray-200 p-2 text-right text-sm text-gray-800 font-medium">
                                {new Intl.NumberFormat('en-US', {
                                  style: 'decimal',
                                  minimumFractionDigits: 0
                                }).format(rowitem.bill_amount.toLocaleString('en'))}
                              </td>
                              <td class="border-r border-gray-200 p-2 text-right text-sm text-green-600 font-medium">
                                {new Intl.NumberFormat('en-US', {
                                  style: 'decimal',
                                  minimumFractionDigits: 0
                                }).format(rowitem.paid_amount.toLocaleString('en'))}
                              </td>
                              <td class="p-2 text-right text-sm text-red-600 font-medium">
                                {new Intl.NumberFormat('en-US', {
                                  style: 'decimal',
                                  minimumFractionDigits: 0
                                }).format(rowitem.bill_amount_remind.toLocaleString('en'))}
                              </td>
                            </tr>
    
                            {#if openRowPayment === o && listbillpayment}
                              <tr>
                                <td colspan="7" class="p-0">
                                  <div class="m-4 bg-green-50 border border-green-200 rounded-lg" transition:slide={{ duration: 300, axis: 'y' }}>
                                    <table class="w-full">
                                      <thead>
                                        <tr class="bg-green-100 border-b border-green-200">
                                          <td colspan="4" class="p-3 text-center text-sm font-bold text-green-800 uppercase tracking-wide">
                                            Pembayaran
                                          </td>
                                        </tr>
                                        <tr class="bg-green-50 border-b border-green-200">
                                          <td class="border-r border-green-200 p-2 text-center text-xs font-semibold text-gray-700">Tanggal Bayar</td>
                                          <td class="w-[200px] border-r border-green-200 p-2 text-center text-xs font-semibold text-gray-700">Tipe</td>
                                          <td class="w-[200px] border-r border-green-200 p-2 text-center text-xs font-semibold text-gray-700">ID Transaksi</td>
                                          <td class="w-[200px] p-2 text-center text-xs font-semibold text-gray-700">Total</td>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {#if listbillpayment}
                                          {#each listbillpayment as rowpayment, p}
                                            <tr class="border-b border-green-200 bg-gray-50 hover:bg-green-25 transition-colors last:border-b-0">
                                              <td class="border-r border-green-200 p-2 text-center text-xs text-gray-600">
                                                {formatDate(rowpayment.trans_time)}
                                              </td>
                                              <td class="border-r border-green-200 p-2 text-center text-xs">
                                                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {rowpayment.payment_request_id == null || rowpayment.payment_request_id == '' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}">
                                                  {rowpayment.payment_request_id == null ? 'Bank' : rowpayment.payment_request_id == '' ? 'Cash' : 'Bank'}
                                                </span>
                                              </td>
                                              <td class="border-r border-green-200 p-2 text-center text-xs text-gray-600 font-mono">
                                                {rowpayment.payment_request_id || '-'}
                                              </td>
                                              <td class="p-2 text-right text-xs text-green-600 font-bold">
                                                {new Intl.NumberFormat('en-US', {
                                                  style: 'decimal',
                                                  minimumFractionDigits: 0
                                                }).format(rowpayment.paid_amount.toLocaleString('en'))}
                                              </td>
                                            </tr>
                                          {/each}
                                        {/if}
                                      </tbody>
                                    </table>
                                  </div>
                                </td>
                              </tr>
                            {/if}
                          {/each}
                        {/if}
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            {/if}
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
</div>
