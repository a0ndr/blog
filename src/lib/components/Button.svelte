<script lang="ts">
    export let text: string;
    export let callback: any;
    export let classes: string = "";
    export let type: "button" | "submit" | "reset" | null | undefined = "button";
</script>

<button on:click={callback} class={"link " + classes} type={type}>
    <span>[ </span>
    <span class="link-text">{text}</span>
    <span> ]</span>
</button>
