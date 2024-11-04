/**
 * Converts date to an acceptable format for datepicker
 * @returns {string}
 */
export const getDatepickerFormat = (date: Date) => {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	return `${year}-${month}-${day}`;
};

export const getTimeFromDate = (date: Date) => {
	return date.toLocaleString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});
};

/**
 * Converts date to a format of: `${month} ${day}, ${year} - ${time}`
 * @returns {string}
 */
export const formatDisplayDate = (dateStr: Date | string) => {
	const date = new Date(dateStr);
	return date.toLocaleString('en-US', {
		month: 'short',
		day: '2-digit',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		hour12: false
	});
};

/**
 * Converts arg date to be formatted that includess a timezone
 */
export const getFormattedDate = (date: Date) => {
	// Get user's timezone
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	// const formatter = new Intl.DateTimeFormat('en-US', {
	const formatted = date.toLocaleString('en-US', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
		// timeZoneName: 'shortOffset',
		timeZone: timezone
		// formatMatcher: 'basic'
	});

	const isoDate = new Date(formatted).toISOString();
	const localDate = new Date(isoDate).toLocaleString();
	return formatted;
};

export const getNextDate = (month: number, day: number) => {
	const now = new Date();
	const currentYear = now.getFullYear();
	const targetDate = new Date(currentYear, month - 1, day);

	// Get date for next year if date already passed this year
	if (targetDate < now) {
		targetDate.setFullYear(currentYear + 1);
	}

	targetDate.setHours(0, 0, 0, 0);
	return targetDate;
};

export const getAllTimezones = () => {
	const timezones = Intl.supportedValuesOf('timeZone');
	return timezones;
};

export const getAllGTM = () => {
	const timezones = [];

	// Generate UTC-12 to UTC+14
	for (let i = -12; i <= 14; i++) {
		const prefix = i >= 0 ? '+' : '';
		timezones.push({
			value: i,
			label: `GMT${prefix}${i}:00`
		});
	}

	return timezones;
};

export const getUserTimezone = () => {
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const time = new Date().toLocaleString('en-US', {
		timeZone: timezone,
		timeZoneName: 'long',
		hour12: true,
		hour: 'numeric',
		minute: 'numeric'
	});

	return {
		timezone,
		time,
		offsetHours: -(new Date().getTimezoneOffset() / 60)
	};
};

export const getDateInTimezone = (date: Date, timezone: string) => {
	return new Date(
		date.toLocaleString('en-US', {
			timeZone: timezone
		})
	);
};

// todo: fix
export function getTimezoneFromISODate(isoString: string): string {
	const date = new Date(isoString);
	return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export const convertTimezone = (
	date: Date,
	fromTimezone: string,
	toTimezone: string
) => {
	const originalTime = date.toLocaleString('en-US', {
		timeZone: fromTimezone
	});

	return new Date(originalTime).toLocaleString('en-US', {
		timeZone: toTimezone
	});
};

export const addLeadingZero = (value: number | string) => {
	return value.toString().padStart(2, '0');
};

export const getISOWithTimezone = (date: Date, timezone: string) => {
	const options = {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: true,
		timeZone: timezone,
		formatMatcher: 'basic'
	};

	const formatter = new Intl.DateTimeFormat('en-US', options);
	return formatter.format(date).replace(/[/]/g, '-');
};
