<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { PUBLIC_HOST } from '$env/static/public';

	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import { debounce } from '$lib/utils/debounce';
	import slugify from 'slugify';
	import { applyAction, enhance } from '$app/forms';
	import Alert from '$lib/components/alerts/Alert.svelte';

	let { form } = $props();

	let url = $state('');
	let site = $state(PUBLIC_HOST);
	let slug = $state('');
	let shortLink = $state('');
	let isSubmitting = $state(false);
	let isComplete = $state(false);
	let isError = $state(false);
	let isSuccess = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');

	type TextInputEvent = Event & {
		currentTarget: EventTarget & HTMLInputElement;
	};

	const debouncedSlugify = debounce((value: string) => {
		slug = slugify(value, {
			lower: true,
			strict: true
		});
	}, 300);

	const handleSlugifyInput = (value: string) => {
		slug = value;
		debouncedSlugify(slug);
	};

	const handleCreateLink: SubmitFunction = async () => {
		isError = false;
		isSuccess = false;
		isSubmitting = true;

		return async ({ result }) => {
			isSubmitting = false;

			if (result.type === 'success' && result.data?.message) {
				isSuccess = true;
				successMessage = result.data?.url;
				shortLink = result.data?.url;
				isComplete = true;
				url = '';
				slug = '';
			}

			if (result.type === 'failure' && result.data?.message) {
				isError = true;
				errorMessage = result.data?.message;
			}

			await applyAction(result);
		};
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
		<form method="POST" action="?/create" use:enhance={handleCreateLink}>
			<div class="fields-container">
				<TextInput
					className="url"
					type="url"
					placeholder="Paste your URL"
					name="url"
					withIcon={true}
					withLabel={false}
					value={url}
					oninput={(e: TextInputEvent) => (url = e.currentTarget.value)}
					errors={form?.fieldErrors?.url}
				/>
				<TextInput
					withLabel={false}
					name="site"
					type="text"
					className="site"
					disabled={true}
					value={site}
				/>
				<span class="slash">/</span>
				<TextInput
					withLabel={false}
					className="slug"
					type="text"
					name="slug"
					placeholder="slug (optional)"
					value={slug}
					oninput={(e: TextInputEvent) => handleSlugifyInput(e.currentTarget.value)}
					errors={form?.fieldErrors?.slug}
				/>
			</div>
			<Button
				text={isSubmitting ? 'Creating...' : 'Shorten Link'}
				disabled={isSubmitting}
				withIcon={true}
				type="submit"
				className="form-button"
			/>
		</form>
		{#if isSuccess}
			<Alert variant="success" message={successMessage} copyText={shortLink} withCopy={true} />
		{/if}
		{#if isError}
			<Alert variant="error" message={errorMessage} />
		{/if}
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
		margin-bottom: 3rem;
	}

	.fields-container {
		display: flex;
		flex-wrap: wrap;
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
		display: flex;
		align-items: center;
		height: 4.5rem;
		color: $dark-100;
		font-weight: 400;
	}

	:global(.form-button) {
		margin: 3rem auto 0;
	}
</style>
