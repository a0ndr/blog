import { checkToken } from '$lib/checks';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	return await checkToken(cookies.get(process.env.COOKIE_NAME!), cookies)
};
