import { PUBLIC_ORIGIN } from '$env/static/public';
import { fail, redirect } from '@sveltejs/kit';
import { z } from 'zod';
import slugify from 'slugify';

import type { PageServerLoad } from './$types';

const linkSchema = z.object({
	url: z.string().min(1, { message: 'URL is required' }).url({ message: 'URL is not valid' }),
	slug: z
		.string()
		.min(1, { message: 'Slug is required' })
		.refine(
			(value) =>
				slugify(value, {
					lower: true,
					strict: true
				}) === value,
			{
				message: 'Slug is not formatted correctly'
			}
		)
});

export const load: PageServerLoad = async ({ locals: { safeGetSession } }) => {
	const { session } = await safeGetSession();

	if (!session) {
		redirect(303, '/login');
	}

	return { session };
};

export const actions = {
	create: async ({ request, locals: { safeGetSession, supabase } }) => {
		const formData = Object.fromEntries(await request.formData());

		const { ...rest } = formData;

		const validationResult = linkSchema.safeParse(formData);

		if (!validationResult.success) {
			const { fieldErrors } = validationResult.error.flatten();

			return fail(400, {
				rest,
				fieldErrors
			});
		}

		const { url, slug } = validationResult.data;

		const { session } = await safeGetSession();

		if (!session) {
			redirect(303, '/login');
		}

		const { data, error } = await supabase
			.schema('link_shortener_svelte')
			.from('links')
			.insert({
				url,
				slug,
				user: session.user.id
			})
			.select('slug')
			.single();

		if (error) {
			if (error.code === '23505') {
				return fail(400, {
					rest,
					message: 'This slug is already in use.'
				});
			}

			return fail(400, {
				rest,
				message: error.message
			});
		}

		return { url: `${PUBLIC_ORIGIN}/${data.slug}`, message: 'Success! Copy your new URL above.' };
	}
};
