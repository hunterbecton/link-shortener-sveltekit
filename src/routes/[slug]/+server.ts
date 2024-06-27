import { error, redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params, locals: { supabase } }) => {
	const { slug } = params;

	const { data, error: linkError } = await supabase
		.schema('link_shortener_svelte')
		.from('links')
		.select('url')
		.match({ slug })
		.single();

	if (!data) {
		error(404, 'Not found');
	}

	if (linkError) {
		error(500, 'Server error');
	}

	redirect(302, data.url);
};
