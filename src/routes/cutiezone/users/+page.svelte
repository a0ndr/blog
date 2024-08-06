<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import { Title } from "$lib/title";
    import type { PageData } from "../$types";

    export let data: PageData;
    const { users } = data;

    Title.set('ProtoBlog - CZ - Users');

    async function create() {
        const username = prompt("What should be the username?");
        if (!username) return;

        const password = prompt("What should be the password?");
        if (!password) return;

        await fetch('users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
            credentials: "include"
        });
        window.location.reload();
    }

    async function deleteUser(id: number) {
        const _ = confirm("Are you sure you want to delete user #" + id + "?");
        if (!_) return;

        await fetch('users', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
            credentials: "include"
        });
        window.location.reload();
    }
</script>

<p>
    <span class="text-2xl">Users</span>
    <Button text="Create" callback={create} />
</p>
<!-- svelte-ignore a11y_no_static_element_interactions -->
{#each users as user}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <div class="mt-3 opacity-80 hover:opacity-100 cursor-pointer" on:click={() => deleteUser(user.id)}>
        <span class="text-gray-500">#{user.id}</span>
        {user.username}
    </div>
{/each}
