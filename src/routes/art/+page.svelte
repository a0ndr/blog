<script lang="ts">
	import Showdown from 'showdown';
	import type { PageData } from '../$types';
	import { Title } from '$lib/title';

	export let data: PageData;
	const converter = new Showdown.Converter();
	converter.setFlavor('github');

    Title.set('ProtoBlog - Art');
</script>

<h3 class="text-2xl">Art</h3>

<div class="mt-5 flex flex-wrap justify-evenly gap-5">
	{#each data.art as art}
		{#if art.visible}
			<div class="w-max max-w-96 text-center">
				<a class="flex w-full justify-center" target="_blank" href="{art.image}">
					<img
						src="{art.image}"
						alt={art.caption}
						srcset=""
						class="max-h-80 max-w-96 text-center"
					/>
				</a>
				<div class="mt-2 text-wrap break-words text-gray-200">
					{@html converter.makeHtml(
						`${art.caption} <span class="text-gray-500">by</span> ${art.artist}`
					)}
				</div>
			</div>
		{/if}
	{/each}
</div>
