<script lang="ts">
	import { get_current_times } from '$lib/state/timezone.svelte';
	import TimeZoneRow from './timezone-row.svelte';

	let current_times = $derived(get_current_times());
</script>

<div class="card bg-base-100 px-5 pt-6 shadow-xl">
	<div class="overflow-x-auto">
		<div class="min-w-full">
			{#each current_times as { city, timezone, time }}
				<TimeZoneRow {city} {timezone} {time} />
			{/each}
		</div>
	</div>
</div>
