<script lang="ts">
	import Showdown from "showdown";
	import type { PageData } from "./$types";
	import RelativeTime from "@yaireo/relative-time";
	import { Title } from "$lib/title";

    export let data: PageData;

    const converter = new Showdown.Converter();
    converter.setFlavor("github");

    const since = new RelativeTime().from(data.post.createdAt);

    Title.set(`${data.post.title} - ProtoBlog`);

</script>

<style>
    hr {
        width: 12rem;
        border-top: 1px solid #4b5563;
        margin-top: 1rem;
        margin-bottom: 1rem;
        margin-left: auto;
        margin-right: auto;
    }
</style>

<div class="mx-auto break-words">
    <div class="text-start">
        <h1 class="text-4xl">{data.post.title}</h1>
        <p class="text-base text-gray-500">[ {since} by {data.author!.username} ]</p>
    </div>
    <hr class="!w-full">
    <div class="prose !max-w-none text-gray-300 prose-headings:text-gray-300 text-start prose-a:text-gray-200 prose-a:underline prose-strong:text-gray-200 prose-em:italic">
        {@html converter.makeHtml(data.post.content!)}
    </div>
</div>
