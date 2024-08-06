import { error, fail, json } from '@sveltejs/kit';
import * as aid from '$lib/aipdb';
import { ReportCategory } from 'abuseipdb-client';

export const GET = async ({ request, url }) => {
	const q = new URLSearchParams(url.search);
	if (!q.has('ip')) return json({ error: 'no ip' }, { status: 400 });

	return json(await aid.check(q.get('ip')!));
};

export const POST = async ({ request }) => {
	const { ip, reason, comment, categories } = (await request.json()) as {
		ip: string;
		reason: "SNOOP"|"SUSPICIOUS"|"SQL"|"BRUTEFORCE"|"CUSTOM";
		comment?: string;
		categories?: string;
	};
	if (!ip) return json({ error: 'no ip' }, { status: 400 });
	else if (!reason) return json({ error: 'no reason' }, { status: 400 });

	let cat = [];
	if (categories) {
		for (const c of categories.split(',')) {
            //@ts-ignore
			cat.push(ReportCategory[c]);
		}
	}

	const templates: {[key: string]: [ReportCategory[], string]} = {
		SNOOP: [
			[ReportCategory.BadWebBot, ReportCategory.WebAppAttack],
			'Automated report: Triggered trap'
		],
		SUSPICIOUS: [[ReportCategory.Hacking], 'Automated report: Suspicious activity'],
		SQL: [[ReportCategory.SQLInjection], 'Automated report: SQL Injection attempt'],
		BRUTEFORCE: [[ReportCategory.BruteForce], 'Automated report: Brute force'],
		CUSTOM: [cat, comment!]
	};

	return json(await aid.report(ip, templates[reason][0], templates[reason][1]));
};
