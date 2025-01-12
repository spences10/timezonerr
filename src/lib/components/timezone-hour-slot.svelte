<script lang="ts">
	import {
		get_current_hour,
		get_expanded_view,
	} from '$lib/state/timezone.svelte';
	import { get_timezone_offset } from '$lib/utils/timezone-utils';

	let { hour, index, timezone } = $props<{
		hour: number;
		index: number;
		timezone: string;
	}>();

	let is_expanded = $derived(get_expanded_view());
	let slot_width = $derived(is_expanded ? 100 / 24 : 20);

	const get_display_hour = (
		base_hour: number,
		tz: string,
	): number => {
		const offset = get_timezone_offset(tz);
		return (base_hour - offset + 24) % 24;
	};

	const format_hour = (h: number): string => {
		const period = h < 12 ? 'AM' : 'PM';
		const display = h % 12 || 12;
		return `${display} ${period}`;
	};

	const get_minute_position = (tz: string): number => {
		const date = new Date();
		const formatter = new Intl.DateTimeFormat('en-US', {
			timeZone: tz,
			hour: '2-digit',
			minute: '2-digit',
			hourCycle: 'h23',
		});

		const parts = formatter.formatToParts(date);
		const minutes = parseInt(
			parts.find((p) => p.type === 'minute')?.value || '0',
		);

		return (minutes / 60) * 100;
	};

	let display_hour = $derived(get_display_hour(hour, timezone));
	let is_current = $derived(
		display_hour === get_current_hour(timezone),
	);
	let minute_position = $derived(
		is_current ? get_minute_position(timezone) : 0,
	);
</script>

<div
	class="absolute h-full border-r border-base-300 transition-all duration-200"
	style="left: {index * slot_width}%; width: {slot_width}%"
	class:bg-primary={is_current}
	class:hover:bg-primary-focus={is_current}
	class:bg-secondary={!is_current}
	class:bg-opacity-50={!is_current}
	class:hover:bg-secondary-focus={!is_current}
>
	{#if is_current}
		<div
			class="absolute h-full w-1 bg-error/75 transition-all duration-200"
			style="left: {minute_position}%"
		></div>
	{/if}
	<div
		class="absolute inset-0 flex flex-col items-center justify-center text-center"
	>
		<span
			class:text-primary-content={is_current}
			class:text-secondary-content={!is_current}
			class:font-bold={is_current}
		>
			{format_hour(display_hour)}
		</span>
	</div>
</div>
