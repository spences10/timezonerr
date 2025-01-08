<script lang="ts">
    import { AVAILABLE_TIMEZONES, add_timezone } from '$lib/state/timezone.svelte';
    
    let selected_index = $state(0);
    
    function handle_add() {
        add_timezone(AVAILABLE_TIMEZONES[selected_index]);
    }
</script>

<div class="form-control w-full max-w-xs">
    <label class="label">
        <span class="label-text">Add Timezone</span>
    </label>
    <select 
        class="select select-bordered"
        bind:value={selected_index}
    >
        {#each AVAILABLE_TIMEZONES as tz, index}
            <option value={index}>{tz.city} ({tz.timezone})</option>
        {/each}
    </select>
    <button class="btn btn-primary mt-2" onclick={handle_add}>
        Add Timezone
    </button>
</div>
