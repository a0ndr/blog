<script lang="ts">
	import type { Post } from '@prisma/client';
	import { Marked } from '@ts-stack/markdown';
	import type { PageServerData } from './$types';

	// code blocks
	import hljs from 'highlight.js/lib/core';
	import hljs_go from 'highlight.js/lib/languages/go';
	import { onMount } from 'svelte';
	import { copy } from 'svelte-copy';
	import Link from '$lib/components/Link.svelte';
	hljs.registerLanguage('go', hljs_go);
	// Marked.setOptions({ highlight: (code, lang) => hljs.highlight(code!, {language: lang!}).value });

	// svelte-ignore non_reactive_update
	let post;
	// svelte-ignore non_reactive_update
	let content: string | null = null;

	let { data }: { data: PageServerData } = $props();
	post = data.post;
	if (post) {
		content = Marked.parse(post.Content);
	}

	onMount(() => {
		hljs.highlightAll();
	});

	let copyButtonText = $state('Copy Link');
</script>

{#if post}
	<div>
		<img src={post.Image} alt={post.Title} class="w-full" />
		<div class="text-wrap break-words">
			<h1 class="subheader-font pt-4 text-4xl text-white">{post.Title}</h1>
			<p class="mt-8 flex flex-col gap-3 text-xl text-gray-300">
				{@html content}
			</p>
			<div class="mt-8 text-base leading-relaxed">
				<p><b class="text-gray-300">Posted at:</b> {post.CreatedAt.toUTCString()}</p>
				<p>
					<b class="text-gray-300">Category:</b>
                    <Link Label={post.Category?.Name} Href={`/categories/${post.Category?.Name}`} />
				</p>
				<p>
					<b class="text-gray-300">Tags:</b>
					[
					{#each post.Tags as tag}
						<Link
							Label={tag.Name}
							Href={`/tags/${tag.Name}`}
						/>{#if post.Tags.indexOf(tag) + 1 < post.Tags.length},&nbsp;
						{/if}
					{/each}
					]
				</p>
				<p class="text-underline mt-3">
					<button
						class="link"
						use:copy={{
							text: document.baseURI,
							onCopy: () => {
								copyButtonText = 'Link Copied!';
								setTimeout(() => {
									copyButtonText = 'Copy Link';
								}, 2000);
							}
						}}>{copyButtonText}</button
					>
				</p>
			</div>
		</div>
	</div>
{:else}
	post not found
{/if}
