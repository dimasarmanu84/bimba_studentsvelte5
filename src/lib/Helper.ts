import { browser } from '$app/environment'
import { PUBLIC_API_URL } from '$env/static/public'
import Cookies from 'js-cookie'
import { writable } from 'svelte/store'

export const ShowDelay = writable(false)
export const PromiseWithDelay = function () {
  return new Promise(function (resolve) {
    setTimeout(resolve, 1000)
  })
}

export async function GetStudentInfo(o: any) {
  const result = await fetch(`${PUBLIC_API_URL}api/sso/getstudentinfo/`, {
    method: 'POST',
    headers: SetHeaderApi(o),
  })
  let jsonData = await result.json()
  return jsonData
}

export function SetHeaderApi(cookies: any = null) {
  const instance = Cookies.get('Instance')!
  const auth = Cookies.get('Auth')!

  return browser ? { Instance: instance, Authorization: auth } : { Instance: cookies.get('Instance')!, Authorization: `Bearer ${cookies.get('Auth')!}` }
}

interface PrintOptions {
  windowFeatures?: string;
  printDelay?: number;
  preserveColors?: boolean;
}
export function PrintDiv(printableContent: any, options: PrintOptions = {}): void {
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
          <title>Print</title>
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
