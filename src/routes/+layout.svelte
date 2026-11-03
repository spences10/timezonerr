<script lang="ts">
	import Footer from '#lib/components/footer.svelte';
	import {
		PUBLIC_FATHOM_ID,
		PUBLIC_FATHOM_URL,
	} from '$app/env/public';
	import { afterNavigate } from '$app/navigation';
	import * as Fathom from 'fathom-client';
	import { onMount, type Snippet } from 'svelte';
	import '../app.css';

	let { children }: { children: Snippet } = $props();

	onMount(() => {
		Fathom.load(PUBLIC_FATHOM_ID, {
			url: PUBLIC_FATHOM_URL,
		});
	});

	// Track pageview on route change
	afterNavigate(({ shallow }) => {
		if (shallow) return;

		Fathom.trackPageview();
	});
</script>

<div class="relative min-h-screen bg-base-200">
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
