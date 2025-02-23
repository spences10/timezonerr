<script lang="ts">
	import { get_search_terms } from '$lib/config/timezone-search';
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
					...get_search_terms(zone.timezone),
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
			<div class="text-error absolute -bottom-4 left-0 text-xs">
				{error_message}
			</div>
		{/if}

		{#if dropdown_open}
			<div
				class="border-base-300 bg-base-100 absolute z-50 mt-1 max-h-96 w-full overflow-auto rounded-lg border shadow-xl"
			>
				{#each filter_timezones() as group}
					{#if group.zones.length > 0}
						<div
							class="border-base-200 bg-base-200 border-b px-3 py-2 font-semibold"
						>
							{group.continent}
						</div>
						{#each group.zones as zone}
							<button
								class="hover:bg-base-200 w-full px-4 py-2 text-left"
								onclick={() => handle_add(zone)}
							>
								<div>{zone.city}</div>
								<div class="text-sm opacity-60">{zone.timezone}</div>
							</button>
						{/each}
					{/if}
				{/each}

				{#if filter_timezones().length === 0}
					<div class="text-base-content/60 p-4 text-center">
						No timezones found
					</div>
				{/if}
			</div>
		{/if}
	</div>
</div>
