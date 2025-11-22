export const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';

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
