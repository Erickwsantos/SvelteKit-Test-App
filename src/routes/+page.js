export async function load({ fetch, url }) {
	const name = url.searchParams.get('name') || '';
	let resultado = null;

	if (name.trim() !== '') {
		const res = await fetch(`https://api.agify.io?name=${encodeURIComponent(name)}`);
		resultado = await res.json();
	}

	return { name, resultado };
}