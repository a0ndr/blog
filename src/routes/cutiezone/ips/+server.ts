import { checkToken } from "$lib/checks";
import prisma from "$lib/prisma";
import { json } from "@sveltejs/kit";

export async function PATCH({ request, cookies }) {
    const { logged_in, user } = await checkToken(cookies.get(process.env.COOKIE_NAME!), cookies);
    const { username, obj } = user;

    const { ip } = await request.json();

    const _ip = await prisma.ip.findFirst({
        where: { ip }
    });
    const __ip = await prisma.ip.update({
        data: {
            blocked: !_ip!.blocked
        },
        where: {
            ip
        }
    });

    return json(__ip, { status: 200 });
}
