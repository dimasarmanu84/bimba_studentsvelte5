<script lang="ts">
  import { Input, Select } from 'flowbite-svelte';
  import { QuestionCircleOutline } from 'flowbite-svelte-icons';
  import { onMount } from 'svelte';
  let { data, tanggal, bulan, tahun, jenisKelamin } = $props<{ data: any; tanggal: any; bulan: any; tahun: any; jenisKelamin: any }>();

  let formData: Record<string, string> = $state({});
  let tanggalLahir: string = $state('');
  let bulanLahir: string = $state('');
  let tahunLahir: string = $state('');
  let urutanKeluarga: { name: string; value: string }[] = $state([]);
  let orderFamily: string = $state('');
  let numberSibling: string = $state('');
  let dressSize = [
    { name: 'S', value: 'S' },
    { name: 'M', value: 'M' },
    { name: 'L', value: 'L' },
    { name: 'XL', value: 'XL' },
    { name: 'XXL', value: 'XXL' }
  ];
  let bloodType = [
    { name: 'O', value: 'O' },
    { name: 'A', value: 'A' },
    { name: 'B', value: 'B' },
    { name: 'AB', value: 'AB' }
  ];

  formData = data?.studentdata;

  onMount(() => {
    for (let i = 1; i < 21; i++) {
      urutanKeluarga.push({ name: i.toString(), value: i.toString() });
    }

    tanggalLahir = formData.student_dob_day;
    bulanLahir = formData.student_dob_month;
    tahunLahir = formData.student_dob_year;

    orderFamily = formData.student_order_family.toString();
    numberSibling = formData.student_number_siblings.toString();
  });

  let classTextBox = '"border outline-none';
  let classTextBoxNumber =
    "'block w-full px-3 py-2 bg-white border outline-none rounded-md text-[14px] shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  let styleFont = 'font-size:15px';

  function allowOnlyDigits(event: any, maxLength: number) {
    const input = event.target;
    const value = input.value.replace(/[^0-9]/g, '');
    if (value.length > maxLength) {
      input.value = value.slice(0, maxLength);
    } else {
      input.value = value;
    }
  }
</script>

