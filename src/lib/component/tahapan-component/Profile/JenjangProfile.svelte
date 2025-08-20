<script lang="ts">
  import { PUBLIC_API_URL } from '$env/static/public';
  import { SetHeaderApi } from '$lib/Helper';
  import { Input, Select } from 'flowbite-svelte';
  import { onMount } from 'svelte';
  let { data } = $props<{ data: any }>();

  let asalSekolahItems = [
    { value: 'RA', name: 'RA' },
    { value: 'MA', name: 'MA' },
    { value: 'TK', name: 'TK' },
    { value: 'MI', name: 'MI' },
    { value: 'SD', name: 'SD' },
    { value: 'MTs', name: 'MTs' },
    { value: 'SMP', name: 'SMP' },
    { value: 'SMA', name: 'SMA' },
    { value: 'SMK', name: 'SMK' }
  ];
  let formData: Record<string, string> = $state({});
  let classTextBox = '"border outline-none';
  let styleFont = 'font-size:15px';
  let groupLevel: never[] = $state([]);
  let levelgroup_id: string;
  let level: never[] = $state([]);
  let level_id: string = $state('');
  let asalsekolah: string = $state('');

  formData = data?.studentdata;

  async function GetGroupLevel() {
    const result = await fetch(`${PUBLIC_API_URL}api/master/levelgroup/getselection`, {
      method: 'GET',
      headers: SetHeaderApi()
    });
    let jsonData = await result.json();
    return jsonData.data;
  }

  async function GetLevel() {
    const result = await fetch(`${PUBLIC_API_URL}api/master/levels/getlevelbygroup/` + levelgroup_id, {
      method: 'GET',
      headers: SetHeaderApi()
    });
    let jsonData = await result.json();
    if (jsonData.error) {
      return null;
    }
    return jsonData.data;
  }

  async function onChangeLembaga(e: Event): Promise<void> {
    let o = e.target as HTMLInputElement;
    levelgroup_id = o.value.toString();

    level = [];
    let tempLevel = await GetLevel();
    if (tempLevel) {
      level = tempLevel;
    }
  }

  onMount(async () => {
    levelgroup_id = formData.levelgroup_id;
    level_id = formData.level_id;
    asalsekolah = formData.student_origin_school;
    groupLevel = await GetGroupLevel();

    if (levelgroup_id) {
      level = await GetLevel();
    }
  });
</script>

<!--Jenjang-->
<div class="w-full border border-orange-200 bg-orange-100 p-4 text-[14px] font-semibold text-gray-500">Jenjang</div>
<div class="w-full border border-orange-200 bg-white p-4 text-[14px] text-gray-500">
  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <div class="flex"><label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Lembaga Yang Dituju</label> <span class="ml-2 text-xl font-medium text-red-600">*</span></div>
      <div class="mt-4">
        <Select items={groupLevel} onchange={onChangeLembaga} bind:value={formData.levelgroup_id} placeholder="Pilih" class={classTextBox} name="levelgroup_id" style={styleFont}></Select>
      </div>
    </div>

    <div class="sm:col-span-3">
      <div class="flex">
        <label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Tingkatan Yang Dituju</label> <span class="ml-2 text-xl font-medium text-red-600">*</span>
      </div>
      <div class="mt-4">
        <Select items={level} bind:value={level_id} placeholder="Pilih" class={classTextBox} name="level_id" style={styleFont}></Select>
      </div>
    </div>
  </div>

  <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-6">
    <div class="sm:col-span-3">
      <label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Asal sekolah</label>
      <div class="mt-4">
        <Select placeholder="Pilih" bind:value={asalsekolah} items={asalSekolahItems} class={classTextBox} name="student_origin_school" style={styleFont}></Select>
      </div>
    </div>

    <div class="sm:col-span-3">
      <label for="" class="block flex text-[14px] leading-6 font-medium text-gray-900">Nama Sekolah Asal</label>
      <div class="mt-4">
        <Input name="student_origin_school_name" class={classTextBox} style={styleFont} maxlength={100} bind:value={formData.student_origin_school_name} />
      </div>
    </div>
  </div>
</div>
