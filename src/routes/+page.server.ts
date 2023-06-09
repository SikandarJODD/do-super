import type { Actions, PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms/server';
import { z } from 'zod';
import { postsData } from '../store';
// Schema of Form : Insert Data
// Server Side Validation used Required : It mandatory to Input the Values while SSV
const schema = z.object({
	title: z.string(),
	content: z.string()
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(schema);
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, schema);
		console.log(form.data, 'Data');
	
		return { form };
	}
};
