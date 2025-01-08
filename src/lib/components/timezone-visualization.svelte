<script lang="ts">
	import { browser } from '$app/environment';
	import {
		get_current_hour,
		get_timezones,
	} from '$lib/state/timezone.svelte';
	import { onMount } from 'svelte';

	let mounted = $state(false);

	// Calculate the range of hours to display (2 hours before and after current hour)
	function get_hour_range(): number[] {
		const current_hour = new Date().getHours();
		const start_hour = (current_hour - 2 + 24) % 24;
		const hours: number[] = [];
		
		for (let i = 0; i < 5; i++) {
			hours.push((start_hour + i) % 24);
		}
		
		return hours;
	}

	// Get the offset needed to align a timezone's hours with London
	function get_timezone_offset(timezone: string): number {
		const london_hour = get_current_hour('Europe/London');
		const timezone_hour = get_current_hour(timezone);
		let offset = london_hour - timezone_hour;

		// Handle day boundary cases
		if (offset > 12) offset -= 24;
		if (offset < -12) offset += 24;

		return offset;
	}

	// Get the display hour for a timezone, shifted to align with London
	function get_display_hour(
		base_hour: number,
		timezone: string,
	): number {
		const offset = get_timezone_offset(timezone);
		return (base_hour - offset + 24) % 24;
	}

	// Check if this slot should be highlighted (current time in this timezone)
	function is_current_hour(
		display_hour: number,
		timezone: string,
	): boolean {
		return display_hour === get_current_hour(timezone);
	}

	// Format hour with AM/PM
	function format_hour(hour: number): string {
		const period = hour < 12 ? 'AM' : 'PM';
		const display_hour = hour % 12 || 12;
		return `${display_hour} ${period}`;
	}

	onMount(() => {
		mounted = true;
	});
</script>

<div class="card bg-base-100 p-4 shadow-xl">
	<h2 class="mb-4 text-2xl font-bold">Time Visualization</h2>
	<div class="overflow-x-auto">
		<div class="min-w-full">
			{#if browser && mounted}
				{#each get_timezones() as { city, timezone }}
					<div class="mb-6 flex items-center">
						<div class="w-32 font-semibold">{city}</div>
						<div
							class="relative h-16 flex-1 overflow-hidden rounded-lg bg-base-200"
						>
							{#each get_hour_range() as hour, index}
								{@const display_hour = get_display_hour(
									hour,
									timezone,
								)}
								<div
									class="absolute h-full w-[20%] border-r border-base-300 transition-colors hover:bg-base-300"
									style="left: {index * 20}%"
									class:bg-primary={is_current_hour(
										display_hour,
										timezone,
									)}
									class:opacity-5={!is_current_hour(
										display_hour,
										timezone,
									)}
								>
									<div class="absolute inset-0 flex flex-col items-center justify-center text-center">
										<span class="text-base font-medium">
											{format_hour(display_hour)}
										</span>
									</div>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			{:else}
				<div class="mb-6 flex items-center">
					<div class="skeleton h-8 w-32"></div>
					<div class="ml-4 flex-1">
						<div class="skeleton h-16 w-full"></div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
