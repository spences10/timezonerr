<script lang="ts">
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import { get_current_times, remove_timezone } from '$lib/state/timezone.svelte';

    let mounted = $state(false);

    onMount(() => {
        mounted = true;
    });
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {#if browser && mounted}
        {#each get_current_times() as { city, timezone, time, date }}
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="flex justify-between items-center">
                    <h2 class="card-title">{city}</h2>
                    <button class="btn btn-square btn-sm btn-ghost" onclick={() => remove_timezone(timezone)}>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="stats bg-base-200">
                    <div class="stat">
                        <div class="stat-title">Current Time</div>
                        <div class="stat-value font-mono">{time}</div>
                        <div class="stat-desc">{date}</div>
                    </div>
                </div>
                <div class="badge badge-ghost">{timezone}</div>
            </div>
        </div>
        {/each}
    {:else}
        <div class="card bg-base-100 shadow-xl">
            <div class="card-body">
                <div class="skeleton h-8 w-32 mb-4"></div>
                <div class="skeleton h-12 w-full mb-2"></div>
                <div class="skeleton h-4 w-24"></div>
            </div>
        </div>
    {/if}
</div>
