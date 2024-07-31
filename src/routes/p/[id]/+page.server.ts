// src/routes/+page.server.ts

import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const post = await prisma.post.findFirst({
        where: {
			id: parseInt(params.id),
			published: true
		}
    });

	if (!post) {
		redirect(301, "/");
	}

	await prisma.post.update({
		where: {
			id: parseInt(params.id)
		},
		data: {
			views: ++post.views
		}
	});

	const author = await prisma.user.findFirst({
		where: {
			id: post.authorId!
		}
	});

	return { post, author };
}) satisfies PageServerLoad;
