<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import type { PageData } from './$types';
	import { Title } from '$lib/title';

	const names = [
		'protogen.fun',
		'da bloggy',
		'the fun of protogens',
		'protogen blog!!',
		'protogens having fun',
		'beep boop boop beep',
		'proto blog',
		'proto adventures',
		'beep beep blog',
		'proto vibes'
	];

	export let data: PageData;
</script>

<link
	rel="stylesheet"
	href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
	integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
	crossorigin="anonymous"
	referrerpolicy="no-referrer"
/>

<link rel="stylesheet" href="https://furryring.neocities.org/onionring.css" />

<title>{$Title}</title>

<h1 class="w-100 my-5 text-center text-2xl">{names[Math.floor(Math.random() * names.length)]}</h1>
<Navbar />

<div class="mt-5 flex w-full justify-center text-center">
	<div class="w-3/5">
		<slot></slot>
	</div>
</div>
<div class="my-5 flex w-full justify-center gap-2">
	<img src="https://cdn.ptgn.fun/human-black.png" alt="Written by human, not by AI" />
	{#if data.config.ABUSEIPDB_USER_ID}
		<a
			href="https://www.abuseipdb.com/user/{data.config.ABUSEIPDB_USER_ID}"
			title="AbuseIPDB is an IP address blacklist for webmasters and sysadmins to report IP addresses engaging in abusive behavior on their networks"
			class="w-40"
			target="_blank"
		>
			<img
				src="https://www.abuseipdb.com/contributor/{data.config.ABUSEIPDB_USER_ID}.svg"
				alt="AbuseIPDB Contributor Badge"
				style="background: #888;padding: 2px;"
				class=""
			/>
		</a>
	{/if}
	<a href="https://caby.neocities.org/cat/" class="h-full self-center" target="_blank"
		><img src="https://caby.neocities.org/cat/plsdrawacat.gif" alt="Please draw a cat!" /></a
	>
	<!-- <a href="http://english-1672531670.spampoison.com" class="h-full self-center">
		<img
			src="https://cdn.ptgn.fun/spam.gif"
			width="80"
			height="15"
			alt=""
		/></a
	> -->
	<div class="h-full self-center">
		<img
			src="https://cdn.ptgn.fun/mm_bloggers.gif"
			style="border:none;"
			alt="Male + Male Bloggers"
		/><img src="https://cdn.ptgn.fun/pride_button.gif" style="border:none;" alt="Pride!" />
	</div>
</div>
<div id="furryring" class="mb-5 text-center">
	<script
		type="text/javascript"
		src="https://furryring.neocities.org/onionring-variables.js"
	></script>
	<script type="text/javascript" src="https://furryring.neocities.org/onionring-widget.js"></script>
</div>
