import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
	const post = await prisma.post.findFirst({
		where: { Slug: params.slug },
		include: {
			Category: true,
			Tags: true
		}
	});
	return { post };
}) satisfies PageServerLoad;
