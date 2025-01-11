<script lang="ts">
	import TimezoneCard from '$lib/components/timezone-card.svelte';
	import TimezoneSelector from '$lib/components/timezone-selector.svelte';
	import TimezoneVisualization from '$lib/components/timezone-visualization.svelte';
</script>

<div class="min-h-screen bg-base-200">
	<div class="container mx-auto p-4">
		<div class="flex flex-col gap-8">
			<header class="card bg-base-100 p-6 shadow-xl">
				<div
					class="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between"
				>
					<div>
						<h1 class="mb-4 text-4xl font-bold">Timezoner</h1>
						<p class="text-lg text-base-content/70">
							What's the time now in different timezones.
						</p>
					</div>

					<div class="sm:min-w-[320px]">
						<TimezoneSelector />
					</div>
				</div>
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
