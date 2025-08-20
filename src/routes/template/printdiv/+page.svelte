<script lang="ts">
  import { onMount } from 'svelte';

  // Types
  interface InvoiceItem {
    name: string;
    qty: number;
    price: number;
  }

  interface InvoiceData {
    number: string;
    customer: string;
    items: InvoiceItem[];
  }

  interface PrintOptions {
    windowFeatures?: string;
    printDelay?: number;
    preserveColors?: boolean;
  }

  // State variables
  let printableContent: HTMLDivElement | null = $state(null);
  let currentDate: string = $state('');

  onMount(() => {
    currentDate = new Date().toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  });

  /**
   * Print div content using new window method
   * @param options - Print configuration options
   */
  function printDiv(options: PrintOptions = {}): void {
    if (!printableContent) {
      console.error('Printable content element not found');
      return;
    }

    const { windowFeatures = 'width=800,height=600,scrollbars=yes,resizable=yes', printDelay = 500, preserveColors = true } = options;

    try {
      // Create new window for printing
      const printWindow: Window | null = window.open('', '_blank', windowFeatures);

      if (!printWindow) {
        alert('Pop-up diblokir! Silakan izinkan pop-up untuk fitur print.');
        return;
      }

      // Get all required styles (Flowbite CSS and custom styles)
      const styleElements: NodeListOf<HTMLLinkElement | HTMLStyleElement> = document.querySelectorAll('link[rel="stylesheet"], style');

      const styles: string = Array.from(styleElements)
        .map((el: HTMLLinkElement | HTMLStyleElement) => el.outerHTML)
        .join('');

      // Generate print-specific CSS
      const printCSS: string = `
        <style>
          @media print {
            body { 
              margin: 0; 
              padding: 20px; 
              ${preserveColors ? '-webkit-print-color-adjust: exact !important; color-adjust: exact !important;' : ''}
            }
            .no-print { display: none !important; }
            @page {
              margin: 1cm;
              size: A4;
            }
          }
          body { 
            font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.5;
            color: #1f2937;
          }
        </style>
      `;

      // Complete HTML for printing
      const printHTML: string = `
        <!DOCTYPE html>
        <html lang="id">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Print - ${invoiceData.number}</title>
          ${styles}
          ${printCSS}
        </head>
        <body>
          ${printableContent.innerHTML}
        </body>
        </html>
      `;

      // Write HTML to new window
      printWindow.document.write(printHTML);
      printWindow.document.close();

      // Wait for styles to load, then print
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, printDelay);
    } catch (error) {
      console.error('Error during printing:', error);
      alert('Terjadi error saat mencetak. Silakan coba lagi.');
    }
  }

  /**
   * Print div content directly in current window
   */
  function printDivDirect(): void {
    if (!printableContent) {
      console.error('Printable content element not found');
      return;
    }

    try {
      // Save original content
      const originalContent: string = document.body.innerHTML;
      const printContent: string = printableContent.innerHTML;

      // Replace with print content
      document.body.innerHTML = `
        <div style="padding: 20px; font-family: Inter, system-ui, sans-serif; max-width: none;">
          ${printContent}
        </div>
      `;

      // Print
      window.print();

      // Restore original content
      document.body.innerHTML = originalContent;

      // Note: In a real app, you might want to use a more sophisticated state management
      // to avoid reloading, but for this demo, reload ensures proper re-initialization
      setTimeout(() => location.reload(), 100);
    } catch (error) {
      console.error('Error during direct printing:', error);
      alert('Terjadi error saat mencetak. Silakan refresh halaman.');
    }
  }

  /**
   * Calculate total amount for invoice items
   * @param items - Array of invoice items
   * @returns Total amount
   */
  function calculateTotal(items: InvoiceItem[]): number {
    return items.reduce((sum: number, item: InvoiceItem) => sum + item.qty * item.price, 0);
  }

  /**
   * Format currency to Indonesian Rupiah
   * @param amount - Amount to format
   * @returns Formatted currency string
   */
  function formatCurrency(amount: number): string {
    return amount.toLocaleString('id-ID');
  }

  // Sample invoice data
  const invoiceData: InvoiceData = {
    number: 'INV-2024-001',
    customer: 'PT. Contoh Indonesia',
    items: [
      { name: 'Produk A - Premium Package', qty: 2, price: 150000 },
      { name: 'Produk B - Standard License', qty: 1, price: 300000 },
      { name: 'Produk C - Maintenance Support', qty: 3, price: 75000 }
    ]
  };
  let subtotal: number = 0;
  let tax: number = 0;
  let total: number = 0;
  $effect(() => {
    subtotal = calculateTotal(invoiceData.items);
    tax = Math.round(subtotal * 0.11);
    total = subtotal + tax;
  });
  // Calculated values
</script>

<!-- Flowbite CSS -->
<svelte:head>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.2.1/flowbite.min.css" rel="stylesheet" />
</svelte:head>

