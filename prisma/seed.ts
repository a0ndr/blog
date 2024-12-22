import { PrismaClient } from '@prisma/client';
import PostData from './data.json' assert { type: 'json' };

const prisma = new PrismaClient();

async function main() {
	console.log(`Start seeding ...`);

	for (const p of PostData) {
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
					create: p.Tags.map((t) => ({
						Name: t
					}))
				},
				Published: p.Published
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
