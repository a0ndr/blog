import { json } from '@sveltejs/kit';
import * as argon2 from 'argon2';
import 'dotenv/config';
import prisma from '$lib/prisma';
import jwt from 'jsonwebtoken';
import { checkToken } from '$lib/checks';
import { report } from '$lib/aipdb.js';
import { ReportCategory } from 'abuseipdb-client';

function addHrs(d: Date, h: number) {
	d.setTime(d.getTime() + h * 60 * 60 * 1000);
	return d;
}

export async function POST({ request, cookies, getClientAddress }) {
	const { username, password } = (await request.json()) as { username: string; password: string };

	// const hash = await argon2.hash(Buffer.from(password), {
	// 	secret: Buffer.from(process.env.PASSWORD_SECRET!)
	// });

	const forbiddenSymbols = /[\'\"\`\;]/;
	if (forbiddenSymbols.test(username) || forbiddenSymbols.test(password)) {
		const ip = request.headers.get('X-Real-Ip') ?? getClientAddress();
		await report(
			ip,
			[ReportCategory.Hacking, ReportCategory.SQLInjection, ReportCategory.WebAppAttack],
			'Automated report: Attempted SQL injection'
		);

		if (
			!(await prisma.violations.findFirst({
				where: { ip, type: 'sql' },
				orderBy: { id: 'desc' }
			})) ||
			new Date().getTime() >
				(
					await prisma.violations.findFirst({
						where: { ip, type: 'sql' },
						orderBy: { id: 'desc' }
					})
				)?.expires.getTime()!
		) {
			const cur = new Date();
			await prisma.violations.create({
				data: {
					ip,
					expires: addHrs(cur, 1),
					type: 'sql',
					count: 1
				}
			});
		} else {
			const cur = new Date();
			const old = await prisma.violations.findFirst({
				where: { ip, type: 'sql' },
				orderBy: { id: 'desc' }
			});
			await prisma.violations.update({
				data: {
					expires: addHrs(cur, 1),
					count: old!.count + 1
				},
				where: {
					id: old!.id
				}
			});

			if (old!.count + 1 === 3) {
				await prisma.ip.update({
					data: {
						blocked: true
					},
					where: {
						ip
					}
				});
			}
		}

		return new Response(null, { status: 401 });
	}

	const target = await prisma.user.findFirst({ where: { username } });
	if (
		!target ||
		!(await argon2.verify(target.password_hash, password, {
			secret: Buffer.from(process.env.PASSWORD_SECRET!)
		}))
	) {
		const ip = request.headers.get('X-Real-Ip') ?? getClientAddress();
		if (
			!(await prisma.violations.findFirst({
				where: { ip, type: 'bruteforce' },
				orderBy: { id: 'desc' }
			})) ||
			new Date().getTime() >
				(
					await prisma.violations.findFirst({
						where: { ip, type: 'bruteforce' },
						orderBy: { id: 'desc' }
					})
				)?.expires.getTime()!
		) {
			const cur = new Date();
			await prisma.violations.create({
				data: {
					ip,
					expires: addHrs(cur, 1),
					type: 'bruteforce',
					count: 1
				}
			});
		} else {
			const cur = new Date();
			const old = await prisma.violations.findFirst({
				where: { ip, type: 'bruteforce' },
				orderBy: { id: 'desc' }
			});
			await prisma.violations.update({
				data: {
					expires: addHrs(cur, 1),
					count: old!.count + 1
				},
				where: {
					id: old!.id
				}
			});

			if (old!.count + 1 === 5) {
				await prisma.ip.update({
					data: {
						blocked: true
					},
					where: {
						ip
					}
				});

				await report(
					ip,
					[ReportCategory.Hacking, ReportCategory.BruteForce, ReportCategory.WebAppAttack],
					'Automated report: Attempted bruteforce'
				);
			}
		}
		return new Response(null, { status: 401 });
	} else {
		cookies.set(
			process.env.COOKIE_NAME!,
			jwt.sign({ id: target.id, username: target.username }, process.env.TOKEN_SECRET!),
			{ secure: process.env.IS_HTTPS === 'true' ? true : false, sameSite: true, path: '/' }
		);
		return json({ success: true });
	}
}

export async function PATCH({ request, cookies }) {
	const { logged_in, user } = await checkToken(cookies.get(process.env.COOKIE_NAME!), cookies);

	const { password } = await request.json();

	await prisma.user.update({
		data: {
			password_hash: await argon2.hash(password, {
				secret: Buffer.from(process.env.PASSWORD_SECRET!)
			})
		},
		where: {
			id: user.id
		}
	});

	return json({ success: true });
}

export async function DELETE({ cookies }) {
	cookies.delete(process.env.COOKIE_NAME!, { path: '/' });
	return json({ success: true });
}
