<script lang="ts">
  import { Input, Select, Textarea } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  let { data, tanggal, bulan, tahun } = $props<{ data: any; tanggal: any; bulan: any; tahun: any }>();
  let formData: Record<string, string> = $state({});
  formData = data?.studentdata;
  let tanggalFatherLahir: string = $state('');
  let bulanFatherLahir: string = $state('');
  let tahunFatherLahir: string = $state('');

  let tanggalMotherLahir: string = $state('');
  let bulanMotherLahir: string = $state('');
  let tahunMotherLahir: string = $state('');

  let statusKematian = [
    { value: 'Masih Hidup', name: 'Masih Hidup' },
    { value: 'Sudah Meninggal Dunia', name: 'Sudah Meninggal Dunia' }
  ];

  let statusOrangTua = [
    { value: 'Kandung', name: 'Kandung' },
    { value: 'Tiri', name: 'Tiri' },
    { value: 'Angkat', name: 'Angkat' }
  ];

  let pendidikanOrangTua = [
    { value: 'Tidak Tamat SD/MI/Sederajat', name: 'Tidak Tamat SD/MI/Sederajat' },
    { value: 'SD/MI/Sederhana', name: 'SD/MI/Sederhana' },
    { value: 'SMP/MTs/Sederajat', name: 'SMP/MTs/Sederajat' },
    { value: 'SMA/MA/Sederajat', name: 'SMA/MA/Sederajat' },
    { value: 'Diploma', name: 'Diploma' },
    { value: 'Sarjana(S1)', name: 'Sarjana(S1)' },
    { value: 'Magister(S2)', name: 'Magister(S2)' },
    { value: 'Doctor(S3)', name: 'Doctor(S3)' }
  ];

  let penghasilanOrangTua = [
    { value: '<= Rp. 500.000', name: '<= Rp. 500.000' },
    { value: 'Rp. 500.000 - Rp 1.000.000', name: 'Rp. 500.000 - Rp 1.000.000' },
    { value: 'Rp. 1.000.001 - Rp 2.000.000', name: 'Rp. 1.000.001 - Rp 2.000.000' },
    { value: 'Rp. 2.000.001 - Rp 3.000.000', name: 'Rp. 2.000.001 - Rp 3.000.000' },
    { value: 'Rp. 3.000.001 - Rp 5.000.000', name: 'Rp. 3.000.001 - Rp 5.000.000' },
    { value: 'Rp. 5.000.001 - Rp 20.000.000', name: 'Rp. 5.000.001 - Rp 20.000.000' },
    { value: 'Tidak Berpenghasilan', name: 'Tidak Berpenghasilan' },
    { value: '> Rp 20.000.000', name: '> Rp 20.000.000' }
  ];

  let yangMenanggung = [
    { value: 'Ayah', name: 'Ayah' },
    { value: 'Ibu', name: 'Ibu' },
    { value: 'Lainnya', name: 'Lainnya' }
  ];

  let classTextBox = '"border outline-none';
  let classTextBoxNumber =
    "'block w-full px-3 py-2 bg-white border outline-none rounded-md text-[14px] shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  let styleFont = 'font-size:15px';

  onMount(async () => {
    tanggalFatherLahir = formData.student_father_dob_day;
    bulanFatherLahir = formData.student_father_dob_month;
    tahunFatherLahir = formData.student_father_dob_year;

    tanggalMotherLahir = formData.student_mother_dob_day;
    bulanMotherLahir = formData.student_mother_dob_month;
    tahunMotherLahir = formData.student_mother_year;
  });

  function handleSelect(e: any) {
    if (formData.student_bear_the_costs === 'Ayah') {
      formData.student_bear_the_costs_name = formData.student_father_name;
      formData.student_bear_the_costs_phone = formData.student_father_phonecallonly;
      formData.student_bear_the_costs_family = formData.student_bear_the_costs;
      formData.student_bear_the_accupation = formData.student_father_occupation;
      formData.student_bear_the_costs_address = formData.student_father_address;
    } else if (formData.student_bear_the_costs === 'Ibu') {
      formData.student_bear_the_costs_name = formData.student_mother_name;
      formData.student_bear_the_costs_phone = formData.student_mother_phonecallonly;
      formData.student_bear_the_costs_family = formData.student_bear_the_costs;
      formData.student_bear_the_accupation = formData.student_mother_occupation;
      formData.student_bear_the_costs_address = formData.student_mother_address;
    }
  }

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

