<script lang="ts">
	import { convertAssociativeArrayToIndexedArrayBasedOnValue } from "$lib/util";
	import type { Text } from "@prisma/client";
	import type { PageData } from "../$types";
	import { Title } from "$lib/title";

    export let data: PageData;
    Title.set('ProtoBlog - CZ - Texts');

    // @ts-ignore
    const texts: Array<Text> = convertAssociativeArrayToIndexedArrayBasedOnValue(data.texts, "id", "content");
</script>

<h3 class="text-2xl">Texts</h3>
{#each texts as text}
    <a href="texts/{text.id}" class="line-clamp-1 mt-3">
        <span class="text-gray-200">{text.id}</span> <span class="text-gray-400">{text.content}</span>
    </a>
{/each}
