<script lang="ts">
	import PostEditor from "$lib/components/PostEditor.svelte";
	import { Title } from "$lib/title";
	import type { PageData } from "./$types";

    export let data: PageData;
    const {id, title, content} = data;

    async function save(title: string, content: string, published: boolean) {
        await fetch('/cutiezone/edit', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id, title, content, published }),
            credentials: "include"
        });
        window.location.href = `/cutiezone`;
    }

    async function saveAsDraft(title: string, content: string) {
        await save(title, content, false);
    }

    async function publish(title: string, content: string) {
        await save(title, content, true);
    }

    async function deletePost() {
        if (!confirm("Do you really want to delete this post?"))
            return;
        await fetch('/cutiezone/edit', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id  }),
            credentials: "include"
        });
        window.location.href = "/cutiezone"
    }

    Title.set('[PB] Editing ' + title);
</script>

<PostEditor title={title!} content={content!} saveAsDraftCallback={saveAsDraft} publishCallback={publish} deleteCallback={deletePost} />
