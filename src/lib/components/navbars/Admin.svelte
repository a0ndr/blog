<script lang="ts">
	import { page } from '$app/state';
</script>

{#snippet Navlink(name: string, href: string)}
	<a {href} class="anavlink no-default me-3" class:active={page.url.pathname == href}>{name}</a>
{/snippet}

<!-- {#snippet NavlinkParent(name: string, href: string)}
	<a {href} class="anavlink me-3" class:active={page.url.pathname.startsWith(href)}>{name}</a>
{/snippet} -->

<div class="flex justify-between">
	<div>
		{@render Navlink('Overview', '/admin')}
		{@render Navlink('Posts', '/posts')}
	</div>
	<div>
        <button class="anavlink" onclick={() => {
            window.location.href = '/';
        }}>Go Back</button>
    </div>
</div>
