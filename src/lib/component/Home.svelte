<script lang="ts">
  import { PUBLIC_IMAGE_URL } from '$env/static/public'
  import { Avatar } from 'flowbite-svelte'

  interface Props {
    pageData: any
    formData?: Record<string, string>
  }

  let { pageData, formData = {} }: Props = $props()
</script>

<section class="py-0 h-full min-h-screen">

  <div class="col-span-full space-y-4 xl:col-auto flex justify-center items-center">
    <div class="w-full bg-white border rounded-lg max-w-none border-gray-200 dark:bg-gray-800 dark:border-gray-700 flex-col md:flex-row block p-4 shadow-sm sm:flex sm:space-x-4 sm:p-6 sm:py-6 xl:block xl:space-x-0 2xl:flex 2xl:space-x-4 text-center">
      {#if formData.student_photo}
        <Avatar src={`${PUBLIC_IMAGE_URL}${formData.student_photo}`} />
      {:else}
        <Avatar src="/images/noimg.png" class="relative mx-auto flex items-center justify-center bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 mb-4 rounded-lg sm:mb-0 xl:mb-4 2xl:mb-0 w-[250px] h-[250px]"  />
      {/if}
      <div class="py-0.5">
        <h3 class="font-bold text-gray-900 dark:text-white text-xl">{formData?.student_name}</h3>
        <p class="mt-1 mb-4 pt-px text-sm dark:text-gray-300">{formData?.student_nisl}</p>
      </div>
    </div>
  </div>
</section>