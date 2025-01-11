<script lang="ts">
	import { browser } from '$app/environment';
	import {
		get_current_times,
		remove_timezone,
	} from '$lib/state/timezone.svelte';
	import { onMount } from 'svelte';

	let mounted = $state(false);

	onMount(() => {
		mounted = true;
	});
</script>

<div
	class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
>
	{#if browser && mounted}
		{#each get_current_times() as { city, timezone, time, date }}
			<div class="group card bg-base-100 shadow-sm">
				<div class="card-body p-4">
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button
						class="btn btn-ghost btn-xs absolute right-0 top-0 opacity-0 transition-opacity group-hover:opacity-100"
						onclick={() => remove_timezone(timezone)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-4 w-4"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
					<div class="flex flex-col gap-1">
						<div class="flex items-center justify-between">
							<h2 class="text-lg font-semibold">{city}</h2>
							<div class="font-mono text-xl">{time}</div>
						</div>
						<div
							class="flex items-center justify-between text-sm text-base-content/70"
						>
							<div>{timezone}</div>
							<div>{date}</div>
						</div>
					</div>
				</div>
			</div>
		{/each}
	{:else}
		<div class="card bg-base-100 shadow-sm">
			<div class="card-body p-4">
				<div class="flex flex-col gap-1">
					<div class="flex items-center justify-between">
						<div class="skeleton h-6 w-24"></div>
						<div class="skeleton h-7 w-16"></div>
					</div>
					<div class="flex items-center justify-between">
						<div class="skeleton h-4 w-20"></div>
						<div class="skeleton h-4 w-12"></div>
					</div>
				</div>
			</div>
		</div>
	{/if}
</div>
