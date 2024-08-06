<script lang="ts">
	import { Title } from '$lib/title';
	import { convertAssociativeArrayToIndexedArrayBasedOnValue } from '$lib/util';
import type { PageData } from '../$types';

	export let data: PageData;

    async function edit(key: string, def: string) {
        const value = prompt("Enter new value for " + key, def);
        if (value === null) return;

        await fetch('/cutiezone/config', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ key, value }),
            credentials: "include"
        });
        window.location.href = `/cutiezone/config`;
    }

    // @ts-ignore
    const cfg: Array<{ key: string, value: string }> = convertAssociativeArrayToIndexedArrayBasedOnValue(data.config, "key", "value");
    
    Title.set('ProtoBlog - CZ - Config');

</script>

<h3 class="text-2xl">Config</h3>

{#each cfg as config}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="w-full mt-3 opacity-80 hover:opacity-100 cursor-pointer" on:click={() => edit(config.key, config.value)}>
        <span class="text-gray-200">{config.key}</span> <span class="text-gray-600">=></span> <span class="text-gray-400">{config.value}</span>
    </div>
{/each}
