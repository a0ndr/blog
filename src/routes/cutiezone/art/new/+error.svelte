<script>
	// @ts-nocheck

	import { page } from '$app/stores';
    import Link from '$lib/components/Link.svelte';
</script>

<p class="text-2xl">An error occurred while saving!</p>
<div class="prose text-center mx-auto w-max my-5">
    <pre>{$page.error.message}</pre>
</div>
<Link text="<- Go back" url="new" />
