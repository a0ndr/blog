<script lang="ts">
	import type { PageData } from "../$types";

    export let data: PageData;
</script>

<h3 class="text-2xl">Texts</h3>
{#each data.texts as text}
    <a href="texts/{text.id}" class="line-clamp-1 mt-3">
        <span class="text-gray-200">{text.id}</span> <span class="text-gray-400">{text.content}</span>
    </a>
{/each}
