import type { LayoutServerLoad } from './$types';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { redirect } from '@sveltejs/kit';


function instanceOfJwtPayload(object: any): object is jwt.JwtPayload {
    return 'id' in object && 'username' in object;
}

export const load: LayoutServerLoad = async ({ cookies }) => {
	if (!cookies.get(process.env.COOKIE_NAME!)) {
		redirect(302, '/');
	}
	
	const payload = jwt.verify(cookies.get(process.env.COOKIE_NAME!), process.env.TOKEN_SECRET!);
	if (!payload || !instanceOfJwtPayload(payload)) {
		cookies.delete(process.env.COOKIE_NAME!);
		redirect(302, '/');
	}

	return { logged_in: true, user: { id: payload!.id, username: payload!.username } };
};
