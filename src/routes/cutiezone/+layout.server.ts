import { checkToken } from '$lib/checks';
import prisma from '$lib/prisma';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
	const notes = await prisma.note.findMany({ orderBy: { createdAt: 'desc' } });
	const users = await prisma.user.findMany();
	const ips = await prisma.ip.findMany({
		orderBy: [
			{
				requests: 'desc'
			}
		]
	});
	const posts = await prisma.post.findMany({
		orderBy: [
			{
				createdAt: 'desc'
			}
		],
	});
	const violations = await prisma.violations.findMany();

	return { notes, ...(await checkToken(cookies.get(process.env.COOKIE_NAME!), cookies)), users, ips, posts, violations };
};
