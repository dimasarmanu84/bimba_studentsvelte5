<script lang="ts">
    import { afterNavigate } from "$app/navigation";
    import { BookmarkSolid, ListOutline, PenOutline } from "flowbite-svelte-icons";
    export let drawerHidden: boolean = false;

    const closeDrawer = () => {
		drawerHidden = true;
	};

    afterNavigate((navigation) => {
		// this fixes https://github.com/themesberg/flowbite-svelte/issues/364
		document.getElementById('svelte')?.scrollTo({ top: 0 });
		drawerHidden= false;
	});

</script>
<div class="{drawerHidden ? 'hidden' : ''} fixed h-10 w-full flex items-center bg-blue-950 max-[600px]:overflow-x-scroll max-[600px]:overflow-y-hidden max-[600px]:min-h-[60px] z-50">
    <div class="p-2 pt-3 pr-3 h-full text-white text-xs flex-none hover:bg-blue-800">
        <button class="flex"><ListOutline size="xl" color="white" class="font-semibold w-3 h-3 me-2"/>Tagihan</button>
    </div>
    <div class="p-2 pt-3 pr-3 h-full text-white text-xs flex-none hover:bg-blue-800">
        <button class="flex"><BookmarkSolid size="xl" color="white" class="font-semibold w-3 h-3 me-2"/>Histori Pembayaran</button>
    </div>
    <div class="p-2 pt-3 pr-3 h-full text-white text-xs flex-none hover:bg-blue-800">
        <button class="flex"><PenOutline size="xl" color="white" class="font-semibold w-3 h-3 me-2"/>Ujian Online</button>
    </div>
</div>

<div
	hidden={drawerHidden}
	on:keydown={closeDrawer}
	role="presentation"
/>