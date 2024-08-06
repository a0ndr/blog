// src/routes/+page.server.ts

import prisma from '$lib/prisma';
import type { Ip } from '@prisma/client';
import type { LayoutServerLoad } from './$types';
import 'dotenv/config';
import { error } from 'console';
import {
	convertAssociativeArrayToIndexedArrayBasedOnValue,
	convertIndexedArrayToAssociativeArrayBasedOnValue
} from '$lib/util';
import { check } from '$lib/aipdb';

export const load = (async (event: {
	request: { headers: { get: (arg0: string) => any } };
	getClientAddress: () => any;
}) => {
	const texts = convertIndexedArrayToAssociativeArrayBasedOnValue(
		await prisma.text.findMany(),
		'id',
		'content'
	);
	const config = convertIndexedArrayToAssociativeArrayBasedOnValue(
		await prisma.config.findMany(),
		'key',
		'value'
	);
	const art = await prisma.art.findMany({
		orderBy: [
			{
				createdAt: 'desc'
			}
		]
	});
	const publishedPosts = await prisma.post.findMany({
		where: {
			published: true
		},
		orderBy: [
			{
				createdAt: 'desc'
			}
		]
	});
	const users = await prisma.user.findMany({
		select: { id: true, username: true, password_hash: false }
	});
	const ips = await prisma.ip.findMany({
		orderBy: [
			{
				requests: 'desc'
			}
		]
	});
	const ip = event.request.headers.get('X-Real-Ip') ?? event.getClientAddress();
	// const ip = "178.143.3.115"
	const _ip = ips.find((x: Ip) => x.ip == ip);
	if (_ip) {
		if (new Date().getTime() > _ip.next_check.getTime()) {
			const { error, headers, result } = await check(_ip.ip);
			if (!error) {
				const next = new Date();
				next.setDate(new Date().getDate() + 1);
				await prisma.ip.update({
					data: {
						requests: ++_ip!.requests,
						last_check: new Date(),
						next_check: next,
						score: result?.data.abuseConfidenceScore ?? 0,
						reports: result?.data.totalReports ?? 0,
						last_seen: new Date(),
						blocked: result?.data.abuseConfidenceScore ? result?.data.abuseConfidenceScore > 50 : false,
						country: result?.data.countryCode ?? "Unknown"
					},
					where: {
						ip
					}
				});
			} else {
				await prisma.ip.update({
					data: {
						requests: ++_ip!.requests,
						last_check: new Date(),
						next_check: new Date(),
						last_seen: new Date(),
					},
					where: {
						ip
					}
				});
			}
		} else {
			await prisma.ip.update({
				data: {
					requests: ++_ip!.requests,
					last_seen: new Date()
				},
				where: {
					ip
				}
			});
		}
	} else {
		const { error, headers, result } = await check(ip);
		console.log(result, error);
		
		if (!error) {
			const next = new Date();
			next.setDate(new Date().getDate() + 1);
			await prisma.ip.create({
				data: {
					requests: 1,
					last_check: new Date(),
					next_check: next,
					score: result?.data.abuseConfidenceScore ?? 0,
					reports: result?.data.totalReports ?? 0,
					last_seen: new Date(),
					first_seen: new Date(),
					ip,
					blocked: result?.data.abuseConfidenceScore ? result?.data.abuseConfidenceScore > 50 : false,
					country: result?.data.countryCode ?? "Unknown"
				}
			});
		} else {
			await prisma.ip.create({
				data: {
					requests: 1,
					last_check: new Date(),
					next_check: new Date(),
					score: 0,
					reports: 0,
					last_seen: new Date(),
					first_seen: new Date(),
					ip,
					blocked: false,
					country: "Unknown"
				}
			});
		}
	}

	const __ip = await prisma.ip.findFirst({ where: { ip } });
	if (__ip && __ip.blocked) {
		throw error('Internal Error', 500);
	}


	return { texts, config, publishedPosts, art, users };
}) satisfies LayoutServerLoad;
