<script lang="ts">
	import { get_share_url } from '$lib/state/timezone.svelte';

	let copied = $state(false);

	const handle_share = async () => {
		const url = get_share_url();

		if (navigator.share) {
			try {
				await navigator.share({
					title: 'Timezoner Configuration',
					text: 'Check out these timezone comparisons',
					url,
				});
				return;
			} catch {
				// Fall back to clipboard if share fails
			}
		}

		// Clipboard fallback
		await navigator.clipboard.writeText(url);
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 2000);
	};
</script>

<button class="btn btn-ghost btn-sm" onclick={handle_share}>
	{#if copied}
		Copied!
	{:else}
		Share
	{/if}
</button>
