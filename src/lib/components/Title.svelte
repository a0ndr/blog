<script lang="ts">
	import { Theme } from '$lib';

	const blocks = Array.from({ length: 15 }, (_, i) => ({
		width: `${10 / Math.pow(1.3, i)}%`
		// opacity: 1 - (i * 0.1)
	}));

	let { Navbar, Admin } = $props();
</script>

<div class="flex w-full flex-row items-center gap-1 md:gap-2 xl:gap-3">
	<h1 class="header-font text-6xl text-white">Adam</h1>
	{#each blocks as block}
		{#if Admin}
			<div class="h-12 bg-red-400" style="width: {block.width}"></div>
		{:else}
			<div class="h-12 bg-cyan-300" style="width: {block.width}"></div>
		{/if}
	{/each}
</div>
<p class="subheader-font text-2xl text-gray-200">
    {#if Admin}
        With power comes responsibility
    {:else}
        To fill
    {/if}
</p>
<div class="body-font mt-3 text-gray-200">
	{@render Navbar()}
</div>
{#if Admin}
    <hr class="my-3 border-t border-red-400" />
{:else}
    <hr class="my-3 border-t border-cyan-300" />
{/if}
