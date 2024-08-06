import prisma from './prisma';
import { convertIndexedArrayToAssociativeArrayBasedOnValue } from './util';

export async function upload(file: File, path: string) {
	const _conf = convertIndexedArrayToAssociativeArrayBasedOnValue(
		await prisma.config.findMany(),
		'key',
		'value'
	);

	const data = new FormData();
	data.append('file', file);
	data.append('origin', 'cdn.ptgn.fun');
	data.append('path', path);
	const req = await fetch(`${_conf.MCDN_URL}/upload`, {
		method: 'POST',
		body: data,
		headers: {
			'X-Api-Key': process.env.MCDN_KEY!
		}
	});
	const res = await req.json();
	return res;
}

export async function deleteFile(id: string) {
	const _conf = convertIndexedArrayToAssociativeArrayBasedOnValue(
		await prisma.config.findMany(),
		'key',
		'value'
	);

	await fetch(_conf.MCDN_URL, {
		method: 'DELETE',
		body: JSON.stringify({ id }),
		headers: {
			'X-Api-Key': process.env.MCDN_KEY!,
			'Content-Type': 'application/json'
		}
	});
}

export async function addArt(file: File, caption: string, artist: string) {
	const data = await upload(file, 'art');
	const entity = await prisma.art.create({
		data: {
			id: data.id,
			image: data.url,
			artist,
			caption
		}
	});
	return entity;
}
