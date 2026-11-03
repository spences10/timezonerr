<script lang="ts">
	import { Bluesky } from '#lib/icons/index.js';
</script>

<footer class="card mt-auto bg-base-100 p-6 shadow-xl">
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
				class="btn gap-2 btn-ghost btn-sm"
			>
				<Bluesky flutter={true} />
				<span>Follow on Bluesky</span>
			</a>
		</div>
	</div>
</footer>
