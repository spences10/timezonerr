<script lang="ts">
    import TimezoneCard from '$lib/components/timezone-card.svelte';
    import TimezoneSelector from '$lib/components/timezone-selector.svelte';
    import TimezoneVisualization from '$lib/components/timezone-visualization.svelte';
</script>

<div class="min-h-screen bg-base-200">
    <div class="container mx-auto p-4">
        <div class="flex flex-col gap-8">
            <header class="card bg-base-100 shadow-xl p-6">
                <h1 class="text-4xl font-bold mb-4">Timezone Dashboard</h1>
                <div class="divider"></div>
                <TimezoneSelector />
            </header>

            <section>
                <TimezoneCard />
            </section>

            <section>
                <TimezoneVisualization />
            </section>
        </div>
    </div>
</div>
