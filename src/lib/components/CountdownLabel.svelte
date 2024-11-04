<script lang="ts">
	interface CountdownLabelProps {
		date: Date | string;
		title?: string;
		description?: string;
	}

	import { formatDisplayDate } from '$lib/utils/date';
	let { date, title = '', description = '' }: CountdownLabelProps = $props();
</script>

<section class="mb-16 max-w-5xl mx-auto text-center">
	<div class="mb-4 max-w-3xl mx-auto">
		<h2 class="leading-none mb-2">
			<span class="block mb-4 font-fira uppercase tracking-widest text-gray-500"
				>until</span
			>
			<span
				class="block text-[1.50rem] sm:text-[3rem] text-violet-800 font-bruno uppercase break-words"
				>{title}</span
			>
		</h2>

		<h3 class="block font-fira text-lg text-gray-600">
			{description}
		</h3>
	</div>

	<div>
		<p class="font-fira text-sm text-gray-600">
			<!-- <strong>Date:</strong> -->
			<time>{formatDisplayDate(date)}</time>
		</p>
	</div>
</section>
