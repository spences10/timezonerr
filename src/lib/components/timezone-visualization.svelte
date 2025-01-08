<script lang="ts">
	import { browser } from '$app/environment';
	import {
		get_current_hour,
		get_timezones,
	} from '$lib/state/timezone.svelte';
	import { onMount } from 'svelte';

	const hours = Array.from({ length: 24 }, (_, i) => i);
	let mounted = $state(false);

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
					<div class="mb-4 flex items-center">
						<div class="w-32 font-semibold">{city}</div>
						<div
							class="relative h-12 flex-1 overflow-hidden rounded-lg bg-base-200"
						>
							{#each hours as hour}
								{@const display_hour = get_display_hour(
									hour,
									timezone,
								)}
								<div
									class="absolute h-full w-[4.166667%] border-r border-base-300 transition-colors"
									style="left: {hour * 4.166667}%"
									class:bg-primary={is_current_hour(
										display_hour,
										timezone,
									)}
									class:opacity-10={!is_current_hour(
										display_hour,
										timezone,
									)}
								>
									<span class="absolute bottom-0 left-1 text-xs">
										{display_hour.toString().padStart(2, '0')}
									</span>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			{:else}
				<div class="mb-4 flex items-center">
					<div class="skeleton h-8 w-32"></div>
					<div class="ml-4 flex-1">
						<div class="skeleton h-12 w-full"></div>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
