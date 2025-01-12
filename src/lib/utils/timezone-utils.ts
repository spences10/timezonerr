import {
	get_current_hour,
	get_expanded_view,
} from '$lib/state/timezone.svelte';

export const get_hour_range = (): number[] => {
	const current_hour = new Date().getHours();

	// Get expanded view state
	const is_expanded = get_expanded_view();

	if (is_expanded) {
		// Return full 24 hours starting from midnight
		return Array.from({ length: 24 }, (_, i) => i);
	}

	// Original 5-hour range logic
	const start_hour = (current_hour - 2 + 24) % 24;
	const hours: number[] = [];

	for (let i = 0; i < 5; i++) {
		hours.push((start_hour + i) % 24);
	}

	return hours;
};

export const get_timezone_offset = (timezone: string): number => {
	const london_hour = get_current_hour('Europe/London');
	const timezone_hour = get_current_hour(timezone);
	let offset = london_hour - timezone_hour;

	// Handle day boundary cases
	if (offset > 12) offset -= 24;
	if (offset < -12) offset += 24;

	return offset;
};
