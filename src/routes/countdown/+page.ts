import { decompressFromUrl } from '../../lib/utils/url.js';

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

export function load({ url }) {
	const iso = url.searchParams.get('iso');
	const compressedConfig = url.searchParams.get('config');
	// const config = url.searchParams.get('config');
	const config = compressedConfig ? decompressFromUrl(compressedConfig) : null;

	return {
		iso,
		config
	};
}