<!--Orang Tua-->
<div class="w-full border border-orange-200 bg-orange-100 p-4 text-[14px] font-semibold text-gray-500">Orang Tua</div>
<div class="w-full border border-orange-200 bg-white p-4 text-[14px] text-gray-500">
  <!--Ayah-->
  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">No Kartu Keluarga</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Input type="number" name="student_nokk" bind:value={formData.student_nokk} class={classTextBoxNumber} style={styleFont} oninput={(e) => allowOnlyDigits(e, 16)} pattern="[0-9]*" />
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Nama Ayah</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Input name="student_father_name" class={classTextBox} style={styleFont} bind:value={formData.student_father_name} maxlength={1} />
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">NIK Ayah</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Input
          type="number"
          name="student_father_nik"
          class={classTextBoxNumber}
          style={styleFont}
          maxlength={16}
          bind:value={formData.student_father_nik}
          oninput={(e) => allowOnlyDigits(e, 16)}
          pattern="[0-9]*"
        />
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Status Ayah</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Select placeholder="Pilih" bind:value={formData.student_father_status} items={statusOrangTua} class={classTextBox} name="student_father_status" style={styleFont}></Select>
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Tanggal Lahir</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4 flex gap-4">
        <Select items={tanggal} bind:value={tanggalFatherLahir} placeholder="Tanggal" class={classTextBox} name="student_father_dob_day" style={styleFont}></Select>
        <Select items={bulan} bind:value={bulanFatherLahir} placeholder="Bulan" class={classTextBox} name="student_father_dob_month" style={styleFont}></Select>
        <Select items={tahun} bind:value={tahunFatherLahir} placeholder="Tahun" class={classTextBox} name="student_father_dob_year" style={styleFont}></Select>
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Tempat Lahir</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Input name="student_father_bop" bind:value={formData.student_father_bop} class={classTextBox} style={styleFont} maxlength={100} />
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex items-center">
        <label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Gelar Akademik</label>
      </div>
      <div class="mt-4">
        <Input name="student_father_academicdegree" bind:value={formData.student_father_academicdegree} class={classTextBox} style={styleFont} maxlength={50} />
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Status</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Select placeholder="Pilih" bind:value={formData.student_father_deadstatus} items={statusKematian} class={classTextBox} name="student_father_deadstatus" style={styleFont}></Select>
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Pendidikan Terakhir</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Select placeholder="Pilih" bind:value={formData.student_father_lastedu} items={pendidikanOrangTua} class={classTextBox} name="student_father_lastedu" style={styleFont}></Select>
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Pekerjaan Ayah</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Input name="student_father_occupation" class={classTextBox} style={styleFont} bind:value={formData.student_father_occupation} maxlength={100} />
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Penghasilan Perbulan</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Select placeholder="Pilih" bind:value={formData.student_father_monthlyincome} items={penghasilanOrangTua} class={classTextBox} name="student_father_monthlyincome" style={styleFont}></Select>
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Telp (Support WA)</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Input
          type="number"
          name="student_father_phonewa"
          class={classTextBoxNumber}
          style={styleFont}
          bind:value={formData.student_father_phonewa}
          oninput={(e) => allowOnlyDigits(e, 15)}
          pattern="[0-9]*"
        />
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Telp (Call Only)</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Input
          type="number"
          name="student_father_phonecallonly"
          class={classTextBoxNumber}
          style={styleFont}
          bind:value={formData.student_father_phonecallonly}
          oninput={(e) => allowOnlyDigits(e, 15)}
          pattern="[0-9]*"
        />
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Alamat Ayah</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Textarea name="student_father_address" style={styleFont} bind:value={formData.student_father_address} maxlength={225}></Textarea>
      </div>
    </div>
  </div>
  <br />
  <hr class="border" />
  <!--Ibu-->
  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Nama Ibu</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Input name="student_mother_name" class={classTextBox} style={styleFont} bind:value={formData.student_mother_name} maxlength={100} />
      </div>
    </div>
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">NIK Ibu</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Input type="number" name="student_mother_nik" class={classTextBoxNumber} style={styleFont} oninput={(e) => allowOnlyDigits(e, 16)} pattern="[0-9]*" />
      </div>
    </div>
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Status Ibu</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Select placeholder="Pilih" bind:value={formData.student_mother_status} items={statusOrangTua} class={classTextBox} name="student_mother_status" style={styleFont}></Select>
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Tanggal Lahir</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4 flex gap-4">
        <Select items={tanggal} bind:value={tanggalMotherLahir} placeholder="Tanggal" class={classTextBox} name="student_mother_dob_day" style={styleFont}></Select>
        <Select items={bulan} bind:value={bulanMotherLahir} placeholder="Bulan" class={classTextBox} name="student_mother_dob_month" style={styleFont}></Select>
        <Select items={tahun} bind:value={tahunMotherLahir} placeholder="Tahun" class={classTextBox} name="student_mother_dob_year" style={styleFont}></Select>
      </div>
    </div>

    <div class="sm:col-span-3">
      <label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Tempat Lahir</label>
      <div class="mt-4">
        <Input name="student_mother_bop" bind:value={formData.student_mother_bop} class={classTextBox} style={styleFont} maxlength={100} />
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex items-center">
        <label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Gelar Akademik</label>
      </div>
      <div class="mt-4">
        <Input name="student_mother_academicdegree" bind:value={formData.student_mother_academicdegree} class={classTextBox} style={styleFont} maxlength={50} />
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Status</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Select placeholder="Pilih" bind:value={formData.student_mother_deadstatus} items={statusKematian} class={classTextBox} name="student_mother_deadstatus" style={styleFont}></Select>
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Pendidikan Terakhir</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Select placeholder="Pilih" bind:value={formData.student_mother_lastedu} items={pendidikanOrangTua} class={classTextBox} name="student_mother_lastedu" style={styleFont}></Select>
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Pekerjaan Ibu</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Input name="student_mother_occupation" class={classTextBox} style={styleFont} bind:value={formData.student_mother_occupation} maxlength={100} />
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Penghasilan Perbulan</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Select placeholder="Pilih" bind:value={formData.student_mother_monthlyincome} items={penghasilanOrangTua} class={classTextBox} name="student_mother_monthlyincome" style={styleFont}></Select>
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Telp (Support WA)</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Input
          type="number"
          name="student_mother_phonewa"
          class={classTextBoxNumber}
          style={styleFont}
          bind:value={formData.student_mother_phonewa}
          oninput={(e) => allowOnlyDigits(e, 15)}
          pattern="[0-9]*"
        />
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Telp (Call Only)</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>

      <div class="mt-4">
        <Input
          type="number"
          name="student_mother_phonecallonly"
          class={classTextBoxNumber}
          style={styleFont}
          bind:value={formData.student_mother_phonecallonly}
          oninput={(e) => allowOnlyDigits(e, 15)}
          pattern="[0-9]*"
        />
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Alamat</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Textarea name="student_mother_address" style={styleFont} bind:value={formData.student_mother_address} maxlength={225}></Textarea>
      </div>
    </div>
  </div>
  <br />
  <hr class="border" />
  <!--Menanggung Biaya-->
  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex">
        <label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Yang Menanggung Biaya</label> <span class="ml-2 text-xl font-medium text-red-600">*</span>
      </div>
      <div class="mt-4">
        <Select
          placeholder="Pilih"
          bind:value={formData.student_bear_the_costs}
          items={yangMenanggung}
          class={classTextBox}
          name="student_bear_the_costs"
          style={styleFont}
          onchange={(e) => handleSelect(e)}
        ></Select>
      </div>
    </div>
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Nama</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Input name="student_bear_the_costs_name" class={classTextBox} style={styleFont} bind:value={formData.student_bear_the_costs_name} maxlength={100} />
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Hubungan Keluarga</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Input name="student_bear_the_costs_family" class={classTextBox} style={styleFont} bind:value={formData.student_bear_the_costs_family} maxlength={100} />
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Telp</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Input name="student_bear_the_costs_phone" class={classTextBox} style={styleFont} bind:value={formData.student_bear_the_costs_phone} />
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Pekerjaan</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Input name="student_bear_the_accupation" class={classTextBox} style={styleFont} bind:value={formData.student_bear_the_accupation} maxlength={100} />
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Alamat Lengkap</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Textarea name="student_bear_the_costs_address" style={styleFont} bind:value={formData.student_bear_the_costs_address} maxlength={225}></Textarea>
      </div>
    </div>
  </div>
</div>
