<script lang="ts">
	import Showdown from 'showdown';
	import type { PageData } from '../$types';
	import { VERSION } from '$lib';
	import { Title } from '$lib/title';

	export let data: PageData;

	const converter = new Showdown.Converter();
	converter.setFlavor('github');

	const alignment = data.config.ABOUT_TEXT_ALIGNMENT;

    Title.set('ProtoBlog - About Us');
</script>

<div
	class="prose !max-w-none text-{alignment} text-gray-300 prose-headings:text-gray-300 prose-a:text-gray-200 prose-a:underline prose-strong:text-gray-200 prose-em:italic"
>
	{@html converter.makeHtml(
		data.texts.ABOUT_US
	)}
</div>

<hr class="mx-auto my-5 w-48 border-t-2 border-slate-700" />

<p class="text-slate-500">
	Made with ♥︎ by Fuzzy! ∙ <a
		href="https://github.com/a0ndr/blog"
		class="underline"
		target="_blank">Source code</a
	> ∙ GNU GPLv3 ∙
    v{VERSION}
</p>
