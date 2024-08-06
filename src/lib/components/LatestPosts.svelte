<script lang="ts">
	import PostEntry from "./PostEntry.svelte";
	import type { PageData } from "../../routes/$types";
	import { getFirstX } from "$lib/util";

    export let data: PageData;
</script>

<div class="text-start">
    <h2 class="text-lg font-bold">[ Latest Posts ]</h2>
    <div class="ms-5 mt-3">
        {#each getFirstX(data.publishedPosts, parseInt(data.config.NUM_OF_LATEST_POSTS)) as post}
            <PostEntry post={post} data={data} />
        {/each}
    </div>
</div>
