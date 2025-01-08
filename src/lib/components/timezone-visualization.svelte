<script lang="ts">
    import { browser } from '$app/environment';
    import { onMount } from 'svelte';
    import { get_timezones, get_current_hour } from '$lib/state/timezone.svelte';

    const hours = Array.from({ length: 24 }, (_, i) => i);
    let mounted = $state(false);

    onMount(() => {
        mounted = true;
    });
</script>

<div class="card bg-base-100 p-4 shadow-xl">
    <h2 class="mb-4 text-2xl font-bold">Time Visualization</h2>
    <div class="overflow-x-auto">
        <div class="min-w-full">
            {#if browser && mounted}
                {#each get_timezones() as { city, timezone }}
                    <div class="mb-4 flex items-center">
                        <div class="w-32 font-semibold">{city}</div>
                        <div class="relative h-12 flex-1 overflow-hidden rounded-lg bg-base-200">
                            {#each hours as hour}
                                <div
                                    class="absolute h-full w-[4.166667%] border-r border-base-300 transition-colors"
                                    style="left: {hour * 4.166667}%"
                                    class:bg-primary={hour === get_current_hour(timezone)}
                                    class:opacity-10={hour !== get_current_hour(timezone)}
                                >
                                    <span class="absolute bottom-0 left-1 text-xs">
                                        {hour.toString().padStart(2, '0')}
                                    </span>
                                </div>
                            {/each}
                        </div>
                    </div>
                {/each}
            {:else}
                <div class="mb-4 flex items-center">
                    <div class="skeleton h-8 w-32"></div>
                    <div class="ml-4 flex-1">
                        <div class="skeleton h-12 w-full"></div>
                    </div>
                </div>
            {/if}
        </div>
    </div>
</div>
