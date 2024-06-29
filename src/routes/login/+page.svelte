<script lang="ts">
	import type { SubmitFunction } from '@sveltejs/kit';

	import AuthButton from '$lib/components/buttons/auth/AuthButton.svelte';
	import ChevronRight from '$lib/components/icons/ChevronRight.svelte';
	import AuthTextInput from '$lib/components/inputs/auth/AuthTextInput.svelte';
	import { applyAction, enhance } from '$app/forms';
	import Alert from '$lib/components/alerts/Alert.svelte';

	type TextInputEvent = Event & {
		currentTarget: EventTarget & HTMLInputElement;
	};

	let { form } = $props();

	let email = $state('');
	let isSubmitting = $state(false);
	let isComplete = $state(false);
	let isError = $state(false);
	let isSuccess = $state(false);
	let errorMessage = $state('');
	let successMessage = $state('');

	const handleLogin: SubmitFunction = async () => {
		isError = false;
		isSuccess = false;
		isSubmitting = true;

		return async ({ result }) => {
			isSubmitting = false;

			if (result.type === 'success' && result.data?.message) {
				isSuccess = true;
				successMessage = result.data?.message;
				isComplete = true;
				email = '';
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
			<h1>Log in or register</h1>
			<p>Enter your email and we will send you a link to log in.</p>
		</header>
		<form method="POST" action="?/login" use:enhance={handleLogin}>
			<div class="fields-container">
				<AuthTextInput
					className="field-email"
					name="email"
					type="email"
					placeholder="Enter your email"
					value={email}
					oninput={(e: TextInputEvent) => (email = e.currentTarget.value)}
					errors={form?.fieldErrors?.email ?? []}
				/>
			</div>
			<AuthButton
				text={isSubmitting ? 'Submitting...' : 'Submit'}
				disabled={isSubmitting}
				type="submit"
				className="auth-form-button"
				withIcon={true}
				Icon={ChevronRight}
			/>
		</form>
		{#if isSuccess}
			<Alert variant="success" message={successMessage} />
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
		max-width: 28rem;
		color: $dark-100;
	}

	header {
		text-align: center;
	}

	h1 {
		@include headline-2xl;
		font-weight: 400;
	}

	p {
		@include text-base;
		margin: 0.75rem auto 0;
		font-weight: 400;
	}

	form {
		margin: 2rem auto;
	}

	:global(.field-email) {
		width: 100%;
	}

	:global(.auth-form-button) {
		margin: 2rem auto 0;
	}
</style>
