<script lang="ts">
	import PostEntry from '$lib/components/PostEntry.svelte';
	import { Title } from '$lib/title';
	import type { Note, User } from '@prisma/client';
	import type { PageData } from './$types';
	import { getFirstX, makeId } from '$lib/util';
	import Showdown from 'showdown';

	export let data: PageData;

	Title.set('ProtoBlog - Cutie Zone');

	let editing: number = 0;
	let noteInputId: string = makeId(8);
	let noteInput: string;

	async function createNote() {
		await fetch('/cutiezone/notes', {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ content: noteInput })
		});
		window.location.reload();
	}

	async function startEditingNote(id: number) {
		editing = id;
		noteInput = data.notes.find((x: Note) => x.id === id)!.content;
	}

	async function finishEditingNote() {
		await fetch('/cutiezone/notes', {
			method: 'PATCH',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id: editing, content: noteInput })
		});
		window.location.reload();
		noteInput = '';
	}

	async function deleteNote(id: number) {
		const _ = confirm('Are you sure you want to delete this note?');
		if (!_) return;

		await fetch('/cutiezone/notes', {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id })
		});
		window.location.reload();
	}

	const notes = getFirstX(data.notes, parseInt(data.config.NUM_OF_LATEST_NOTES));
	notes.reverse();

	const converter = new Showdown.Converter();
	converter.setFlavor("github");
</script>

<h1 class="text-xl">Welcome to the cutie zone, {data.user.username}!</h1>

<div class="mt-5 text-start">
	<div class="mx-auto mb-5 w-4/5 rounded-lg border border-gray-600 p-3">
		<p class="text-center font-bold">[ Notes ]</p>
		<div class="note-box-content">
			{#each notes as note}
				<div class="note-entry my-3">
					<span class="text-sm text-gray-400"
						>{data.users.find((x: User) => x.id === note.authorId) ? data.users.find((x: User) => x.id === note.authorId)!.username : "Deleted User"} • {new Date(
							note.createdAt
						).toLocaleString('en-us')}
						<span class="note-controls"
							>•
							{#if note.authorId === data.user.id}
								<button class="hover:underline" on:click={() => startEditingNote(note.id)}
									>Edit</button
								> •
							{/if}
							<button class="hover:underline" on:click={() => deleteNote(note.id)}>Delete</button
							></span
						></span
					>
					<p>
						{@html converter.makeHtml(note.content)}
					</p>
				</div>
			{:else}
				<p class="text-gray-400 text-center mt-3">No notes yet.</p>
			{/each}
			<div class="block flex w-full pt-5">
				<input
					type="text"
					id={noteInputId}
					name={noteInputId}
					bind:value={noteInput}
					class="me-3 w-full rounded border-gray-600 bg-slate-900 p-0 px-2 focus:border-gray-500 focus:ring-0"
				/>
				<button
					class="w-max rounded bg-gray-700 px-2.5 py-1.5 hover:bg-gray-600 active:bg-gray-500"
					on:click={editing ? finishEditingNote : createNote}>{editing ? 'Edit' : 'Save'}</button
				>
			</div>
		</div>
	</div>
	{#each data.posts as post}
		<PostEntry {post} {data} mode="admin" />
	{/each}
</div>
