<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import {
		PUBLIC_FATHOM_ID,
		PUBLIC_FATHOM_URL,
	} from '$env/static/public';
	import Footer from '$lib/components/footer.svelte';
	import * as Fathom from 'fathom-client';
	import '../app.css';

	let { children } = $props();

	$effect(() => {
		if (browser) {
			Fathom.load(PUBLIC_FATHOM_ID, {
				url: PUBLIC_FATHOM_URL,
			});
		}
	});

	// Track pageview on route change
	$effect(() => {
		page.url.pathname, browser && Fathom.trackPageview();
	});
</script>

<div class="bg-base-200 relative min-h-screen">
	<div
		class="absolute inset-0"
		style="--dot-size: 1.5px; 
		--dot-space: 24px; 
		--dot-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
		--dot-bg: transparent; 
		background-image: 
			radial-gradient(var(--dot-color) var(--dot-size), var(--dot-bg) var(--dot-size));
		background-size: var(--dot-space) var(--dot-space);
		background-position: center;"
	></div>
	<main
		class="relative container mx-auto flex min-h-screen flex-col p-4"
	>
		<div class="flex flex-1 flex-col gap-8">
			{@render children()}
		</div>
		<Footer />
	</main>
</div>
