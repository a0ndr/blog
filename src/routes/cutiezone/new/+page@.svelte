<script lang="ts">
	import PostEditor from "$lib/components/PostEditor.svelte";

    async function save(title: string, content: string, published: boolean) {
        await fetch('new', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content, published }),
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

</script>

<PostEditor title="" content="" saveAsDraftCallback={saveAsDraft} publishCallback={publish} />
