import { checkToken } from "$lib/checks";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, cookies }) => {
    await checkToken(cookies.get(process.env.COOKIE_NAME!), cookies);
}
