<!-- Wrapper Component (e.g., TextInputWrapper.svelte) -->
<script lang="ts">
	import type { Snippet } from 'svelte';

	type TextInputWrapperProps = {
		children: Snippet;
		errors?: string[];
	};

	let { children, errors = [], ...props }: TextInputWrapperProps = $props();
</script>

<div class="text-input-wrapper">
	{@render children()}
	<div class="error-space">
		{#if errors && errors.length > 0}
			<span class="field-error">{errors[0]}</span>
		{/if}
	</div>
</div>

<style lang="scss">
	.text-input-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.error-space {
		display: flex;
		justify-content: center;
		height: 20px; /* Adjust based on your design */
	}
	.field-error {
		color: red; /* Your error styling */
	}
</style>
