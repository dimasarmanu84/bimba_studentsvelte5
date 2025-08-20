<script lang="ts">
	export let items = ["Pengaturan", "Menu"]
	export let headertext = "Manajemen Menu"
</script>
<div class="mt-2 flex flex-wrap p-2 pl-4 justify-left bg-gray-100 border-gray-100 border-e">
	<h1 class="text-xm font-bold text-gray-900 dark:text-white me-1">{headertext}</h1>&nbsp;&nbsp;&nbsp;&nbsp;
	<nav aria-label="Breadcrumb" class="flex flex-wrap md:space-x-3">
		<ol class="inline-flex items-center space-x-1 rtl:space-x-reverse">
			<li class="inline-flex items-center">
				<!-- svelte-ignore a11y-missing-attribute -->
				<a style="font-size: 12px;" class="inline-flex items-center font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"><svg class="w-4 h-4 me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg> Home</a>
			</li>
			
			{#each items as row, i}
			<li class="inline-flex items-center"><svg class="w-6 h-6 text-gray-400 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg> 
				<!-- svelte-ignore a11y-missing-attribute -->
				<a style="font-size: 12px;" class="ms-1 font-medium text-gray-700 hover:text-gray-900 md:ms-2 dark:text-gray-400 dark:hover:text-white">{row}</a>
			</li>
			
			{/each}
		</ol>
	</nav>
</div>
<hr>

<hr>