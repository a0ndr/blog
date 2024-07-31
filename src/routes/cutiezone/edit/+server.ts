import { checkToken } from '$lib/checks.js';
import prisma from '$lib/prisma.js';
import { json } from '@sveltejs/kit';

export async function PATCH({ request, cookies }) {
    const { logged_in, user } = await checkToken(cookies.get(process.env.COOKIE_NAME!), cookies);
    const { username, obj } = user;

    const { id, title, content, published } = await request.json();

    const post = await prisma.post.update({
        data: {
            title,
            content,
            published
        },
        where: {
            id
        }
    });

    return json(post, { status: 200 });
}

export async function DELETE({ request, cookies }) {
    const _ = await checkToken(cookies.get(process.env.COOKIE_NAME!), cookies);
    const { id } = await request.json();

    const post = await prisma.post.delete({
        where: {
            id
        }
    })

    return json(post, { status: 200 });
}
