<script lang="ts">
	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import slugify from 'slugify';

	let timer = $state(0);
	let url = $state('');
	let site = $state('mtmx.io');
	let slug = $state('');

	type TextInputEvent = Event & {
		currentTarget: EventTarget & HTMLInputElement;
	};

	const slugifyDebounce = (value: string) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			slug = slugify(value, {
				lower: true,
				trim: true,
				remove: /[^a-zA-Z0-9 -]/g // Regular expression to match any non-alphanumeric character
			});
		}, 300);
	};
</script>

<section>
	<div class="container">
		<header>
			<h1>The best <span>link shortener</span></h1>
			<p>
				Simply paste your link, choose a custom slug, and share. Perfect for making your URLs short
				and memorable.
			</p>
		</header>
		<form>
			<div class="fields-container">
				<TextInput
					className="url"
					placeholder="Paste your URL"
					withIcon={true}
					value={url}
					oninput={(e: TextInputEvent) => (url = e.currentTarget.value)}
				/>
				<TextInput className="site" placeholder="mtmx.io" disabled={true} value={site} />
				<span class="slash">/</span>

				<TextInput
					className="slug"
					placeholder="slug (optional)"
					value={slug}
					oninput={(e: TextInputEvent) => slugifyDebounce(e.currentTarget.value)}
				/>
			</div>
			<Button
				text="Shorten Link"
				withIcon={true}
				type="button"
				className="form-button"
				onclick={() => console.log('Hello')}
			/>
		</form>
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

	h1 span {
		color: $brand-100;
	}

	p {
		@include headline-base;
		margin: 1.25rem auto 0;
		max-width: 42.875rem;
		font-weight: 400;
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.fields-container {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1.25rem 1.5rem;
		margin-top: 3rem;
	}

	:global(.url) {
		flex: 0 1 auto;
		width: 100%;
	}

	:global(.site),
	:global(.slug) {
		flex: 1 1 0%;
		width: 100%;
	}

	.slash {
		@include headline-lg;
		color: $dark-100;
		font-weight: 400;
	}

	:global(.form-button) {
		margin: 3rem auto 0;
	}
</style>
