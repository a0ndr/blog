import { AbuseIPDBClient, ReportCategory } from 'abuseipdb-client';
import 'dotenv/config';

export const AID = new AbuseIPDBClient(process.env.ABUSEIPDB_KEY!);

export const check = async (ip: string) => {
	const result = await AID.check(ip);
	return result;
};

export const report = async (ip: string, categories: ReportCategory[], reason: string) => {
	if (ip in process.env.WHITELISTED_IPS!.split(',')) {
		const result = await AID.report(ip, categories, { comment: reason });
		return result;
	} else {
        return {};
    }
};
