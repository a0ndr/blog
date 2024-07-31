import { checkToken } from '$lib/checks.js';
import prisma from '$lib/prisma.js';
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
    const { logged_in, user } = await checkToken(cookies.get(process.env.COOKIE_NAME!), cookies);
    const { id, username, obj } = user;

    const { title, content, published } = await request.json();

    const post = await prisma.post.create({
        data: {
            title,
            content,
            published,
            authorId: id,
        }
    });

    return json(post, { status: 201 });
}