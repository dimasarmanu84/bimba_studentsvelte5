<script lang="ts">
  import { PUBLIC_API_URL } from '$env/static/public';
  import { SetHeaderApi } from '$lib/Helper';
  import { Input, Select, Textarea } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  let { data } = $props<{ data: any }>();

  let classTextBox = '"border outline-none';
  let styleFont = 'font-size:15px';
  let formData: Record<string, string> = $state({});
  formData = data?.studentdata;
  let countryName: string = $state('Indonesia');
  let provinceName = $state('None');
  let cityName = $state('None');
  let districtName = $state('None');
  let subdistrictName = $state('None');

  let countries: any = $state();
  let provinces: any = $state();
  let cities: any = $state();
  let districts: any = $state();
  let subdistricts: any = $state();
  let regloc: any = $state();

  async function GetCountries() {
    const result = await fetch(`${PUBLIC_API_URL}api/sso/location/countries`, {
      method: 'GET',
      headers: SetHeaderApi()
    });
    let jsonData = await result.json();
    return jsonData.data;
  }

  async function GetProvince() {
    const result = await fetch(`${PUBLIC_API_URL}api/sso/location/province`, {
      method: 'GET',
      headers: SetHeaderApi()
    });
    let jsonData = await result.json();
    return jsonData.data;
  }

  async function GetCity() {
    const result = await fetch(`${PUBLIC_API_URL}api/sso/location/city/` + provinceName, {
      method: 'GET',
      headers: SetHeaderApi()
    });
    let jsonData = await result.json();
    return jsonData.data;
  }

  async function GetDistrict() {
    const result = await fetch(`${PUBLIC_API_URL}api/sso/location/district/` + cityName, {
      method: 'GET',
      headers: SetHeaderApi()
    });
    let jsonData = await result.json();
    return jsonData.data;
  }

  async function GetSubDistrict() {
    const result = await fetch(`${PUBLIC_API_URL}api/sso/location/subdistrict/` + districtName, {
      method: 'GET',
      headers: SetHeaderApi()
    });
    let jsonData = await result.json();
    return jsonData.data;
  }

  async function GetRegLoc() {
    const result = await fetch(`${PUBLIC_API_URL}api/master/registrationlocation/getlocation`, {
      method: 'GET',
      headers: SetHeaderApi()
    });
    let jsonData = await result.json();
    return jsonData.data;
  }

  async function onChangeProvince(e: Event): Promise<void> {
    let o = e.target as HTMLInputElement;
    provinceName = o.value;
    cities = [];
    districts = [];
    subdistricts = [];
    cities = await GetCity();
  }

  async function onChangeCity(e: Event): Promise<void> {
    let o = e.target as HTMLInputElement;
    cityName = o.value;
    districts = [];
    subdistricts = [];
    districts = await GetDistrict();
  }

  async function onChangeDistrict(e: Event): Promise<void> {
    let o = e.target as HTMLInputElement;
    districtName = o.value;
    subdistricts = [];
    subdistricts = await GetSubDistrict();
  }

  onMount(async () => {
    if (formData.student_nationality != '') {
      countryName = formData.student_nationality;
    }

    if (formData.student_province != '') {
      provinceName = formData.student_province;
      cities = await GetCity();
    }
    if (formData.student_city != '') {
      cityName = formData.student_city;
      districts = await GetDistrict();
    }
    if (formData.student_district != '') {
      districtName = formData.student_district;
      subdistricts = await GetSubDistrict();
    }
    if (formData.student_subdistrict != '') {
      subdistrictName = formData.student_subdistrict;
    }

    countries = await GetCountries();
    provinces = await GetProvince();
    regloc = await GetRegLoc();
  });

  let classTextBoxNumber =
    "'block w-full px-3 py-2 bg-white border outline-none rounded-md text-[14px] shadow-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

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

<!--Domisili-->
<div class="w-full border border-orange-200 bg-orange-100 p-4 text-[14px] font-semibold text-gray-500">Alamat Sesuai Domisili</div>
<div class="w-full border border-orange-200 bg-white p-4 text-[14px] text-gray-500">
  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex items-center">
        <label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Kewarganegaraan </label>
      </div>
      <div class="mt-4">
        <Select placeholder="Pilih" items={countries} bind:value={countryName} class={classTextBox} name="student_nationality" style={styleFont}></Select>
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Alamat</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Textarea name="student_address" style={styleFont} maxlength={225} bind:value={formData.student_address}></Textarea>
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">RT</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Input type="number" name="student_rt" class={classTextBoxNumber} style={styleFont} oninput={(e) => allowOnlyDigits(e, 4)} pattern="[0-9]*" />
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">RW</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Input type="number" name="student_rw" class={classTextBoxNumber} style={styleFont} oninput={(e) => allowOnlyDigits(e, 4)} pattern="[0-9]*" />
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Provinsi</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Select placeholder="Pilih" items={provinces} onchange={onChangeProvince} bind:value={provinceName} class={classTextBox} name="student_province" style={styleFont}></Select>
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Kota/Kab</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Select items={cities} onchange={onChangeCity} bind:value={cityName} placeholder="Pilih" class={classTextBox} name="student_city" style={styleFont}></Select>
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Kecamatan</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Select placeholder="Pilih" items={districts} bind:value={districtName} onchange={onChangeDistrict} class={classTextBox} name="student_district" style={styleFont}></Select>
      </div>
    </div>
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Desa/Kelurahan</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Select placeholder="Pilih" items={subdistricts} bind:value={subdistrictName} class={classTextBox} name="student_subdistrict" style={styleFont}></Select>
      </div>
    </div>
  </div>

  <!-- <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block font-medium leading-6 text-gray-900 text-[14px] flex">Lokasi Ujian</label> <span class="ml-2 font-medium text-red-600 text-xl">*</span></div>
      <div class="mt-4">
        <Select placeholder="Pilih" items={regloc} bind:value={formData.registrationlocation_id} class={classTextBox} name="registrationlocation_id" style={styleFont}></Select>
      </div>
    </div>
  </div> -->
</div>
