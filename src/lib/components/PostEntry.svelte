<script lang="ts">
	import type { Post, User } from "@prisma/client";
	import RelativeTime from "@yaireo/relative-time";
	import type { PageData } from "../../routes/$types";

    export let post: Post;
    export let data: PageData;

    const since = new RelativeTime().from(post.createdAt);
</script>

<div class="mb-5 opacity-85 hover:opacity-100 cursor-pointer">
    <a href="/p/{post.id}">
        <h3 class="text-lg">{post.title}</h3>
        <p class="text-sm text-gray-500">[ {since} by {data.users.find((x: User) => x.id === post.authorId).username} ]</p>
        <p class="line-clamp-2 text-base text-gray-400">{post.content}</p>
    </a>
</div>
