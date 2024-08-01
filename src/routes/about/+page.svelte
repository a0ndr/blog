<script lang="ts">
	import Showdown from "showdown";
	import type { PageData } from "../$types";

    export let data: PageData;

    const converter = new Showdown.Converter()
    converter.setFlavor("github");

    const alignment = data.config.find((x: {key: string, value: string}) => x.key === "ABOUT_TEXT_ALIGNMENT").value;
</script>

<div class="prose !max-w-none text-{alignment} text-gray-300 prose-headings:text-gray-300 prose-a:text-gray-400 prose-a:underline">
    {@html converter.makeHtml(data.texts.find((x: {id: string, content: string}) => x.id === "ABOUT_US").content)}
</div>
