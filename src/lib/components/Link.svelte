<script lang="ts">
    export let text: string;
    export let url: string;
    export let classes: string = "";
</script>

<a href={url} class={"link " + classes}>
    <span>[ </span>
    <span class="link-text">{text}</span>
    <span> ]</span>
</a>
