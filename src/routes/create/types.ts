export interface CreatePageConfig {
	title: string;
	description?: string;
}

export interface CreatePageData {
	iso: string;
	config: CreatePageConfig;
}

export interface CreatePageProps {
	data: CreatePageData;
}
