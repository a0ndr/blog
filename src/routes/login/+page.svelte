<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { Title } from '$lib/title';
	import type { PageData } from '../cuties-only/$types';
	import type { User } from '@prisma/client';

	let username: string;
	let password: string;
	let error: boolean = false;

	async function login() {
		// let hash = await bcrypt.hash(username, 12);
		const res = await fetch('login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password }),
			credentials: 'include'
		});
		if (!res.ok) {
			error = true;
			return;
		} else {
			if (!(await res.json()).success) {
				error = true;
				return;
			} else {
				window.location.href = '/cutiezone';
			}
		}
	}

	Title.set("ProtoBlog - Log in")
</script>

<form class="my-auto" on:submit={login}>
	<p class="text-red-500 {error ? '' : 'hidden'}">Invalid username or password.</p>

	<input
		type="text"
		bind:value={username}
		placeholder="Username"
		class="form-input m-3 w-64 rounded border-0 border-b bg-slate-800 p-1 text-gray-300 focus:border-white focus:ring-0"
        on:keydown={() => error = false}
	/><br />
	<input
		type="password"
		bind:value={password}
		placeholder="Password"
		class="form-input m-3 w-64 rounded border-0 border-b bg-slate-800 p-1 text-gray-300 focus:border-white focus:ring-0"
        on:keydown={() => error = false}
	/><br />

	<Button text="*** Login ***" callback={() => {}} classes="mt-3" type="submit" />
</form>
