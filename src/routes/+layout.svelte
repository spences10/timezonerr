<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div class="min-h-screen bg-base-200">
	<main class="container mx-auto p-4">
		<div class="flex flex-col gap-8">
			{@render children()}
		</div>
	</main>
</div>
