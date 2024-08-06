<script lang="ts">
	import Showdown from 'showdown';
	import type { PageData } from '../$types';
	import Button from '$lib/components/Button.svelte';
	import { enhance } from '$app/forms';
	import { Title } from '$lib/title';

    Title.set('ProtoBlog - CZ - Adding art');
</script>

<h3 class="text-2xl">Add Art</h3>

<form use:enhance method="post" enctype="multipart/form-data" class="mt-5">
	<div class="align-center flex">
		<label for="caption" class="h-full self-center">Caption</label>
		<input
			id="caption"
			type="text"
			name="caption"
			required
			placeholder="Ghost refsheet"
			class="form-input m-3 w-full rounded border-0 border-b bg-slate-800 p-1 text-gray-300 focus:border-white focus:ring-0"
		/>
	</div>
	<div class="align-center flex">
		<label for="artist" class="h-full self-center">Artist</label>
		<input
			id="artist"
			type="text"
			name="artist"
			required
			placeholder="SprayKitten"
			class="form-input m-3 ms-5 w-full rounded border-0 border-b bg-slate-800 p-1 text-gray-300 focus:border-white focus:ring-0"
		/>
	</div>
	<div class="align-center flex gap-5">
		<label for="image" class="h-full self-center">Image</label>
		<input
			accept="image/png,image/jpeg,image/gif,video/mp4,video/mpeg,video/webm,image/webp"
			id="image"
			name="image"
			required
			type="file"
			class="m-3 p-1 text-gray-300"
		/>
	</div>
	<Button text="Upload" callback={() => {}} type="submit" />
</form>
