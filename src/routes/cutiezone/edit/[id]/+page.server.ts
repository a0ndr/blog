import { checkToken } from "$lib/checks";
import prisma from "$lib/prisma";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, cookies }) => {
    await checkToken(cookies.get(process.env.COOKIE_NAME!), cookies);

    const post = await prisma.post.findFirst({
        where: {
            id: parseInt(params.id)
        }
    });

    if(!post) {
        throw error(404, "Post not found");
    }

    return {...post};
}