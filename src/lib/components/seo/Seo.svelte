<script lang="ts">
	const {
		title = 'The best link shortener',
		description = 'Simply paste your link, choose a custom slug, and share. Perfect for making your URLs short and memorable.',
		keywords = 'link shortener',
		index = true
	} = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	{#if index}
		<meta name="robots" content="index, follow" />
	{:else}
		<meta name="robots" content="noindex, nofollow" />
	{/if}
</svelte:head>
