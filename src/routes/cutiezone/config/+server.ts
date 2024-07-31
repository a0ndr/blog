import { checkToken } from "$lib/checks";
import prisma from "$lib/prisma";
import { json } from "@sveltejs/kit";

export async function PATCH({ request, cookies }) {
    const { logged_in, user } = await checkToken(cookies.get(process.env.COOKIE_NAME!), cookies);
    const { username, obj } = user;

    const { key, value } = await request.json();

    const config = await prisma.config.update({
        data: {
            value
        },
        where: {
            key
        }
    });

    return json(config, { status: 200 });
}
