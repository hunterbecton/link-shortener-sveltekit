export const slugify = (text: string) => {
	return text
		.trim() // Trim leading and trailing spaces
		.toLowerCase() // Convert to lowercase
		.replace(/\s+/g, '-') // Replace spaces with -
		.replace(/[^a-z0-9-]/g, '') // Remove all non-word chars
		.replace(/-+/g, '-'); // Replace multiple - with single -
};
