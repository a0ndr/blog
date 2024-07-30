<script lang="ts">
	import { onMount } from "svelte";
    import type { PageData } from "./$types";
	import { Title } from "$lib/title";
	import LatestPosts from "$lib/components/LatestPosts.svelte";
    import showdown from "showdown";

    export let data: PageData;
	const intro = data.texts.find((x: {id: string, content: string}) => x.id === "HOME_INTRO").content;

    onMount(() => {
        Title.set("ProtoBlog - Home");
    });

    const conv = new showdown.Converter();
</script>

{@html conv.makeHtml(intro)}

<!-- <PostEntry post={data.posts.find((x: Post) => x.id === 1)} /> -->
<LatestPosts data={data} />
