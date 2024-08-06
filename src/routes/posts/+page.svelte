<script lang="ts">
	import PostEntry from '$lib/components/PostEntry.svelte';
	import { Title } from '$lib/title';
	import type { PageData } from '../$types';

	export let data: PageData;

    Title.set('ProtoBlog - Posts');
</script>

<p class="text-2xl">Posts</p>
<div class="mt-5 w-full text-start">
	{#each data.publishedPosts as post}
		<PostEntry {post} {data} />
	{/each}
</div>
