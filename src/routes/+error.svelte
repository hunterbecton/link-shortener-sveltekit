<script lang="ts">
	import { page } from '$app/stores';
</script>

<section>
	<div class="container">
		<header>
			<h1>{$page.status}</h1>
			<p>
				{$page.error?.message}
			</p>
		</header>
	</div>
</section>

<style lang="scss">
	section {
		padding: 10rem 2rem 2rem;
	}

	.container {
		margin: 0 auto;
		max-width: 52rem;
		color: $dark-100;
	}

	header {
		text-align: center;
	}

	h1 {
		@include headline-4xl;
		font-weight: 400;
	}

	p {
		@include headline-base;
		margin: 1.25rem auto 0;
		max-width: 42.875rem;
		font-weight: 400;
	}
</style>
