import { fail } from '@sveltejs/kit';
import { PUBLIC_HOST } from '$env/static/public';
import { z } from 'zod';

const loginSchema = z.object({
	email: z
		.string()
		.min(1, { message: 'Email is required' })
		.email({ message: 'Email is not valid' })
});

export const actions = {
	login: async ({ request, locals: { supabase } }) => {
		const formData = Object.fromEntries(await request.formData());

		const { ...rest } = formData;

		const validationResult = loginSchema.safeParse(formData);

		if (!validationResult.success) {
			const { fieldErrors } = validationResult.error.flatten();

			return fail(400, {
				rest,
				fieldErrors
			});
		}

		const { email } = validationResult.data;

		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: `${PUBLIC_HOST}/auth/callback`
			}
		});

		if (error) {
			return fail(400, {
				rest,
				message: error.message
			});
		}

		return {
			message: 'Success! Check your email to complete log in.'
		};
	}
};
