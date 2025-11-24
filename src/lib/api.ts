export const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'https://strapi.extend-it.dev';

export interface PortfolioItem {
    id: number;
    documentId: string;
    title: string;
    description: string;
    category: string;
    techStack: string[]; // JSON array
    projectLink: string;
    githubLink: string;
    image: {
        url: string;
    } | null;
    fallbackGradient: string;
}

export async function fetchPortfolio(): Promise<PortfolioItem[]> {
    try {
        const response = await fetch(`${STRAPI_URL}/api/portfolios?populate=*`);
        if (!response.ok) {
            throw new Error('Failed to fetch portfolio');
        }
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error("Error fetching portfolio:", error);
        return [];
    }
}

export interface PartnerItem {
    id: number;
    documentId: string;
    name: string;
    image: {
        url: string;
    } | null;
}

export async function fetchPartners(): Promise<PartnerItem[]> {
    try {
        const response = await fetch(`${STRAPI_URL}/api/partners?populate=*`);
        if (!response.ok) {
            throw new Error('Failed to fetch partners');
        }
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.error("Error fetching partners:", error);
        return [];
    }
}
