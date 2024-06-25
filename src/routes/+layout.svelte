<script lang="ts">
	import '../app.scss';
	let { children } = $props();
	import image from '$lib/assets/stripes.png';
</script>

<main>
	{@render children()}
</main>

<style lang="scss">
	main {
		background:
			url('$lib/assets/stripes.png') repeat,
			$background-gradient-one;
		height: 100%;
	}
</style>
