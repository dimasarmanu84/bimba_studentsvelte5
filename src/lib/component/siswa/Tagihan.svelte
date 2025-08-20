<script lang="ts">
  import { Tooltip } from 'flowbite-svelte';
  import { AngleDownOutline } from 'flowbite-svelte-icons';
  import { onMount } from 'svelte';
  import { slide } from 'svelte/transition';
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

<section class="bg-white py-0">
  <div class="mt-2 mb-2 ml-2 text-sm">
    Keterangan nomor bayar : <br />
  </div>
  <table class="w-full border-b border-gray-200">
    <thead>
      <tr class="border-b bg-white last:border-b-0">
        <td class="w-[40%] p-2 text-sm">Registrasi</td>
        <td class="w-[1px]">:</td>
        <td class="p-2 text-sm">
          01{formData.registration_number}
        </td>
      </tr>
    </thead>
    <tbody>
      {#if formData.student_nisl != ''}
        <tr class="border-b border-gray-200 bg-white last:border-b-0">
          <td class="p-2 text-sm">Uang Pangkal</td>
          <td>:</td>
          <td class="p-2 text-sm">
            02{formData.student_nisl.replace(/\./g, '')}
          </td>
        </tr>
        <tr class="border-b bg-white last:border-b-0">
          <td class="p-2 text-sm">SPP</td>
          <td>:</td>
          <td class="p-2 text-sm">03{formData.student_nisl.replace(/\./g, '')} </td>
        </tr>
      {/if}
    </tbody>
  </table>

  <br />

  <table class="w-full border-b border-gray-200">
    <tbody>
      <tr class="border-b border-gray-200 bg-white last:border-b-0">
        <td class="w-[40%] p-2 text-sm">Total Tagihan</td>
        <td class="w-[1px]">:</td>
        <td class="p-2 text-sm">
          Rp
          {bill_amount}
        </td>
      </tr>
      <tr class="border-b border-gray-200 bg-white last:border-b-0">
        <td class="p-2 text-sm">Tagihan Dibayar</td>
        <td>:</td>
        <td class="p-2 text-sm">
          Rp {paid_amount}
        </td>
      </tr>
      <tr class="border-b bg-white last:border-b-0">
        <td class="p-2 text-sm">Sisa Tagihan</td>
        <td>:</td>
        <td class="p-2 text-sm"
          >Rp
          {bill_amount_remind}
        </td>
      </tr>
    </tbody>
  </table>
  <br />

  <br />
  <div class="mt-2 mb-2 flex text-sm">
    Klik tombol <AngleDownOutline class="border-white-700 focus-within:ring-primary-300 mr-2 ml-2 h-4 w-4 rounded-full border bg-orange-400 p-1 text-white" strokeWidth="3.3" size="xs" /> untuk melihat
    detail informasi
  </div>
  <div class="clearfixrelative overflow-x-auto pb-10">
    <table class="w-full min-w-[800px]">
      <thead>
        <tr class="border-b bg-white last:border-b-0">
          <td class="w-[50px] border-r border-l p-2 text-center text-sm" style="color: #0b2e5f;background-color: #dce6f5;border-color: #c8d8ef;">No</td>
          <td class="border-r border-l p-2 text-center text-sm" style="color: #0b2e5f;background-color: #dce6f5;border-color: #c8d8ef;">Periode</td>
          <td class="w-[200px] border-r border-l p-2 text-center text-sm" style="color: #0b2e5f;background-color: #dce6f5;border-color: #c8d8ef;">Total</td>
          <td class="w-[200px] border-r border-l p-2 text-center text-sm" style="color: #0b2e5f;background-color: #dce6f5;border-color: #c8d8ef;">Dibayar</td>
          <td class="w-[200px] border-r border-l p-2 text-center text-sm" style="color: #0b2e5f;background-color: #dce6f5;border-color: #c8d8ef;">Sisa</td>
        </tr>
      </thead>
      <tbody>
        {#if listbill}
          {#each listbill as row, i}
            <tr class="border-b bg-white last:border-b-0">
              <td class="border-r border-l p-2 text-center text-sm">{i + no}</td>
              <td class="flex cursor-pointer border-r border-l p-2 pt-2 text-center text-sm" on:click={() => ShowBill(i, row.student_id)}
                >{formData.period_year}
                <AngleDownOutline class="border-white-700 focus-within:ring-primary-300 ml-2 h-4 w-4 rounded-full border bg-orange-400 p-1 text-white" strokeWidth="3.3" size="xs" /><Tooltip
                  class="z-10 text-sm">Lihat Tagihan</Tooltip
                ></td
              >
              <td class="w-[200px] border-r border-l p-2 text-right text-sm"
                >{new Intl.NumberFormat('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 0
                }).format(row.bill_amount.toLocaleString('en'))}
              </td>
              <td class="w-[200px] border-r border-l p-2 text-right text-sm"
                >{new Intl.NumberFormat('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 0
                }).format(row.paid_amount.toLocaleString('en'))}</td
              >
              <td class="w-[200px] border-r border-l p-2 text-right text-sm"
                >{new Intl.NumberFormat('en-US', {
                  style: 'decimal',
                  minimumFractionDigits: 0
                }).format(row.bill_amount_remind.toLocaleString('en'))}</td
              >
            </tr>

            {#if openRowBill === i}
              <tr class="pb-2">
                <td colspan="10" class="p-0">
                  <div class="mb-3 pt-2 pl-10" transition:slide={{ duration: 300, axis: 'y' }}>
                    <table class="w-full">
                      <thead>
                        <tr class="border-b bg-white last:border-b-0">
                          <td colspan="10" class="border-b border-l p-2 text-center text-sm" style="color: #0b2e5f;background-color: #dce6f5;border-color: #c8d8ef;">TAGIHAN</td>
                        </tr>
                        <tr class="border-b bg-white last:border-b-0">
                          <td class="w-[50px] border-r border-l p-2 text-center text-sm" style="color: #0b2e5f;background-color: rgb(247 246 213);border-color: #c8d8ef;">No</td>
                          <td class="border-r border-l p-2 text-center text-sm" style="color: #0b2e5f; background-color: rgb(247, 246, 213); border-color: #c8d8ef; width: 400px;"> Nama Tagihan </td>
                          <td class="w-[200px] border-r border-l p-2 text-center text-sm" style="color: #0b2e5f;background-color: rgb(247 246 213);border-color: #c8d8ef;">Tanggal</td>
                          <td class="w-[200px] border-r border-l p-2 text-center text-sm" style="color: #0b2e5f;background-color: rgb(247 246 213);border-color: #c8d8ef;">Bulan</td>
                          <td class="w-[200px] border-r border-l p-2 text-center text-sm" style="color: #0b2e5f;background-color: rgb(247 246 213);border-color: #c8d8ef;">Total Tagihan</td>
                          <td class="w-[200px] border-r border-l p-2 text-center text-sm" style="color: #0b2e5f;background-color: rgb(247 246 213);border-color: #c8d8ef;">Dibayar</td>
                          <td class="w-[200px] border-r border-l p-2 text-center text-sm" style="color: #0b2e5f;background-color: rgb(247 246 213);border-color: #c8d8ef;">Sisa</td>
                        </tr>
                      </thead>
                      <tbody>
                        {#if liststudentbill}
                          {#each liststudentbill as rowitem, o}
                            <tr class="border-b bg-white last:border-b-0">
                              <td class="border-r border-l p-2 text-center text-sm">{o + no}</td>
                              {#if rowitem.paid_amount > 0}
                                <td class="flex cursor-pointer border-r border-l p-2 pt-2 text-sm" on:click={() => OpenPayment(o, rowitem.studentbill_id)}
                                  >{rowitem.costgroup_name}
                                  <AngleDownOutline
                                    class="border-white-700 focus-within:ring-primary-300 ml-2 h-4 w-4 rounded-full border bg-orange-400 p-1 text-white"
                                    strokeWidth="3.3"
                                    size="xs"
                                  /><Tooltip class="z-10 text-sm">Lihat Pembayaran</Tooltip></td
                                >
                              {:else}
                                <td class="border-r border-l p-2 text-sm">{rowitem.costgroup_name} </td>
                              {/if}
                              <td class="w-[200px] border-r border-l p-2 text-center text-sm">{formatDate(rowitem.bill_date).replace('00:00:00', '')}</td>
                              <td class="w-[200px] border-r border-l p-2 text-center text-sm">{rowitem.month_name}</td>
                              <td class="w-[200px] border-r border-l p-2 text-right text-sm"
                                >{new Intl.NumberFormat('en-US', {
                                  style: 'decimal',
                                  minimumFractionDigits: 0
                                }).format(rowitem.bill_amount.toLocaleString('en'))}</td
                              >
                              <td class="w-[200px] border-r border-l p-2 text-right text-sm"
                                >{new Intl.NumberFormat('en-US', {
                                  style: 'decimal',
                                  minimumFractionDigits: 0
                                }).format(rowitem.paid_amount.toLocaleString('en'))}</td
                              >
                              <td class="w-[200px] border-r border-l p-2 text-right text-sm"
                                >{new Intl.NumberFormat('en-US', {
                                  style: 'decimal',
                                  minimumFractionDigits: 0
                                }).format(rowitem.bill_amount_remind.toLocaleString('en'))}</td
                              >
                            </tr>

                            {#if openRowPayment === o && listbillpayment}
                              <tr class="pb-2">
                                <td colspan="10" class="p-0">
                                  <div class="mt-2 mb-10 pt-2 pl-10" transition:slide={{ duration: 300, axis: 'y' }}>
                                    <table class="w-full border-b">
                                      <thead>
                                        <tr class="border-b bg-white last:border-b-0">
                                          <td colspan="10" class="border-b border-l p-2 text-center text-sm" style="color: #0b2e5f;background-color: rgb(238 242 239);border-color: #c8d8ef;"
                                            >PEMBAYARAN</td
                                          >
                                        </tr>
                                        <tr class="border-b bg-white last:border-b-0">
                                          <td class="border-r border-l p-2 text-center text-sm" style="color: #0b2e5f;background-color: rgb(206 251 203);border-color: #c8d8ef;">Tanggal Bayar</td>
                                          <td class="w-[200px] border-r border-l p-2 text-center text-sm" style="color: #0b2e5f;background-color: rgb(206 251 203);border-color: #c8d8ef;">Tipe</td>
                                          <td class="w-[200px] border-r border-l p-2 text-center text-sm" style="color: #0b2e5f;background-color: rgb(206 251 203);border-color: #c8d8ef;"
                                            >ID Transaksi</td
                                          >
                                          <td class="w-[200px] border-r border-l p-2 text-center text-sm" style="color: #0b2e5f;background-color: rgb(206 251 203);border-color: #c8d8ef;">Total</td>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {#if listbillpayment}
                                          {#each listbillpayment as rowpayment, o}
                                            <tr class="border-b bg-white last:border-b-0">
                                              <td class="w-[200px] border-r border-l p-2 text-center text-sm">{formatDate(rowpayment.trans_time)}</td>
                                              <td class="w-[200px] border-r border-l p-2 text-center text-sm">
                                                {rowpayment.payment_request_id == null ? 'Bank' : rowpayment.payment_request_id == '' ? 'Cash' : 'Bank'}</td
                                              >
                                              <td class="w-[200px] border-r border-l p-2 text-center text-sm"> {rowpayment.payment_request_id}</td>
                                              <td class="w-[200px] border-r border-l p-2 text-right text-sm"
                                                >{new Intl.NumberFormat('en-US', {
                                                  style: 'decimal',
                                                  minimumFractionDigits: 0
                                                }).format(rowpayment.paid_amount.toLocaleString('en'))}</td
                                              >
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
                  </div></td
                >
              </tr>
            {/if}
          {/each}
        {/if}
      </tbody>
    </table>
  </div>
</section>
