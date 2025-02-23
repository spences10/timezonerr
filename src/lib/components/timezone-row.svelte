<script lang="ts">
	import { get_hour_range } from '$lib/utils/timezone-utils';
	import TimeZoneHourSlot from './timezone-hour-slot.svelte';

	let { city, timezone } = $props<{
		city: string;
		timezone: string;
	}>();

	let hours = $derived(get_hour_range());
</script>

<div class="mb-6 flex items-center">
	<div class="w-32 font-semibold">{city}</div>
	<div
		class="bg-base-200 relative h-16 flex-1 overflow-hidden rounded-lg"
	>
		{#each hours as hour, index}
			<TimeZoneHourSlot {hour} {index} {timezone} />
		{/each}
	</div>
</div>
