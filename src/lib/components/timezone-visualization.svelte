<script lang="ts">
	import { get_timezones } from '$lib/state/timezone.svelte';
	import TimeZoneRow from './timezone-row.svelte';

	let timezones = $derived(get_timezones());
</script>

<div class="card bg-base-100 px-5 pt-6 shadow-xl">
	<div class="overflow-x-auto">
		<div class="min-w-full">
			{#each timezones as { city, timezone }}
				<TimeZoneRow {city} {timezone} />
			{/each}
		</div>
	</div>
</div>
