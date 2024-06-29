<script lang="ts">
	let { name = 'email', className = '', errors = [] as string[], ...props } = $props();
</script>

<div class={className}>
	<label for={name}>Email</label>
	<div class="field-container">
		<input {name} {...props} />
	</div>
	{#if errors && errors.length > 0}
		<p class="field-error">{errors[0]}</p>
	{/if}
</div>

<style lang="scss">
	label {
		@include text-sm;
		display: block;
		margin-bottom: 0.5rem;
		color: $dark-100;
		font-weight: 400;
	}

	.field-container {
		position: relative;
	}

	input {
		@include text-sm;
		display: block;
		transition-duration: 150ms;
		transition-property: box-shadow;
		transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: inset 0 0 0 1.5px $dark-100;
		border-width: 0px;
		background-color: $light-100;
		padding: 0.875rem 1.5rem 0.875rem 1.5rem;
		width: 100%;
		color: $dark-100;
	}

	input::placeholder {
		color: inherit;
	}

	input:focus {
		outline: 2px solid transparent;
		outline-offset: 2px;
		box-shadow: inset 0 0 0 2px $brand-100;
	}

	.field-error {
		@include text-xs;
		margin-top: 0.375rem;
		color: $error-100;
	}
</style>
