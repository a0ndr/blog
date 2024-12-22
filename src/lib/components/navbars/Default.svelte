<script lang="ts">
	import { page } from '$app/state';
</script>

{#snippet Navlink(name: string, href: string)}
    <a href={href} class="navlink no-default me-3" class:active='{page.url.pathname == href}'>{name}</a>
{/snippet}

{#snippet NavlinkParent(name: string, href: string)}
<a href={href} class="navlink no-default me-3" class:active='{page.url.pathname.startsWith(href)}'>{name}</a>
{/snippet}

<div>
    {@render Navlink('Home', '/', )}
    {@render Navlink('About', '/about')}
    {@render NavlinkParent('Posts', '/posts')}
</div>
