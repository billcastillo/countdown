import type { CreatePageConfig } from '../../routes/create/types';

export const compressForUrl = (config: CreatePageConfig) => {
	// Convert to string and encode
	return encodeURIComponent(btoa(JSON.stringify(config)));
};

export const decompressFromUrl = (str: string) => {
	// Decode and parse back to object
	return JSON.parse(atob(decodeURIComponent(str)));
};
