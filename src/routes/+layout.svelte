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

<div class="min-h-screen bg-base-200">
	<main class="container mx-auto p-4">
		<div class="flex flex-col gap-8">
			{@render children()}
		</div>
	</main>
</div>
