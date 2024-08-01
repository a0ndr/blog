// src/routes/+page.server.ts

import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';
import 'dotenv/config';

export const load = (async () => {
	const texts = await prisma.text.findMany();
	const posts = await prisma.post.findMany({
		orderBy: [
			{
				createdAt: 'desc'
			}
		],
	});
	const latestPosts = await prisma.post.findMany({
		where: {
			published: true
		},
		orderBy: [
			{
				createdAt: 'desc'
			}
		],
	});
	const users = await prisma.user.findMany();
	const config = await prisma.config.findMany();

	return { texts, posts, users, config, latestPosts };
}) satisfies PageServerLoad;
