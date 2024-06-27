<script lang="ts">
	import LinkIcon from '$lib/components/icons/LinkIcon.svelte';

	let {
		text = 'Click me',
		variant = 'dark',
		className = '',
		withIcon = false,
		Icon = LinkIcon,
		...props
	} = $props();
</script>

<button class="button {className}" class:button_dark={variant === 'dark'} {...props}>
	<span class="button-text">
		{text}
	</span>
	{#if withIcon}
		<svelte:component this={Icon} class="button-icon" aria-hidden="true" />
	{/if}
</button>

<style lang="scss">
	.button {
		@include text-xl;
		display: inline-flex;
		column-gap: 1rem;
		justify-content: space-between;
		align-items: center;
		transition-duration: 150ms;
		transition-property: background-color;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		cursor: pointer;
		border: 1.5px solid $light-100;
		padding: 1.25rem 2rem;
		width: 100%;
		max-width: 20.125rem;
	}

	.button:focus-visible {
		outline-color: $brand-100;
		outline-style: solid;
		outline-width: 2px;
		outline-offset: 2px;
	}

	.button_dark {
		background-color: $dark-100;
		color: $light-100;
	}

	.button_dark:hover {
		background-color: $dark-80;
	}

	.button-text {
		overflow: hidden;
		// text-overflow: ellipsis;
		white-space: nowrap;
	}

	:global(.button-icon) {
		width: 1.5rem;
		height: 1.5rem;
	}
</style>
