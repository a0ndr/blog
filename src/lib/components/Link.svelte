<script lang="ts">
	import { Theme } from "$lib";

    let {Label, Href, Class} = $props();
</script>

<a href={Href} class="text-white underline decoration-white decoration-2 underline-offset-2 hover:text-{$Theme.PrimaryColor} hover:decoration-{$Theme.PrimaryColor} {Class}">{Label}</a>