<div class="mx-auto min-h-screen max-w-4xl bg-gray-50 p-6">
  <h1 class="mb-6 text-center text-3xl font-bold text-gray-900">Demo Print Area Div - Svelte 5 + TypeScript</h1>

  <!-- Print Controls -->
  <div class="no-print mb-6 flex flex-wrap justify-center gap-4">
    <button onclick={() => printDiv()} class="transform rounded-lg bg-blue-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-blue-700">
      🖨️ Print Invoice (New Window)
    </button>

    <button
      onclick={() => printDiv({ printDelay: 1000, preserveColors: false })}
      class="transform rounded-lg bg-purple-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-purple-700"
    >
      🖨️ Print (No Colors)
    </button>

    <button onclick={printDivDirect} class="transform rounded-lg bg-green-600 px-6 py-3 font-medium text-white shadow-md transition-all duration-200 hover:scale-105 hover:bg-green-700">
      🖨️ Print Invoice (Direct)
    </button>
  </div>

  <!-- Information Box -->
  <div class="no-print mb-6 border-l-4 border-yellow-400 bg-gradient-to-r from-yellow-50 to-orange-50 p-4">
    <div class="flex items-start">
      <div class="mr-3 text-yellow-600">
        <svg class="mt-0.5 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div>
        <p class="mb-1 font-medium text-yellow-800">TypeScript Print Demo</p>
        <p class="text-sm text-yellow-700">
          Area ini tidak akan ikut ter-print. Hanya konten invoice dengan background putih yang akan dicetak. Implementasi menggunakan TypeScript untuk type safety yang lebih baik.
        </p>
      </div>
    </div>
  </div>

  <!-- Printable Content Area -->
  <div bind:this={printableContent} class="print-area overflow-hidden rounded-xl bg-white shadow-2xl">
    <!-- Invoice Header -->
    <div class="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 p-8 text-white">
      <div class="flex items-start justify-between">
        <div>
          <h2 class="mb-2 text-4xl font-bold tracking-tight">INVOICE</h2>
          <p class="text-lg text-blue-100">#{invoiceData.number}</p>
        </div>
        <div class="text-right">
          <div class="mb-1 text-2xl font-bold">PT. PERUSAHAAN</div>
          <p class="text-blue-100">Jl. Contoh No. 123</p>
          <p class="text-blue-100">Jakarta Pusat, 10220</p>
          <p class="text-blue-100">Indonesia</p>
          <p class="mt-2 text-blue-100">📞 +62-21-123-4567</p>
        </div>
      </div>
    </div>

    <!-- Invoice Details -->
    <div class="p-8">
      <div class="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <!-- Customer Information -->
        <div>
          <h3 class="mb-3 flex items-center text-lg font-semibold text-gray-800">
            <svg class="mr-2 h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
            </svg>
            Bill To:
          </h3>
          <div class="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <p class="text-lg font-semibold text-gray-900">{invoiceData.customer}</p>
            <p class="mt-2 text-gray-600">Jl. Customer No. 456</p>
            <p class="text-gray-600">Bandung, 40123</p>
            <p class="text-gray-600">Indonesia</p>
            <p class="mt-2 text-gray-600">📧 customer@example.com</p>
          </div>
        </div>

        <!-- Invoice Information -->
        <div>
          <h3 class="mb-3 flex items-center text-lg font-semibold text-gray-800">
            <svg class="mr-2 h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Invoice Details:
          </h3>
          <div class="rounded-xl border border-gray-200 bg-gray-50 p-5">
            <div class="space-y-3">
              <div class="flex justify-between">
                <span class="font-medium text-gray-600">Invoice Date:</span>
                <span class="font-semibold text-gray-900">{currentDate}</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium text-gray-600">Due Date:</span>
                <span class="font-semibold text-gray-900">30 Hari</span>
              </div>
              <div class="flex justify-between">
                <span class="font-medium text-gray-600">Status:</span>
                <span class="inline-flex rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800"> Pending </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Items Table -->
      <div class="mb-8 overflow-x-auto">
        <h3 class="mb-4 flex items-center text-lg font-semibold text-gray-800">
          <svg class="mr-2 h-5 w-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path
              d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"
            ></path>
          </svg>
          Items & Services:
        </h3>

        <table class="w-full border-collapse overflow-hidden rounded-lg bg-white shadow-sm">
          <thead>
            <tr class="border-b-2 border-gray-300 bg-gradient-to-r from-gray-50 to-gray-100">
              <th class="px-4 py-4 text-left font-semibold text-gray-800">Description</th>
              <th class="w-20 px-4 py-4 text-center font-semibold text-gray-800">Qty</th>
              <th class="w-32 px-4 py-4 text-right font-semibold text-gray-800">Unit Price</th>
              <th class="w-32 px-4 py-4 text-right font-semibold text-gray-800">Total</th>
            </tr>
          </thead>
          <tbody>
            {#each invoiceData.items as item, index}
              <tr class="border-b border-gray-200 transition-colors duration-150 hover:bg-blue-50">
                <td class="px-4 py-4 text-gray-800">{item.name}</td>
                <td class="px-4 py-4 text-center font-medium text-gray-600">{item.qty}</td>
                <td class="px-4 py-4 text-right text-gray-600">
                  Rp {formatCurrency(item.price)}
                </td>
                <td class="px-4 py-4 text-right font-semibold text-gray-800">
                  Rp {formatCurrency(item.qty * item.price)}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>

      <!-- Totals Section -->
      <div class="mb-8 flex justify-end">
        <div class="min-w-80 rounded-xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
          <div class="space-y-3">
            <div class="flex justify-between text-gray-700">
              <span class="font-medium">Subtotal:</span>
              <span class="font-semibold">Rp {formatCurrency(subtotal)}</span>
            </div>
            <div class="flex justify-between text-gray-700">
              <span class="font-medium">PPN (11%):</span>
              <span class="font-semibold">Rp {formatCurrency(tax)}</span>
            </div>
            <div class="border-t-2 border-blue-300 pt-3">
              <div class="flex justify-between">
                <span class="text-xl font-bold text-blue-800">TOTAL:</span>
                <span class="text-2xl font-bold text-blue-800">
                  Rp {formatCurrency(total)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Information -->
      <div class="border-t-2 border-gray-200 pt-6">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <!-- Payment Information -->
          <div>
            <h4 class="mb-3 flex items-center font-semibold text-gray-800">
              <svg class="mr-2 h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"></path>
              </svg>
              Payment Information:
            </h4>
            <div class="rounded-lg border border-green-200 bg-green-50 p-4">
              <p class="font-medium text-gray-700">Bank Transfer</p>
              <p class="mt-1 text-gray-600">Bank Central Asia (BCA)</p>
              <p class="text-gray-600">Account: 1234-5678-9012</p>
              <p class="text-gray-600">Name: PT. PERUSAHAAN</p>
            </div>
          </div>

          <!-- Authorization -->
          <div class="text-right">
            <h4 class="mb-3 font-semibold text-gray-800">Authorized By:</h4>
            <div class="mt-12">
              <div class="mb-3 ml-auto w-40 border-b-2 border-gray-400"></div>
              <p class="font-medium text-gray-600">Finance Manager</p>
              <p class="text-sm text-gray-500">PT. PERUSAHAAN</p>
            </div>
          </div>
        </div>

        <!-- Terms & Conditions -->
        <div class="mt-8 border-t border-gray-200 pt-6">
          <h4 class="mb-3 font-semibold text-gray-800">Terms & Conditions:</h4>
          <div class="space-y-1 text-sm text-gray-600">
            <p>• Payment due within 30 days of invoice date</p>
            <p>• Late payment may incur additional charges of 2% per month</p>
            <p>• All prices are in Indonesian Rupiah (IDR)</p>
            <p>• For questions regarding this invoice, please contact our finance department</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Demo Information (Not Printed) -->
  <div class="no-print mt-6 rounded-xl bg-white p-6 shadow-lg">
    <h3 class="mb-4 flex items-center text-xl font-semibold text-gray-800">
      <svg class="mr-2 h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
      </svg>
      TypeScript Features Demo:
    </h3>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
      <div class="space-y-3">
        <h4 class="font-medium text-gray-800">🎯 Type Safety:</h4>
        <ul class="space-y-1 text-sm text-gray-600">
          <li>• Interface untuk InvoiceItem dan InvoiceData</li>
          <li>• PrintOptions dengan parameter opsional</li>
          <li>• Type annotations untuk semua functions</li>
          <li>• Reactive variables dengan proper typing</li>
        </ul>
      </div>

      <div class="space-y-3">
        <h4 class="font-medium text-gray-800">🛠️ Print Options:</h4>
        <ul class="space-y-1 text-sm text-gray-600">
          <li>• <strong>New Window:</strong> Preview sebelum print</li>
          <li>• <strong>No Colors:</strong> Print tanpa background colors</li>
          <li>• <strong>Direct:</strong> Langsung ke print dialog</li>
          <li>• <strong>Error Handling:</strong> Try-catch untuk robustness</li>
        </ul>
      </div>
    </div>

    <!-- Statistics -->
    <div class="mt-6 border-t border-gray-200 pt-4">
      <div class="grid grid-cols-3 gap-4 text-center">
        <div class="rounded-lg bg-blue-50 p-3">
          <div class="text-2xl font-bold text-blue-600">{invoiceData.items.length}</div>
          <div class="text-sm text-gray-600">Items</div>
        </div>
        <div class="rounded-lg bg-green-50 p-3">
          <div class="text-2xl font-bold text-green-600">{invoiceData.items.reduce((sum, item) => sum + item.qty, 0)}</div>
          <div class="text-sm text-gray-600">Total Qty</div>
        </div>
        <div class="rounded-lg bg-purple-50 p-3">
          <div class="text-2xl font-bold text-purple-600">Rp {formatCurrency(total)}</div>
          <div class="text-sm text-gray-600">Total Amount</div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  @media print {
    .no-print {
      display: none !important;
    }

    .print-area {
      box-shadow: none !important;
      border-radius: 0 !important;
    }

    body {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
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

  .print-area:hover {
    transform: translateY(-2px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
  }
</style>
