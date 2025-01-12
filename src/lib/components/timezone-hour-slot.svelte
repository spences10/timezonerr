<script lang="ts">
	import { get_current_hour } from '$lib/state/timezone.svelte';
	import { get_timezone_offset } from '$lib/utils/timezone-utils';

	let { hour, index, timezone } = $props<{
		hour: number;
		index: number;
		timezone: string;
	}>();

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

	let display_hour = $derived(get_display_hour(hour, timezone));
	let is_current = $derived(
		display_hour === get_current_hour(timezone),
	);
</script>

<div
	class="absolute h-full w-[20%] border-r border-base-300 transition-all duration-200"
	style="left: {index * 20}%"
	class:bg-primary={is_current}
	class:hover:bg-primary-focus={is_current}
	class:bg-secondary={!is_current}
	class:bg-opacity-50={!is_current}
	class:hover:bg-secondary-focus={!is_current}
>
	<div
		class="absolute inset-0 flex flex-col items-center justify-center text-center"
	>
		<span
			class="text-base font-medium"
			class:text-primary-content={is_current}
			class:text-secondary-content={!is_current}
		>
			{format_hour(display_hour)}
		</span>
	</div>
</div>
