<script lang="ts">
	import type { PageData } from "../$types";

    export let data: PageData;
</script>

<h1 class="text-xl">Welcome to the cutie zone, {data.user.username}!</h1>