<script>
	import Button from "./Button.svelte";
</script>
<nav class="w-100 text-center mb-5">
    <Button text="New post" callback={() => console.log("new post")} />
    <Button text="View posts" callback={() => console.log("list post")} />
    <Button text="Manage users" callback={() => console.log("manager users")} />
    <Button text="Config" callback={() => console.log("config")} />
    <Button text="Change password" callback={() => console.log("chpwd")} />
    <Button text="Logout" callback={() => console.log("logout")} />
</nav>