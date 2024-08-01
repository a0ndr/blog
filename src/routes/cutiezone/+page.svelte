<script lang="ts">
	import PostEntry from '$lib/components/PostEntry.svelte';
	import type { PageData } from '../$types';

	export let data: PageData;
</script>

<h1 class="text-xl">Welcome to the cutie zone, {data.user.username}!</h1>

<div class="w-100 text-start mt-5">
	{#each data.latestPosts as post}
		<PostEntry {post} {data}  mode="admin" />
	{/each}
</div>
