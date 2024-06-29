<script lang="ts">
	import GlobeIcon from '$lib/components/icons/GlobeIcon.svelte';

	let {
		name = 'email',
		withIcon = false,
		hideLabel = false,
		Icon = GlobeIcon,
		className = '',
		errors = [] as string[],
		...props
	} = $props();
</script>

<div class={className}>
	<label for={name}>Email</label>
	<div class="field-container">
		{#if withIcon}
			<div class="icon-container">
				<svelte:component this={Icon} className="field-icon" />
			</div>
		{/if}
		<input {name} class:field-with-icon={withIcon} {...props} />
	</div>
	{#if errors && errors.length > 0}
		<p class="field-error">{errors[0]}</p>
	{/if}
</div>

<style lang="scss">
	label {
		@include sr-only;
	}

	.field-container {
		position: relative;
	}

	.icon-container {
		display: flex;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		align-items: center;
		padding-left: 1.75rem;
		pointer-events: none;

		@include sm {
			padding-left: 2rem;
		}
	}

	:global(.field-icon) {
		width: 1.25rem;
		height: 1.25rem;
		color: $brand-100;

		@include sm {
			width: 1.5rem;
			height: 1.5rem;
		}
	}

	input {
		@include text-base;
		display: block;
		transition-duration: 150ms;
		transition-property: box-shadow;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: inset 0 0 0 1.5px $dark-100;
		border-width: 0px;
		background-color: $light-100;
		padding: 1rem 1.75rem 1rem 1.75rem;
		width: 100%;
		color: $dark-100;

		@include sm {
			@include text-lg;
			padding: 1.25rem 2rem 1.25rem 2rem;
		}
	}

	input::placeholder {
		color: inherit;
	}

	input:focus {
		outline: 2px solid transparent;
		outline-offset: 2px;
		box-shadow: inset 0 0 0 2px $brand-100;
	}

	.field-with-icon {
		padding: 1rem 1.75rem 1rem 3.75rem;

		@include sm {
			padding: 1.25rem 2rem 1.25rem 4.5rem;
		}
	}

	.field-error {
		@include text-base;
		margin-top: 0.625rem;
		color: $error-100;
	}
</style>
