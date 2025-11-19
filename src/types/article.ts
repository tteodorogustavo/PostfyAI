export interface Article {
  id: string;
  title: string;
  authors: string[];
  date: string;
  abstract: string;
  url?: string;
}

export interface GeneratedPost {
  title: string;
  summary: string;
  hashtags: string[];
  language?: string;
}

export type Language = 'pt' | 'en' | 'es';
