import { checkToken } from '$lib/checks';
import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
	const { logged_in, user } = await checkToken(cookies.get(process.env.COOKIE_NAME!), cookies);

	const { content } = await request.json();

	await prisma.note.create({
		data: {
			content,
            authorId: user.id
		},
	});

	return json({ success: true });
}

export async function PATCH({ request, cookies }) {
	await checkToken(cookies.get(process.env.COOKIE_NAME!), cookies);

	const { id, content } = await request.json();

	await prisma.note.update({
		data: {
			content
		},
		where: {
			id
		}
	});

	return json({ success: true });
}

export async function DELETE({ request, cookies }) {
	await checkToken(cookies.get(process.env.COOKIE_NAME!), cookies);

	const { id } = await request.json();

	await prisma.note.delete({
		where: {
			id
		}
	});

	return json({ success: true });
}
