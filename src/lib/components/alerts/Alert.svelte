<script lang="ts">
	import CopyIcon from '$lib/components/icons/CopyIcon.svelte';

	let {
		variant = 'success',
		className = '',
		message = 'Success! Copy your new URL above.',
		copyText = '',
		withCopy = false
	} = $props();

	const copyToClipboard = async (value: string) => {
		try {
			await navigator.clipboard.writeText(value);
			message = 'Copied to clipboard!';
		} catch (err) {
			console.error('Failed to copy: ', err);
		} finally {
			setTimeout(() => {
				message = copyText;
			}, 2000); // Reset success message to link after 2 seconds
		}
	};
</script>

<div
	class="alert {className}"
	class:alert_success={variant === 'success'}
	class:alert_error={variant === 'error'}
>
	<span class="alert-text">{message}</span>
	{#if withCopy}
		<button onclick={() => copyToClipboard(copyText)} class="alert-button" type="button">
			<CopyIcon className="alert-icon" />
		</button>
	{/if}
</div>

<style lang="scss">
	.alert {
		@include text-lg;
		display: flex;
		column-gap: 0.625rem;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto;
		padding: 0.625rem 1.25rem;
		width: 100%;
		max-width: 44.1875rem;
	}

	.alert_success {
		background-color: $success-20;
		color: $success-100;
	}

	.alert_error {
		background-color: $error-20;
		color: $error-100;
	}

	.alert-text {
		flex: 1 1 0%;
	}

	.alert-button {
		flex: none;
		cursor: pointer;
		border: none;
		background-color: transparent;
		padding: 0;
		width: 1.25rem;
		height: 1.25rem;
	}

	.alert-button:focus-visible {
		outline-color: $success-100;
		outline-style: solid;
		outline-width: 2px;
		outline-offset: 2px;
	}

	:global(.alert-icon) {
		width: 100%;
		height: 100%;
		color: $success-100;
	}
</style>
