<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';
	import { PUBLIC_ORIGIN } from '$env/static/public';

	import HomeTextInput from '$lib/components/inputs/home/HomeTextInput.svelte';
	import HomeButton from '$lib/components/buttons/home/HomeButton.svelte';
	import { debounce } from '$lib/utils/debounce';
	import slugify from 'slugify';
	import { applyAction, enhance } from '$app/forms';
	import Alert from '$lib/components/alerts/Alert.svelte';

	let { form } = $props();

	let url = $state('');
	let site = $state(PUBLIC_ORIGIN);
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
				Simply paste your link, choose a custom slug, and share. <span class="header-break"
					>Perfect for making your URLs short and memorable.</span
				>
			</p>
		</header>
		<form method="POST" action="?/create" use:enhance={handleCreateLink}>
			<div class="fields-container">
				<HomeTextInput
					className="field-url"
					type="url"
					placeholder="Paste your URL"
					name="url"
					withIcon={true}
					withLabel={false}
					value={url}
					oninput={(e: TextInputEvent) => (url = e.currentTarget.value)}
					errors={form?.fieldErrors?.url ?? []}
				/>
				<HomeTextInput
					withLabel={false}
					name="site"
					type="text"
					className="field-site"
					disabled={true}
					value={site}
				/>
				<span class="field-slash">/</span>
				<HomeTextInput
					withLabel={false}
					className="field-slug"
					type="text"
					name="slug"
					placeholder="slug (optional)"
					value={slug}
					oninput={(e: TextInputEvent) => handleSlugifyInput(e.currentTarget.value)}
					errors={form?.fieldErrors?.slug ?? []}
				/>
			</div>
			<HomeButton
				text={isSubmitting ? 'Creating...' : 'Shorten Link'}
				disabled={isSubmitting}
				withIcon={true}
				type="submit"
				className="link-form-button"
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
		padding: 6rem 1rem 1rem;

		@include sm {
			padding: 10rem 2rem 2rem;
		}
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
		@include headline-2xl;
		font-weight: 400;

		@include md {
			@include headline-3xl;
		}

		@include lg {
			@include headline-4xl;
		}

		span {
			display: block;
			color: $brand-100;

			@include sm {
				display: inline;
			}
		}
	}

	.header-break {
		display: none;

		@include sm {
			display: inline;
		}
	}

	p {
		@include text-base;
		margin: 0.75rem auto 0;
		max-width: 42.875rem;
		font-weight: 400;

		@include md {
			@include text-lg;
			margin: 1rem auto 0;
		}

		@include lg {
			@include headline-base;
			margin: 1.25rem auto 0;
		}
	}

	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 2rem auto;
		max-width: 44.1875rem;

		@include md {
			margin: 3rem auto;
		}
	}

	.fields-container {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem 1.25rem;

		@include md {
			gap: 1.25rem 1.5rem;
		}
	}

	:global(.field-url) {
		flex: 0 1 auto;
		width: 100%;
	}

	:global(.field-site),
	:global(.field-slug) {
		flex: 0 1 auto;
		width: 100%;

		@include sm {
			flex: 1 1 0%;
		}
	}

	.field-slash {
		@include headline-lg;
		display: none;
		align-items: center;
		height: 4.5rem;
		color: $dark-100;
		font-weight: 400;

		@include sm {
			display: flex;
		}
	}

	:global(.link-form-button) {
		margin: 2rem auto 0;

		@include sm {
			margin: 3rem auto 0;
		}
	}
</style>