<div class="w-full border border-orange-200 bg-orange-100 p-4 text-[14px] font-semibold text-gray-500">Data Calon Siswa/Santri</div>
<div class="w-full border border-orange-200 bg-white p-4 text-[14px] text-gray-500">
  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <input type="hidden" name="student_id" id="student_id" />
    <input type="hidden" name="registrationstep_id" id="registrationstep_id" />
    <div class="sm:col-span-3">
      <div class="flex items-center">
        <label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Nomor Induk Siswa Nasional (NISN)</label>
        <button type="button"><a href="cara_mancari_nisn.pdf" target="_blank"><QuestionCircleOutline class="ml-2 h-7 w-7 text-red-400" /></a></button>
      </div>
      <div class="mt-4">
        <Input type="number" name="student_nisn" class={classTextBoxNumber} style={styleFont} oninput={(e) => allowOnlyDigits(e, 15)} pattern="[0-9]*" />
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex items-center">
        <label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Nomor Pokok Sekolah Nasional (NPSN)</label><button type="button"
          ><a href="cara_mencari_npsn.pdf" target="_blank"><QuestionCircleOutline class="ml-2 h-7 w-7 text-red-400" /></a></button
        >
      </div>
      <div class="mt-4">
        <Input type="number" name="student_npsn" class={classTextBoxNumber} style={styleFont} oninput={(e) => allowOnlyDigits(e, 16)} pattern="[0-9]*" />
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <label for="" class="block flex text-left text-[14px] leading-6 font-medium text-gray-900">Nomor Statistik Sekolah (NSS) / Nomor Statistik Madrasah (NSM)</label>
      <div class="mt-4">
        <Input type="number" name="student_nss" class={classTextBoxNumber} style={styleFont} oninput={(e) => allowOnlyDigits(e, 16)} pattern="[0-9]*" />
      </div>
    </div>

    <div class="sm:col-span-3">
      <label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">No. Ijazah</label>
      <div class="mt-4">
        <Input type="number" name="student_no_ijazah" class={classTextBoxNumber} style={styleFont} oninput={(e) => allowOnlyDigits(e, 16)} pattern="[0-9]*" />
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Nama Lengkap</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Input name="student_name" class={classTextBox} style={styleFont} readonly />
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex">
        <label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">NIK (No. Induk Kependudukan)</label> <span class="ml-2 text-xl font-medium text-red-600">*</span>
      </div>
      <div class="mt-4">
        <Input type="number" name="student_nik" class={classTextBoxNumber} style={styleFont} oninput={(e) => allowOnlyDigits(e, 16)} pattern="[0-9]*" />
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Tanggal Lahir</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4 flex gap-4">
        <Select items={tanggal} placeholder="Tanggal" class={classTextBox} name="student_dob_day" bind:value={tanggalLahir} style={styleFont}></Select>
        <Select items={bulan} placeholder="Bulan" class={classTextBox} name="student_dob_month" bind:value={bulanLahir} style={styleFont}></Select>
        <Select items={tahun} placeholder="Tahun" class={classTextBox} name="student_dob_year" bind:value={tahunLahir} style={styleFont}></Select>
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Tempat Lahir</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Input name="student_bop" class={classTextBox} style={styleFont} maxlength={100} />
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-6">
      <div class="flex">
        <label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Urutan Dalam Keluarga</label> <span class="ml-2 text-xl font-medium text-red-600">*</span>
      </div>
      <div class="mt-4">
        <div class="flex">
          <button
            id="states-button"
            class="z-10 inline-flex flex-shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-[14px] font-medium text-gray-500 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            Anak Ke
          </button>
          <Select name="student_order_family" placeholder="Pilih" bind:value={orderFamily} items={urutanKeluarga} class="!rounded-s-none text-base font-normal" style={styleFont} />
          <button
            id="states-button"
            class="z-10 ml-2 inline-flex flex-shrink-0 items-center rounded-s-lg border border-gray-300 bg-gray-100 px-4 py-2.5 text-center text-[14px] font-medium text-gray-500 hover:bg-gray-200 focus:ring-4 focus:ring-gray-100 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            type="button"
          >
            Dari
          </button>
          <Select name="student_number_siblings" placeholder="Pilih" bind:value={numberSibling} items={urutanKeluarga} class="!rounded-s-none text-base font-normal" style={styleFont} />
        </div>
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Jenis Kelamin</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Select placeholder="Pilih" bind:value={formData.student_gender} items={jenisKelamin} class={classTextBox} name="student_gender" style={styleFont}></Select>
      </div>
    </div>
    <div class="sm:col-span-3">
      <div class="flex items-center">
        <label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Penyakit yang pernah diderita</label>
      </div>
      <div class="mt-4">
        <Input name="student_illness" class={classTextBox} style={styleFont} maxlength={100} />
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Tinggi Badan</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Input type="number" name="student_height" class={classTextBoxNumber} style={styleFont} oninput={(e) => allowOnlyDigits(e, 3)} pattern="[0-9]*" />
      </div>
    </div>
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Berat Badan</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Input type="number" name="student_weight" class={classTextBoxNumber} style={styleFont} oninput={(e) => allowOnlyDigits(e, 3)} pattern="[0-9]*" />
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex items-center">
        <label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Golongan darah</label>
      </div>
      <div class="mt-4">
        <Select placeholder="Pilih" bind:value={formData.student_blood_type} items={bloodType} class={classTextBox} name="student_blood_type" style={styleFont}></Select>
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex items-center">
        <label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Hoby</label>
      </div>
      <div class="mt-4">
        <Input name="student_hobby" class={classTextBox} style={styleFont} maxlength={100} />
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Ukuran Baju</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Select placeholder="Pilih" bind:value={formData.student_dress_size} items={dressSize} class={classTextBox} name="student_dress_size" style={styleFont}></Select>
      </div>
    </div>
    <div class="sm:col-span-3">
      <div class="flex items-center">
        <label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Saudara Kandung Yang Masih Aktif Menjadi Santri</label>
      </div>
      <div class="mt-4">
        <Input name="student_siblings_active" class={classTextBox} style={styleFont} maxlength={100} />
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex items-center">
        <label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Informasi Sekolah Didapatkan Dari</label>
      </div>
      <div class="mt-4">
        <Input name="student_info_from" class={classTextBox} style={styleFont} maxlength={100} />
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex items-center">
        <label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Informasi Pendaftaran Siswa Baru Dari</label>
      </div>
      <div class="mt-4">
        <Input name="student_inforeg_from" class={classTextBox} style={styleFont} />
      </div>
    </div>
  </div>
  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex items-center">
        <label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Telp</label>
      </div>
      <div class="mt-4">
        <Input type="number" name="student_phone" class={classTextBoxNumber} style={styleFont} oninput={(e) => allowOnlyDigits(e, 15)} pattern="[0-9]*" />
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex items-center">
        <label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">E-mail</label>
      </div>
      <div class="mt-4">
        <Input name="student_email" class={classTextBox} style={styleFont} readonly />
      </div>
    </div>
  </div>
</div>
