<script lang="ts">
	import { get_current_times } from '$lib/state/timezone.svelte';
	import TimeZoneRow from './timezone-row.svelte';

	let current_times = $derived(get_current_times());
</script>

<div class="card bg-base-100 px-5 pt-6 shadow-xl mb-8">
	<div class="overflow-x-auto">
		<div class="min-w-full">
			{#if current_times.length > 0}
				{#each current_times as { city, timezone }}
					<TimeZoneRow {city} {timezone} />
				{/each}
			{:else}
				<div
					class="-mt-6 flex min-h-32 items-center justify-center text-base-content/70"
				>
					<p class="text-xl">
						No timezones added yet. Use the search above to add some!
					</p>
				</div>
			{/if}
		</div>
	</div>
</div>
