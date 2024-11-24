<script lang="ts">
	import { getDatepickerFormat, getAllTimezones } from '$lib/utils/date';
	import { compressForUrl } from '$lib/utils/url';
	import { goto } from '$app/navigation';
	import Countdown from '$lib/components/Countdown.svelte';
	import CountdownLabel from '$lib/components/CountdownLabel.svelte';

	let title = $state('Tomorrow');
	let description = $state('');

	// Default countdown date is tomorrow
	const tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);

	let dateForCountdown: string = $state(getDatepickerFormat(tomorrow));
	let timeForCountdown: string = $state('00:00');

	const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	let timezoneForCountdown: string = $state(userTimezone);

	// Adds time to the selected date based on input
	const selectedDate = $derived.by(() => {
		const [hours, minutes] = timeForCountdown.split(':');
		let newDate = new Date(dateForCountdown);

		newDate.setHours(parseInt(hours, 10));
		newDate.setMinutes(parseInt(minutes, 10));

		// apply selected timezone
		newDate = new Date(
			newDate.toLocaleString('en-US', {
				timeZone: timezoneForCountdown
			})
		);

		return newDate;
	});

	const createURL = () => {
		const dateISO = selectedDate.toISOString();
		const compressedConfig = compressForUrl({
			title,
			description
		});

		// redirect to countdown page
		goto(`/countdown?iso=${dateISO}&config=${compressedConfig}`);
	};

	const allTimezones = getAllTimezones();
	const timezoneOptions = allTimezones.map((timezone) => {
		return {
			label: timezone,
			value: timezone
		};
	});

	const resetTimezone = (e: Event) => {
		e.preventDefault();
		timezoneForCountdown = userTimezone;
	};
</script>

<div class="wrapper p-2">
	<div class="container mx-auto">
		<div class="max-w-5xl mx-auto">
			<h1 class="mt-6 mb-12 font-bruno uppercase text-black">
				<strong>Create a countdown</strong>
			</h1>
			<form class="font-fira">
				<div class="grid gap-4 grid-cols-1 md:grid-cols-2">
					<div class="form-group w-full">
						<label
							class="mb-1 uppercase text-sm md:text-xl font-fira font-bold tracking-widest"
							for="countdown_date">Date</label
						>
						<input
							name="countdown_date"
							class="form-input xs:text-xs sm:text-2xl"
							id="countdown_date"
							type="date"
							bind:value={dateForCountdown}
							required
						/>
					</div>
					<div class="form-group w-full">
						<label
							class="mb-1 uppercase text-sm md:text-xl font-fira font-bold tracking-widest"
							for="countdown_time">Time</label
						>
						<input
							name="countdown_time"
							class="form-input xs:text-xs sm:text-2xl"
							id="countdown_time"
							type="time"
							bind:value={timeForCountdown}
						/>
					</div>
					<div class="form-group w-full">
						<label
							class="mb-1 uppercase text-sm font-fira font-bold tracking-widest"
							for="countdown_title">Event Title</label
						>
						<input
							name="countdown_title"
							class="form-input xs:text-xs sm:text-xl"
							id="countdown_title"
							bind:value={title}
							type="text"
							placeholder="Countdown Title"
							maxlength="64"
						/>
					</div>
					<div class="form-group w-full">
						<label
							class="mb-1 uppercase text-sm font-fira font-bold tracking-widest"
							for="countdown_desc">Description (Optional)</label
						>
						<input
							name="countdown_desc"
							class="form-input xs:text-xs sm:text-xl"
							id="countdown_description"
							bind:value={description}
							type="text"
							placeholder="Description"
							maxlength="140"
						/>
					</div>


					<div class="form-group w-full">
						<label
							class="mb-1 uppercase text-sm font-fira font-bold tracking-widest"
							for="countdown_timezone">Timezone (Optional)</label
						>
						<select
							name="countdown_timezone"
							class="form-input xs:text-xs sm:text-xl"
							id="countdown_timezone"
							bind:value={timezoneForCountdown}
						>
							{#each timezoneOptions as option}
								<option value={option.value}>{option.label}</option>
							{/each}
						</select>

						<button
							onclick={resetTimezone}
							class="w-fit mt-1 text-left underline text-sm"
							>Use my timezone</button
						>
					</div>
				</div>
			</form>
		</div>

		<Countdown date={selectedDate} />
		<CountdownLabel date={selectedDate} {title} {description} />

		<section class="text-center my-8">
			<button onclick={createURL} class="mx-auto cd-button"
				>Save Countdown</button
			>
		</section>
	</div>
</div>
