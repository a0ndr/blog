<script lang="ts">
	import PostEditor from "$lib/components/PostEditor.svelte";
	import { Title } from "$lib/title";
	import type { PageData } from "../$types";

    async function save(title: string, content: string) {
        await fetch('/cutiezone/texts', {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: title, content }),
            credentials: "include"
        });
        window.location.href = `/cutiezone/texts`;
    }

    export let data: PageData;
    const id = data.id;
    const content = data.texts[data.id];

    Title.set('ProtoBlog - Editing ' + id);
</script>

<PostEditor title={id} content={content} publishCallback={save} titleEditable={false} redirect="/cutiezone/texts" />
