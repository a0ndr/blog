<script lang="ts">
	import type { Post, User } from '@prisma/client';
	import RelativeTime from '@yaireo/relative-time';
	import type { PageData } from '../../routes/$types';

	export let post: Post;
	export let data: PageData;
	export let mode: 'public' | 'admin' = 'public';

	const since = new RelativeTime().from(post.createdAt);
</script>

<div class="mb-5 cursor-pointer opacity-85 hover:opacity-100">
	<a href="{mode === 'public' ? '/p' : '/cutiezone/edit'}/{post.id}">
		<h3 class="text-lg">{post.title}</h3>
		<p class="text-sm text-gray-500">
			[ {since} by {data.users.find((x: User) => x.id === post.authorId) ? data.users.find((x: User) => x.id === post.authorId).username : "Deleted User"} ]
			{#if mode === 'admin'}
				<span class={post.published ? 'text-green-600' : 'text-yellow-600'}
					>{post.published ? 'LIVE' : 'DRAFT'}</span
				>
				{#if post.published}
					<span> - {post.views} views</span>
				{/if}
			{/if}
		</p>
		<p class="line-clamp-2 text-base text-gray-400">{post.content}</p>
	</a>
</div>
