<script lang="ts">
	import PostEntry from "./PostEntry.svelte";
	import type { PageData } from "../../routes/$types";

    export let data: PageData;

    let posts = [];
    for(let i = 0; i < 3; i++) {
        posts.push(data.latestPosts[i]);
    }

</script>

<div class="text-start">
    <h2 class="text-lg font-bold">[ Latest Posts ]</h2>
    <div class="ms-5 mt-3">
        {#each posts as post}
            <PostEntry post={post} data={data} />
        {/each}
    </div>
</div>
