import { report } from '$lib/aipdb.js';
import { ReportCategory } from 'abuseipdb-client';

export const load = async (event) => {
    const ip = event.request.headers.get('X-Real-Ip') ?? event.getClientAddress();
    await report(ip, [ReportCategory.WebAppAttack], "Automated report: Triggered .env trap");
};
