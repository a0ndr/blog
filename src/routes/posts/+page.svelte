<script lang="ts">
	import type { Post } from '@prisma/client';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

{#snippet PostEntry(post: Post)}
	<a class="post-entry no-default flex w-full gap-3 grid grid-cols-12 items-center h-min" href="/posts/{post.Slug}">
		<img class="col-span-4 object-scale-down rounded" src={post.Image} alt={post.Title} />
		<div class="col-span-8">
			<h2 class="subheader-font post-entry-title text-3xl">{post.Title}</h2>
            <span class="text-gray-500 text-base body-font">
                {post.CreatedAt.toLocaleString()}
            </span>
			<p class="word-wrap break-words line-clamp-2">{post.Content}</p>
		</div>
	</a>
{/snippet}

{#each data.posts as post}
	{@render PostEntry(post)}
{/each}
