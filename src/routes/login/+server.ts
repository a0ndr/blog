import { json } from '@sveltejs/kit';
import * as argon2 from 'argon2';
import 'dotenv/config';
import prisma from '$lib/prisma';
import jwt from 'jsonwebtoken';
import { checkToken } from '$lib/checks';

export async function POST({ request, cookies }) {
	const { username, password } = await request.json();

	// const hash = await argon2.hash(Buffer.from(password), {
	// 	secret: Buffer.from(process.env.PASSWORD_SECRET!)
	// });

	const target = await prisma.user.findFirst({ where: { username } });
	if (
		!target ||
		!(await argon2.verify(target.password_hash, password, {
			secret: Buffer.from(process.env.PASSWORD_SECRET!)
		}))
	) {
		return new Response(null, { status: 401 });
	} else {
		cookies.set(
			process.env.COOKIE_NAME!,
			jwt.sign({ id: target.id, username: target.username }, process.env.TOKEN_SECRET!),
			{ secure: process.env.IS_HTTPS === 'true' ? true : false, sameSite: true, path: '/' }
		);
		return json({ success: true });
	}
}

export async function PATCH({ request, cookies }) {
	const { logged_in, user } = await checkToken(cookies.get(process.env.COOKIE_NAME!), cookies);

	const { password } = await request.json();

	await prisma.user.update({
		data: {
			password_hash: await argon2.hash(password, {
				secret: Buffer.from(process.env.PASSWORD_SECRET!)
			})
		},
		where: {
			id: user.id
		}
	});

	return json({ success: true });
}

export async function DELETE({ cookies }) {
	cookies.delete(process.env.COOKIE_NAME!, { path: '/' });
	return json({ success: true });
}
