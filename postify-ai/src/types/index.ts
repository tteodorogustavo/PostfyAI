interface Article {
    id: string;
    title: string;
    summary: string;
    content: string;
    author: string;
    publishedDate: string;
    tags: string[];
}

interface ApiResponse {
    articles: Article[];
    total: number;
}

export type { Article, ApiResponse };