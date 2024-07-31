import { checkToken } from '$lib/checks';
import prisma from '$lib/prisma.js';
import * as argon2 from 'argon2';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const { logged_in, user } = await checkToken(cookies.get(process.env.COOKIE_NAME!), cookies);

	const { username, password } = await request.json();

	const newUser = await prisma.user.create({
		data: {
			username,
			password_hash: await argon2.hash(password, { secret: Buffer.from(process.env.PASSWORD_SECRET!) })
		}
	});

    return json(newUser);
}

export async function DELETE({ request, cookies }) {
	const { logged_in, user } = await checkToken(cookies.get(process.env.COOKIE_NAME!), cookies);

	const { id } = await request.json();

	const oldUser = await prisma.user.delete({
		where: {
            id
        }
	});

    return json(oldUser);
}

