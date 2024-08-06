<script lang="ts">
	import type { PageData } from "../$types";

    export let data: PageData;
</script>

<p class="text-3xl">Violations</p>

<div class="flex gap-8 flex-wrap">
    {#each data.violations as vio}
        <div class="h-max w-max cursor-default text-start">
            <p class="text-xl">
				{vio.ip}
			</p>
			<p class="text-lg text-gray-300">{vio.count} violations</p>
			<p class="text-base text-gray-400">
				Type: {vio.type}<br />
				Expires: {vio.expires.toLocaleString('en-us')}
			</p>
        </div>
    {/each}
</div>
