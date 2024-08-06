import { addArt, upload } from "$lib/cdn.js";
import { checkToken } from "$lib/checks";
import prisma from "$lib/prisma.js";
import { error, json } from "@sveltejs/kit";
import { fail } from "assert";
import { writeFile } from "fs/promises";

export const actions = {
    default: async ({ request, cookies }) => {
        await checkToken(cookies.get(process.env.COOKIE_NAME!), cookies);

        const formData = Object.fromEntries(await request.formData());
        const { image, caption, artist } = formData as { image: File, caption: string, artist: string };

        const _ = await prisma.art.findFirst({
            where: {
                image: image.name
            }
        });
        if (_) error(400, { message: "Image already exists" });

        await addArt(image, caption, artist);
    
        return {
            success: true
        };
    }
}
