<script lang="ts">
	import { page } from '$app/stores';
	import logo from '$lib/images/svelte-logo.svg';
	import github from '$lib/images/github.svg';
</script>

<header class="m-4">
	<nav class="w-full flex justify-between items-center">
		<a href="/" class="font-bruno text-sm uppercase">Countdown<br />creator</a>
		{#if $page.url.pathname !== '/create' && $page.url.pathname !== '/'}
			<a
				aria-label="create a new countdown"
				href="/create"
				class="cd-button hover:no-underline hover:first-letter:shadow">Create</a
			>
		{/if}
	</nav>
</header>
