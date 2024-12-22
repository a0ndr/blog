<script lang="ts">
	import { page } from '$app/state';
	import Admin from '$lib/components/navbars/Admin.svelte';
	import Default from '$lib/components/navbars/Default.svelte';
	import Title from '$lib/components/Title.svelte';
	import '../app.css';
	let { children } = $props();

	let isAdmin = page.url.pathname.startsWith("/admin");
</script>

<Title Admin={isAdmin}>
	{#snippet Navbar()}
		{#if isAdmin}
		    <Admin />
		{:else}
		    <Default />
		{/if}
	{/snippet}
</Title>
<div class="body-font mt-5">
	{@render children?.()}
</div>
