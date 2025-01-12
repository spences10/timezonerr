<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import {
		PUBLIC_FATHOM_ID,
		PUBLIC_FATHOM_URL,
	} from '$env/static/public';
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

<div class="relative min-h-screen bg-base-200">
	<div
		class="absolute inset-0"
		style="--dot-size: 1.5px; 
		--dot-space: 24px; 
		--dot-color: oklch(var(--p) / 0.3); 
		--dot-bg: transparent; 
		background-image: 
			radial-gradient(var(--dot-color) var(--dot-size), var(--dot-bg) var(--dot-size));
		background-size: var(--dot-space) var(--dot-space);
		background-position: center;"
	></div>
	<main class="container relative mx-auto p-4">
		<div class="flex flex-col gap-8">
			{@render children()}
		</div>
	</main>
</div>
