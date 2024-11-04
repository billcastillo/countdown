<script lang="ts">
	import type { CreatePageProps } from '../create/types';
	import { goto } from '$app/navigation';
	import { convertTimezone, getTimezoneFromISODate } from '$lib/utils/date';
	import Countdown from '$lib/components/Countdown.svelte';
	import CountdownLabel from '$lib/components/CountdownLabel.svelte';
	import { page } from '$app/stores';

	const currentUrl = $page.url.href;

	let { data }: CreatePageProps = $props();

	if (!data.iso) {
		goto('/create');
	}

	const selectedDateTimezone = getTimezoneFromISODate(data.iso);
	const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const convertedDate = convertTimezone(
		new Date(data.iso),
		selectedDateTimezone,
		userTimezone
	);

	let selectedDate = $state(convertedDate);
	let successCopy = $state('');

	const clickToCopy = () => {
		successCopy = '';

		if (currentUrl) {
			navigator.clipboard.writeText(currentUrl);
			successCopy = 'Copied!';
		}
	};
</script>

<div class="wrapper">
	<div class="container mx-auto xs:p-1 md:p-4">
		<Countdown date={selectedDate} />
		<CountdownLabel
			date={selectedDate}
			title={data.config.title}
			description={data.config.description}
		/>
	</div>

	<section class="container mx-auto">
		<div class="text-center">
			<h4 class="font-fira mb-2 uppercase text-lg text-gray-600">Share</h4>
			<div class="flex gap-2 justify-center items-center mx-auto">
				<input
					class="form-input border-2 py-1 px-2"
					type="text"
					readonly
					aria-readonly="true"
					value={currentUrl}
					onclick={clickToCopy}
				/>
				<button
					class="w-[24px]"
					onclick={clickToCopy}
					aria-label="Click to copy URL"
				>
					<svg
						class="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium css-1iirmgg"
						focusable="false"
						aria-hidden="true"
						viewBox="0 0 24 24"
						data-testid="ContentCopyIcon"
						><path
							d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2m0 16H8V7h11z"
						></path></svg
					>
				</button>
			</div>
			<span class="block text-green-600">{successCopy}</span>
		</div>
	</section>
</div>
