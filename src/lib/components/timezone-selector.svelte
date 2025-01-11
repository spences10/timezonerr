<script lang="ts">
	import type { TimezoneConfig } from '$lib/state/timezone.svelte';
	import {
		AVAILABLE_TIMEZONES,
		add_timezone,
		get_timezones,
	} from '$lib/state/timezone.svelte';

	let search_query = $state('');
	let dropdown_open = $state(false);
	let error_message = $state('');

	const filter_timezones = () => {
		const query = search_query.toLowerCase().trim();
		if (!query) return AVAILABLE_TIMEZONES;

		return AVAILABLE_TIMEZONES.map((group) => ({
			continent: group.continent,
			zones: group.zones.filter((zone) => {
				const searchTerms = [
					zone.city.toLowerCase(),
					zone.timezone.toLowerCase(),
					zone.timezone.split('/').join(' ').toLowerCase(),
					// Add common timezone abbreviations
					...(zone.timezone.includes('London') ? ['gmt', 'bst'] : []),
					...(zone.timezone.includes('New_York')
						? ['est', 'edt']
						: []),
					...(zone.timezone.includes('Los_Angeles')
						? ['pst', 'pdt']
						: []),
					...(zone.timezone.includes('Chicago')
						? ['cst', 'cdt']
						: []),
					// Add more common search terms
					group.continent.toLowerCase(),
				];

				return searchTerms.some((term) => term.includes(query));
			}),
		})).filter((group) => group.zones.length > 0);
	};

	const handle_add = (zone: TimezoneConfig) => {
		// Check if timezone already exists
		if (get_timezones().some((tz) => tz.timezone === zone.timezone)) {
			error_message = `${zone.city} is already in your list`;
			setTimeout(() => {
				error_message = '';
			}, 3000);
			return;
		}

		add_timezone(zone);
		search_query = '';
		dropdown_open = false;
	};
</script>

<svelte:window
	onclick={(e: MouseEvent) => {
		const target = e.target as HTMLElement;
		if (!target?.closest('#timezone-search')) {
			dropdown_open = false;
		}
	}}
/>

<div class="form-control w-full">
	<label class="label" for="timezone-search">
		<span class="label-text">Add Timezone</span>
	</label>

	<div class="relative">
		<input
			type="text"
			id="timezone-search"
			class="input input-bordered w-full"
			placeholder="Search for a city or timezone..."
			bind:value={search_query}
			onfocus={() => (dropdown_open = true)}
		/>

		{#if error_message}
			<div class="absolute -bottom-4 left-0 text-xs text-error">
				{error_message}
			</div>
		{/if}

		{#if dropdown_open}
			<div
				class="absolute z-50 mt-1 max-h-96 w-full overflow-auto rounded-lg border border-base-300 bg-base-100 shadow-lg"
			>
				{#each filter_timezones() as group}
					{#if group.zones.length > 0}
						<div
							class="border-b border-base-200 bg-base-200 px-3 py-2 font-semibold"
						>
							{group.continent}
						</div>
						{#each group.zones as zone}
							<button
								class="w-full px-4 py-2 text-left hover:bg-base-200"
								onclick={() => handle_add(zone)}
							>
								<div>{zone.city}</div>
								<div class="text-sm opacity-60">{zone.timezone}</div>
							</button>
						{/each}
					{/if}
				{/each}

				{#if filter_timezones().length === 0}
					<div class="p-4 text-center text-base-content/60">
						No timezones found
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
