<script lang="ts">
	import {
		get_expanded_view,
		toggle_expanded_view,
	} from '$lib/state/timezone.svelte';

	let is_expanded = $derived(get_expanded_view());
</script>

<label class="label hidden cursor-pointer gap-2 xl:flex">
	<span class="label-text">Show full day</span>
	<input
		type="checkbox"
		class="toggle toggle-primary toggle-sm"
		checked={is_expanded}
		onchange={toggle_expanded_view}
	/>
</label>
