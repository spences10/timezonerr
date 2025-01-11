<script lang="ts">
	import TimezoneCard from '$lib/components/timezone-card.svelte';
	import TimezoneSelector from '$lib/components/timezone-selector.svelte';
	import TimezoneVisualization from '$lib/components/timezone-visualization.svelte';
</script>

<svelte:head>
	<title>Timezoner - World Time Zone Converter</title>
	<meta
		name="description"
		content="Compare times across different time zones with Timezoner. A simple and intuitive world clock and time zone converter."
	/>
	<meta
		name="keywords"
		content="timezone converter, world clock, time zones, international time"
	/>
	<meta
		property="og:title"
		content="Timezoner - World Time Zone Converter"
	/>
	<meta
		property="og:description"
		content="Compare times across different time zones with Timezoner. A simple and intuitive world clock and time zone converter."
	/>
</svelte:head>

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

		<nav class="sm:min-w-[320px]">
			<TimezoneSelector />
		</nav>
	</div>
</header>

<article>
	<h2 class="sr-only">Timezone Cards</h2>
	<TimezoneCard />
</article>

<article>
	<h2 class="sr-only">Timezone Visualization</h2>
	<TimezoneVisualization />
</article>
