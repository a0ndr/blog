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
		'proto blog'
	];
</script>

<title>{$Title}</title>

<h1 class="w-100 my-5 text-center text-2xl">{names[Math.floor(Math.random() * names.length)]}</h1>
<Navbar />

<div class="w-full mt-5 flex justify-center text-center">
	<div class="w-3/5">
		<slot></slot>
	</div>
</div>
