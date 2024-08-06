<script lang="ts">
	import Showdown from 'showdown';
	import type { PageData } from '../$types';
	import { Title } from '$lib/title';
	import Link from '$lib/components/Link.svelte';

	export let data: PageData;
	const converter = new Showdown.Converter();
	converter.setFlavor('github');

	let editing: number = 0;

	async function editCaption(old: string) {
		const n = prompt('What should be the new caption?', old);
		if (!n) return;

		await fetch('art', {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: editing, caption: n })
		});

		window.location.reload();
	}

	async function editArtist(old: string) {
		const n = prompt('What should be the new artist?', old);
		if (!n) return;

		await fetch('art', {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: editing, artist: n })
		});

		window.location.reload();
	}

	async function editVisible(id: number, n: boolean) {
		await fetch('art', {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, visible: n })
		});

		window.location.reload();
	}

	async function deleteArt(id: number, capt: string) {
		const _ = confirm(`Are you sure you want to delete '${capt}'?`);
		if (!_) return;

		await fetch('art', {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id })
		});

		window.location.reload();
	}

	Title.set('ProtoBlog - CZ - Art');
</script>

<h3 class="text-2xl">Art <Link text="Add" url="art/new" classes="text-sm" /></h3>

<div class="mt-5 flex flex-wrap justify-evenly gap-5">
	{#each data.art as art}
		<div class="art-entry w-max max-w-96 text-center">
			<div class="flex w-full justify-center">
				<img
					src="{art.image}"
					alt={art.caption}
					srcset=""
					class="max-h-80 max-w-96 text-center"
				/>
			</div>
			<div class="mt-2 text-wrap break-words text-gray-200">
				{@html converter.makeHtml(
					`${art.caption} <span class="text-gray-500">by</span> ${art.artist} ${art.visible ? '' : "<span class='text-gray-500 text-xs'>[HIDDEN]</span>"}`
				)}
			</div>
			<div class="art-controls mt-1 w-full text-sm text-gray-500">
				{#if !editing}
					<button class="hover:underline" on:click={() => (editing = art.id)}>Edit</button> •
					<button class="hover:underline" on:click={() => deleteArt(art.id, art.caption)}
						>Delete</button
					>
					•
					{#if art.visible}
						<button class="hover:underline" on:click={() => editVisible(art.id, false)}>Hide</button>
					{:else}
						<button class="hover:underline" on:click={() => editVisible(art.id, true)}>Show</button>
					{/if}
				{:else}
					<button
						class="hover:underline"
						on:click={() => {
							editing = 0;
						}}>Stop editing</button
					>
				{/if}
			</div>
			<div class="art-controls-edit mt-1 w-full text-sm text-gray-500" editing={editing === art.id}>
				<button class="hover:underline" on:click={() => editCaption(art.caption)}>Caption</button> •
				<button class="hover:underline" on:click={() => editArtist(art.artist)}>Artist</button>
			</div>
		</div>
	{/each}
</div>
