type TimezoneConfig = {
	city: string;
	timezone: string;
};

const DEFAULT_TIMEZONES = [
	{ city: 'London', timezone: 'Europe/London' },
	{ city: 'New York', timezone: 'America/New_York' },
	{ city: 'Tokyo', timezone: 'Asia/Tokyo' },
	{ city: 'Sydney', timezone: 'Australia/Sydney' },
	{ city: 'Dubai', timezone: 'Asia/Dubai' },
];

export const AVAILABLE_TIMEZONES = [
	{ city: 'London', timezone: 'Europe/London' },
	{ city: 'New York', timezone: 'America/New_York' },
	{ city: 'Los Angeles', timezone: 'America/Los_Angeles' },
	{ city: 'Tokyo', timezone: 'Asia/Tokyo' },
	{ city: 'Sydney', timezone: 'Australia/Sydney' },
	{ city: 'Dubai', timezone: 'Asia/Dubai' },
	{ city: 'Singapore', timezone: 'Asia/Singapore' },
	{ city: 'Hong Kong', timezone: 'Asia/Hong_Kong' },
	{ city: 'Paris', timezone: 'Europe/Paris' },
	{ city: 'Berlin', timezone: 'Europe/Berlin' },
];

// State management using Svelte 5 runes
let timezones = $state(DEFAULT_TIMEZONES);
let current_times = $state<
	Array<TimezoneConfig & { time: string; date: string }>
>([]);

// Update times function
function update_times() {
	if (typeof window === 'undefined') return;

	current_times = timezones.map((tz: TimezoneConfig) => ({
		...tz,
		time: new Date().toLocaleTimeString('en-GB', {
			timeZone: tz.timezone,
			hour: '2-digit',
			minute: '2-digit',
			hour12: false,
		}),
		date: new Date().toLocaleDateString('en-GB', {
			timeZone: tz.timezone,
			weekday: 'short',
			day: '2-digit',
			month: 'short',
		}),
	}));
}

// Initialize client-side functionality
function init_client() {
	if (typeof window === 'undefined') return;

	// Load from localStorage
	const stored = localStorage.getItem('selected_timezones');
	if (stored) {
		timezones = JSON.parse(stored);
	}

	// Initial update
	update_times();

	// Update times every second
	setInterval(update_times, 1000);
}

// Initialize on client-side only
if (typeof window !== 'undefined') {
	init_client();
}

// State access functions
export function get_timezones() {
	return timezones;
}

export function get_current_times() {
	return current_times;
}

// Actions
export function add_timezone(timezone: TimezoneConfig) {
	timezones = [...timezones, timezone];
	if (typeof window !== 'undefined') {
		localStorage.setItem(
			'selected_timezones',
			JSON.stringify(timezones),
		);
		update_times();
	}
}

export function remove_timezone(timezone_to_remove: string) {
	timezones = timezones.filter(
		(tz: TimezoneConfig) => tz.timezone !== timezone_to_remove,
	);
	if (typeof window !== 'undefined') {
		localStorage.setItem(
			'selected_timezones',
			JSON.stringify(timezones),
		);
		update_times();
	}
}

export function get_current_hour(timezone: string): number {
	return new Date()
		.toLocaleString('en-GB', {
			timeZone: timezone,
			hour: '2-digit',
			hour12: false,
		})
		.split(':')[0] as unknown as number;
}
