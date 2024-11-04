<script lang="ts">
	import type { TimeDataProps } from '../../interface/global';
	import TimeBlock from '$lib/components/TimeBlock.svelte';
	import { addLeadingZero, formatDisplayDate } from '$lib/utils/date';

	interface CountdownProps {
		date: Date | string;
	}

	let { date }: CountdownProps = $props();

	$effect(() => {
		selectedDate = new Date(date);
	});

	let selectedDate = $state(new Date(date));

	const defaultTimeData = {
		diff: 0,
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	};

	let timeData: TimeDataProps = $state(defaultTimeData);

	$effect(() => {
		const today = new Date();
		const isFutureDate = selectedDate.getTime() > today.getTime();

		// Date cannot be in the past
		if (!isFutureDate) {
			timeData = defaultTimeData;
			return;
		}

		const interval = setInterval(function () {
			const now = new Date();
			if (
				isFutureDate &&
				selectedDate &&
				new Date(selectedDate) instanceof Date
			) {
				const diff = new Date(selectedDate).getTime() - now.getTime();
				const days = Math.floor(diff / (1000 * 60 * 60 * 24));
				const hours = Math.floor(
					(diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
				);
				const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((diff % (1000 * 60)) / 1000);

				const data = {
					diff,
					days: addLeadingZero(days),
					hours: addLeadingZero(hours),
					minutes: addLeadingZero(minutes),
					seconds: addLeadingZero(seconds)
				};

				if (diff <= 0) {
					clearInterval(interval);
				}

				timeData = data;
			}
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<article class="max-w-7xl mx-auto">
	<section class="text-center mb-16">
		<div class="my-16">
			<div class="flex justify-center content-center" aria-live="polite">
				{#if Number(timeData.days) > 0}
					<TimeBlock id="days" data={timeData.days} label="Days" hasColon />
				{/if}
				<TimeBlock id="hours" data={timeData.hours} label="Hours" hasColon />
				<TimeBlock
					id="minutes"
					data={timeData.minutes}
					label="Minutes"
					hasColon
				/>
				<TimeBlock id="seconds" data={timeData.seconds} label="Seconds" />
			</div>
		</div>
	</section>
</article>
