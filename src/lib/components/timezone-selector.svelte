<script lang="ts">
	import {
		AVAILABLE_TIMEZONES,
		add_timezone,
	} from '$lib/state/timezone.svelte';

	let selected_index = $state(0);

	function handle_add() {
		add_timezone(AVAILABLE_TIMEZONES[selected_index]);
	}
</script>

<div class="flex flex-col gap-2 sm:flex-row sm:items-end sm:gap-4">
	<div class="form-control max-w-md flex-1">
		<label class="label" for="timezone-selector">
			<span class="label-text">Add Timezone</span>
		</label>
		<select
			class="select select-bordered w-full"
			id="timezone-selector"
			bind:value={selected_index}
		>
			{#each AVAILABLE_TIMEZONES as tz, index}
				<option value={index}>{tz.city} ({tz.timezone})</option>
			{/each}
		</select>
	</div>
	<button class="btn btn-primary" onclick={handle_add}>
		Add Timezone
	</button>
</div>
