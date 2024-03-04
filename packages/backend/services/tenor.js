export async function getTenorGIF(query) {
	const url = `https://tenor.googleapis.com/v2/search?q=${query}&key=${process.env.TENOR_API_KEY}&limit=1`;
	const response = await fetch(url);
	const data = await response.json();
	return data.results[0].media_formats.gif.url;
}
