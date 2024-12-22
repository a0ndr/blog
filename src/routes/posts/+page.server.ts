import prisma from "$lib/prisma";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
    const res = await prisma.post.findMany({
        where: { Published: true },
        include: {
            Category: true,
            Tags: true
        }
    });
    return { posts: res };
}) satisfies PageServerLoad;
