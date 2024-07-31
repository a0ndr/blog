import { checkToken } from "$lib/checks";
import prisma from "$lib/prisma";
import { json } from "@sveltejs/kit";

export async function PATCH({ request, cookies }) {
	const { logged_in, user } = await checkToken(cookies.get(process.env.COOKIE_NAME!), cookies);

	const { id, content } = await request.json();

	await prisma.text.update({
		data: {
			content
		},
		where: {
			id
		}
	});

	return json({ success: true });
}