<script lang="ts">
	import { Title } from '$lib/title';
	import type { PageData } from '../$types';
	import getUnicodeFlagIcon from 'country-flag-icons/unicode';

	export let data: PageData;

	async function toggleBlocked(ip: string, blocked: boolean) {
		const _ = confirm(`Are you sure you want to ${blocked ? 'un' : ''}block ${ip}?`);
		if (!_) return;

		await fetch('/cutiezone/ips', {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ip }),
			credentials: 'include'
		});
		window.location.href = `/cutiezone/ips`;
	}

	Title.set('ProtoBlog - CZ - IPs');
</script>

<h3 class="text-2xl">IPs</h3>

<div class="flex gap-8 flex-wrap">
	{#each data.ips as ip}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="mt-3 h-max w-max cursor-pointer text-start opacity-80 hover:opacity-100"
			on:click={() => toggleBlocked(ip.ip, ip.blocked)}
		>
			<!-- <span class="text-gray-200">{ip.ip}</span> <span class="text-sm text-gray-600">[</span>
		<span class="text-sm text-gray-400">{ip.requests} requests | Country: {ip.country}</span>
		<span class="text-sm text-gray-600">]</span>
		{#if ip.blocked}
			<span class="text-sm text-red-500">[BLOCKED]</span>
		{/if} -->

			<p class="text-xl">
				{ip.ip}
				{#if ip.blocked}
					<span class="text-sm text-red-500">[BLOCKED]</span>
				{/if}
			</p>
			<p class="text-lg text-gray-300">{ip.requests} requests</p>
			<p class="text-base text-gray-400">
				Country: {ip.country}<br />
				COA: {ip.score}% | Reports: {ip.reports}<br />
				First seen: {ip.first_seen.toLocaleString('en-us')}<br />
				Last seen: {ip.last_seen.toLocaleString('en-us')}
			</p>
		</div>
	{/each}
</div>
