<script lang="ts">
	import LinkIcon from '$lib/components/icons/LinkIcon.svelte';

	let { text = 'Click me', className = '', withIcon = false, Icon = LinkIcon, ...props } = $props();
</script>

<button class={className} {...props}>
	<span>
		{text}
	</span>
	{#if withIcon}
		<svelte:component this={Icon} class="button-icon" aria-hidden="true" />
	{/if}
</button>

<style lang="scss">
	button {
		@include text-base;
		display: flex;
		column-gap: 0.75rem;
		justify-content: space-between;
		align-items: center;
		transition-duration: 150ms;
		transition-property: background-color;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		cursor: pointer;
		border: 1.5px solid $light-100;
		background-color: $dark-100;
		padding: 0.875rem 1.5rem;
		width: 100%;
		max-width: 20.125rem;
		color: $light-100;

		span {
			overflow: hidden;
			white-space: nowrap;
		}
	}

	button:hover {
		background-color: $dark-80;
	}

	button:focus-visible {
		outline-color: $brand-100;
		outline-style: solid;
		outline-width: 2px;
		outline-offset: 2px;
	}

	:global(.button-icon) {
		width: 1rem;
		height: 1rem;
	}
</style>
