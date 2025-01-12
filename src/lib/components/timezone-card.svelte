<script lang="ts">
	import { Cross } from '$lib/icons';
	import {
		get_current_times,
		remove_timezone,
	} from '$lib/state/timezone.svelte';
</script>

<div
	class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
>
	{#each get_current_times() as { city, timezone, time, date }}
		<div class="group card bg-base-100 shadow-xl">
			<div class="card-body p-4">
				<!-- svelte-ignore a11y_consider_explicit_label -->
				<button
					class="btn btn-ghost btn-xs absolute right-0 top-0 text-warning opacity-0 transition-opacity group-hover:opacity-70"
					onclick={() => remove_timezone(timezone)}
				>
					<Cross class_names="h-4 w-4" />
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
</div>
