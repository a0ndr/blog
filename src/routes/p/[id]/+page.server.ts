// src/routes/+page.server.ts

import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const post = await prisma.post.findFirst({
        where: {
			id: parseInt(params.id)
		}
    });

	if (!post) {
		redirect(301, "/");
	}

	const author = await prisma.user.findFirst({
		where: {
			id: post.authorId!
		}
	});

	return { post, author };
}) satisfies PageServerLoad;
