<script lang="ts">
	import GlobeIcon from '$lib/components/icons/GlobeIcon.svelte';

	let { withIcon = false, Icon = GlobeIcon, className = '', ...props } = $props();
</script>

<div class="container {className}">
	{#if withIcon}
		<div class="icon-container">
			<svelte:component this={Icon} className="field-icon" />
		</div>
	{/if}
	<input class="field" class:field-with-icon={withIcon} {...props} />
</div>

<style lang="scss">
	.container {
		position: relative;
	}

	.icon-container {
		display: flex;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		align-items: center;
		padding-left: 2rem;
		pointer-events: none;
	}

	:global(.field-icon) {
		width: 1.5rem;
		height: 1.5rem;
		color: $brand-100;
	}

	.field {
		@include text-lg;
		display: block;
		transition-duration: 150ms;
		transition-property: box-shadow;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: inset 0 0 0 1.5px $dark-100;
		border-width: 0px;
		background-color: $light-100;
		padding: 1.25rem 2rem 1.25rem 2rem;
		width: 100%;
		color: $dark-100;
	}

	.field-with-icon {
		padding: 1.25rem 2rem 1.25rem 4.5rem;
	}

	input::placeholder {
		color: inherit;
	}

	input:focus {
		outline: 2px solid transparent;
		outline-offset: 2px;
		box-shadow: inset 0 0 0 2px $brand-100;
	}
</style>
