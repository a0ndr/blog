import { PrismaClient } from '@prisma/client';
import PostData from './data.json' assert { type: 'json' };

const prisma = new PrismaClient();

async function main() {
	console.log(`Start seeding ...`);

	for (const p of PostData) {
		const tagIds: number[] = [];
		for (const t of p.Tags) {
			const existing = await prisma.tag.findFirst({ where: { Name: t }});
			if (existing) {
				tagIds.push(existing.Id);
				continue;
			}

			const created = await prisma.tag.create({ data: { Name: t }});
            tagIds.push(created.Id);
		}

		const post = await prisma.post.create({
			data: {
				Title: p.Title,
				Content: p.Content,
                Slug: p.Slug,
                Image: p.Image,
				Category: {
					create: {
						Name: p.Category
					}
				},
				Tags: {
					connect: tagIds.map(id => ({ Id: id }))
				},
				Published: p.Published,
				Featured: p.Featured
			}
		});
		console.log(`Created post with id: ${post.Id}`);
	}
	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
