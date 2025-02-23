<script lang="ts">
	import { Bluesky } from '$lib/icons';
</script>

<footer class="card bg-base-100 mt-auto p-6 shadow-xl">
	<div
		class="flex flex-col items-center justify-center gap-4 sm:flex-row sm:justify-between"
	>
		<p class="text-base-content/70">
			Built by <a
				href="https://scottspence.com"
				target="_blank"
				rel="noopener noreferrer"
				class="link link-primary">Scott Spence</a
			>
		</p>
		<div class="flex items-center gap-4">
			<a
				href="https://bsky.app/profile/scottspence.dev"
				target="_blank"
				rel="noopener noreferrer"
				class="btn btn-ghost btn-sm gap-2"
			>
				<Bluesky flutter={true} />
				<span>Follow on Bluesky</span>
			</a>
		</div>
	</div>
</footer>
