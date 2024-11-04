<script lang="ts">
	interface TimeBlockProps {
		id: string;
		data: number | string;
		label: string;
		hasColon?: boolean;
	}

	let { id, data, label, hasColon = false }: TimeBlockProps = $props();
</script>

<div data-time={id} class="flex-1">
	<span class="block font-bruno text-time-block text-black leading-none">
		{data}
	</span>
	<span
		class="block text-sm text-gray-600 md:text-lg font-fira uppercase tracking-widest"
		>{label}</span
	>
</div>

{#if hasColon}
	<div class="shrink">
		<span
			class="font-bruno text-time-block text-black leading-none select-none"
			aria-hidden="true">:</span
		>
	</div>
{/if}
