<script lang="ts">
	import Showdown from "showdown";
	import type { PageData } from "../$types";

    export let data: PageData;

    const converter = new Showdown.Converter()
    converter.setFlavor("github");

    const alignment = data.config.find((x: {key: string, value: string}) => x.key === "ABOUT_TEXT_ALIGNMENT").value;
</script>

<div class="prose !max-w-none text-{alignment} text-gray-300 prose-headings:text-gray-300 prose-a:text-gray-200 prose-a:underline">
    {@html converter.makeHtml(data.texts.find((x: {id: string, content: string}) => x.id === "ABOUT_US").content)}
</div>

<hr class="w-48 border-t-2 border-slate-700 mx-auto my-5">

<p class="text-slate-500 mb-5">Made with ♥︎ by Fuzzy! ∙ Source code on <a href="https://github.com/a0ndr/blog" class="underline" target="_blank">GitHub</a> ∙ Licensed under GNU GPLv3</p>
