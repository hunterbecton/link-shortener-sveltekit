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

	// const { data: profile } = await supabase
	// 	.from('profiles')
	// 	.select(`username, full_name, website, avatar_url`)
	// 	.eq('id', session.user.id)
	// 	.single();

	return { session };
};

export const actions = {
	create: async ({ request, locals: { safeGetSession } }) => {
		const formData = Object.fromEntries(await request.formData());

		const { ...rest } = formData;

		console.log(formData);

		const validationResult = linkSchema.safeParse(formData);

		if (!validationResult.success) {
			const { fieldErrors } = validationResult.error.flatten();

			return fail(400, {
				rest,
				fieldErrors
			});
		}

		const { session } = await safeGetSession();

		return { message: 'Link created successfully!' };

		return fail(500, {
			rest,
			message: 'There was an issue creating the link.'
		});
	}
};
