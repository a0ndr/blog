// prisma/seed.ts

import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
	console.log(`Start seeding ...`);

	await prisma.user.create({
		data: {
			username: 'admin',
			password_hash: await argon2.hash('P@ssw0rd!123', {
				secret: Buffer.from(process.env.PASSWORD_SECRET)
			}),
			id: 1
		}
	});

	await prisma.text.create({
		data: {
			id: 'HOME_INTRO',
			content: 'It works!! Yippie!'
		}
	});
	await prisma.text.create({
		data: {
			id: 'ABOUT_US',
			content: 'text go here'
		}
	});

	await prisma.config.create({
		data: {
			key: 'ABOUT_TEXT_ALIGNMENT',
			value: 'center'
		}
	});

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
