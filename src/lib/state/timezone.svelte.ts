export type TimezoneConfig = {
	city: string;
	timezone: string;
};

type GroupedTimezones = {
	continent: string;
	zones: TimezoneConfig[];
};

// Function to format city name from timezone identifier
function format_city_name(timezone: string): string {
	// Get the city part after the last '/'
	const city = timezone.split('/').pop() || timezone;
	// Replace underscores with spaces and fix common abbreviations
	return city
		.replace(/_/g, ' ')
		.replace(/^([A-Z])/g, (match) => match.toUpperCase())
		.replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase
		.replace(/\b(St)\b/g, 'Saint')
		.replace(/\b(Ft)\b/g, 'Fort');
}

// Add this function to detect user's timezone
const get_user_timezone = (): TimezoneConfig | null => {
	if (typeof window === 'undefined') return null;

	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
	const city = format_city_name(timezone);

	return { city, timezone };
};

// Modify the DEFAULT_TIMEZONES initialization
const DEFAULT_TIMEZONES = [
	{ city: 'London', timezone: 'Europe/London' },
	{ city: 'New York', timezone: 'America/New_York' },
	{ city: 'Tokyo', timezone: 'Asia/Tokyo' },
	{ city: 'Sydney', timezone: 'Australia/Sydney' },
	{ city: 'Dubai', timezone: 'Asia/Dubai' },
];

// Get all available timezones from the system
export const AVAILABLE_TIMEZONES: GroupedTimezones[] =
	Intl.supportedValuesOf('timeZone')
		.map((timezone) => ({
			city: format_city_name(timezone),
			timezone,
			continent: timezone.split('/')[0].replace(/_/g, ' '),
		}))
		.reduce((groups: GroupedTimezones[], zone) => {
			const continent = zone.continent;
			const existing = groups.find((g) => g.continent === continent);
			if (existing) {
				existing.zones.push({
					city: zone.city,
					timezone: zone.timezone,
				});
			} else {
				groups.push({
					continent,
					zones: [{ city: zone.city, timezone: zone.timezone }],
				});
			}
			return groups;
		}, [])
		.sort((a, b) => a.continent.localeCompare(b.continent));

// State management using Svelte 5 runes
let timezones = $state(DEFAULT_TIMEZONES);
let current_times = $state<
	Array<TimezoneConfig & { time: string; date: string }>
>([]);
let expanded_view = $state(false);

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

const parse_url_timezones = (): TimezoneConfig[] | null => {
	if (typeof window === 'undefined') return null;

	const params = new URLSearchParams(window.location.search);
	const zones = params.get('tz');

	if (!zones) return null;

	try {
		return zones
			.split(',')
			.map((zone) => {
				// Validate that timezone exists
				if (!Intl.supportedValuesOf('timeZone').includes(zone)) {
					return null;
				}
				return {
					city: format_city_name(zone),
					timezone: zone,
				};
			})
			.filter((tz): tz is TimezoneConfig => tz !== null);
	} catch {
		return null;
	}
};

function init_client() {
	if (typeof window === 'undefined') return;

	// First check URL parameters
	const url_timezones = parse_url_timezones();
	if (url_timezones?.length) {
		timezones = url_timezones;
		// Update URL to clean state
		window.history.replaceState({}, '', window.location.pathname);
	} else {
		// Load from localStorage or initialize with user's timezone
		const stored = localStorage.getItem('selected_timezones');
		if (stored) {
			timezones = JSON.parse(stored);
		} else {
			const user_timezone = get_user_timezone();
			if (user_timezone) {
				// Put user's timezone first in the list
				timezones = [
					user_timezone,
					...DEFAULT_TIMEZONES.filter(
						(tz) => tz.timezone !== user_timezone.timezone,
					),
				];
			} else {
				timezones = DEFAULT_TIMEZONES;
			}
		}
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
	// Check if timezone already exists
	if (timezones.some((tz) => tz.timezone === timezone.timezone)) {
		return; // Exit if timezone already exists
	}

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
	const now = new Date();
	const hour = parseInt(
		now
			.toLocaleString('en-GB', {
				timeZone: timezone,
				hour: '2-digit',
				hour12: false,
			})
			.split(':')[0],
	);

	return hour;
}

export function get_expanded_view() {
	return expanded_view;
}

export function toggle_expanded_view() {
	expanded_view = !expanded_view;
}

export const get_share_url = (): string => {
	if (typeof window === 'undefined') return '';

	const zones = timezones.map((tz) => tz.timezone).join(',');
	const base_url = window.location.origin + window.location.pathname;
	return `${base_url}?tz=${zones}`;
};
