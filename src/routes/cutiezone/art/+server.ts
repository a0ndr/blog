import { deleteFile } from "$lib/cdn.js";
import { checkToken } from "$lib/checks";
import prisma from "$lib/prisma";
import { json } from "@sveltejs/kit";
import { rename } from "fs/promises";

export async function PATCH({ request, cookies }) {
    await checkToken(cookies.get(process.env.COOKIE_NAME!), cookies);

    const data = await request.json();
    const id = data.id;

    if ("caption" in data) {
        await prisma.art.update({
            data: {
                caption: data.caption
            },
            where: {
                id
            }
        });
    } else if ("artist" in data) {
        await prisma.art.update({
            data: {
                artist: data.artist
            },
            where: {
                id
            }
        });
    } else if ("visible" in data) {
        await prisma.art.update({
            data: {
                visible: data.visible
            },
            where: {
                id
            }
        });
    }

    return json({ success: true });
}

export async function DELETE({ request, cookies }) {
    await checkToken(cookies.get(process.env.COOKIE_NAME!), cookies);

    const { id } = await request.json();

    await prisma.art.delete({
        where: { id }
    });
    await deleteFile(id);

    return json({ success: true });
}
