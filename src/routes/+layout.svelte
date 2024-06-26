<script lang="ts">
	import '../app.scss';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

	export let data;

	let { supabase, session } = data;
	$: ({ supabase, session } = data);

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<main>
	<slot />
</main>

<!-- <script lang="ts">
	import { invalidate } from '$app/navigation';
	import '../app.scss';
	let { children, data } = $props();

	let { supabase, session } = data;

	const { supabase, session } = $derived(data);

	$effect(() => {
		const { data } = supabase.auth.onAuthStateChange((event, _session) => {
			if (_session?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<main>
	{@render children()}
</main> -->

<style lang="scss">
	main {
		background:
			url('$lib/assets/stripes.png') repeat,
			$background-gradient-one;
		height: 100%;
	}
</style>
