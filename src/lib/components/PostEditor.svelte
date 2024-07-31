<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { onMount } from 'svelte';
	import Link from './Link.svelte';

	export let title: string;
    export let content: string;
	const initialContent = content;

	export let titleEditable: boolean = true;

    export let publishCallback: (title: string, content: string) => void;
    export let saveAsDraftCallback: ((title: string, content: string) => void) | ((title: string, content: string) => Promise<void>) | undefined = undefined;
	export let deleteCallback: (() => void) | (() => Promise<void>) | undefined = undefined;
    export let redirect: string = "/cutiezone";

	onMount(() => {
		const tx = document.getElementsByTagName('textarea');

		for (let i = 0; i < tx.length; i++) {
			tx[i].setAttribute('style', 'height:' + tx[i].scrollHeight + 'px;overflow-y:hidden;');
			tx[i].addEventListener('input', OnInput, false);
		}

		function OnInput(e: any) {
			// @ts-ignore
			this.style.height = 'auto';
			// @ts-ignore
			this.style.height = this.scrollHeight + 'px';
		}
	});

	function discard() {
		if (content !== initialContent && !confirm("Are you sure you want to discard your changes?"))
			return;

		window.location.href = redirect;
	}
</script>

<div class="mx-auto">
	<div class="flex justify-between">
		{#if titleEditable}
		<span
			placeholder="Post title..."
			class="cursor-text border-0 bg-slate-900 p-0 text-4xl"
			contenteditable="true"
			bind:textContent={title}
		></span>
		{:else}
		<span
			class="cursor-text border-0 bg-slate-900 p-0 text-4xl"
		>{title}</span>
		{/if}
		<div class="h-full self-center">
			{#if deleteCallback}
				<Button text="Delete" callback={deleteCallback} />
			{/if}
			<Button text="Discard" callback={discard} />
			{#if saveAsDraftCallback}
				<Button text="Save as Draft" callback={() => saveAsDraftCallback(title, content)} />
			{/if}
			<Button text="Publish" callback={() => publishCallback(title, content)} />
		</div>
		<!-- <p class="text-base text-gray-500">[ {since} by {data.author.username} ]</p> -->
	</div>
	<hr class="!w-full" />
	<textarea class="w-full bg-slate-900 p-0 resize-none" bind:value={content}></textarea>
</div>

<style>
	hr {
		width: 12rem;
		border-top: 1px solid #4b5563;
		margin-top: 1rem;
		margin-bottom: 1rem;
		margin-left: auto;
		margin-right: auto;
	}

	[contenteditable='true']:focus {
		outline: 0px solid transparent;
	}

	[contenteditable='true']:empty:before {
		content: attr(placeholder);
		color: gray;
	}
	/* found this online --- it prevents the user from being able to make a (visible) newline */
	[contenteditable='true'] br {
		display: none;
	}
</style>
