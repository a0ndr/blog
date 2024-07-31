import { redirect, type Cookies } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import prisma from './prisma';

function instanceOfJwtPayload(object: any): object is jwt.JwtPayload {
	return 'id' in object && 'username' in object;
}

export async function checkToken(token: string | undefined | null, cookies: Cookies) {
	if (!token) {
		redirect(302, '/');
	}

	const payload = jwt.verify(token, process.env.TOKEN_SECRET!);
	if (!payload || !instanceOfJwtPayload(payload)) {
		cookies.delete(process.env.COOKIE_NAME!, { path: '/' });
		redirect(302, '/');
	}

	return {
		logged_in: true,
		user: {
			id: payload!.id,
			username: payload!.username,
			obj: await prisma.user.findFirst({ where: { id: payload.id } })
		}
	};
}
