<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';

	import TextInput from '$lib/components/inputs/TextInput.svelte';
	import Button from '$lib/components/buttons/Button.svelte';
	import { invalidateAll } from '$app/navigation';
	import { debounce } from '$lib/utils/debounce';
	import slugify from 'slugify';
	import { applyAction, enhance } from '$app/forms';

	let { form } = $props();

	let url = $state('');
	let site = $state('mtmx.io');
	let slug = $state('');
	let isSubmitting = $state(false);

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
		isSubmitting = true;

		return async ({ result }) => {
			console.log(result);

			isSubmitting = false;

			if (result.type === 'failure' && result.data?.message) {
				console.log(result.data.message);
			}

			if (result.type === 'success') {
				await invalidateAll();
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
					value={form?.rest?.url ?? url}
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
					value={form?.rest?.slug ?? slug}
					oninput={(e: TextInputEvent) => handleSlugifyInput(e.currentTarget.value)}
					errors={form?.fieldErrors?.slug}
				/>
			</div>
			<Button text="Shorten Link" withIcon={true} type="submit" className="form-button" />
		</form>
	</div>
</section>
v

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
