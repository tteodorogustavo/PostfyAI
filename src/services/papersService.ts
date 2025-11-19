import { Article } from "@/types/article";

// pega a data atual no formato YYYY-MM-DD preciso que fique assim: 2025-11-19
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");
const formattedDate = `${year}-${month}-${day}`;

const HF_PAPERS_API = "https://huggingface.co/api/daily_papers?date=" + formattedDate;

interface HFPaper {
  paper: {
    id: string;
    title: string;
    summary: string;
    publishedAt: string;
    authors?: Array<{ name: string }>;
  };
}

export const fetchDailyPapers = async (): Promise<Article[]> => {
  try {
    const response = await fetch(HF_PAPERS_API);
    if (!response.ok) throw new Error("Failed to fetch papers");
    
    const data: HFPaper[] = await response.json();
    
    return data.map((item) => ({
      id: item.paper.id,
      title: item.paper.title,
      authors: item.paper.authors?.map(a => a.name) || ["Autor Desconhecido"],
      date: new Date(item.paper.publishedAt).toISOString().split('T')[0],
      abstract: item.paper.summary,
      url: `https://arxiv.org/abs/${item.paper.id}`
    }));
  } catch (error) {
    console.error("Error fetching papers:", error);
    // Fallback para dados mockados se API falhar
    return [];
  }
};

export const searchPapers = async (query: string): Promise<Article[]> => {
  try {
    const allPapers = await fetchDailyPapers();
    const lowerQuery = query.toLowerCase();
    
    return allPapers.filter(paper =>
      paper.title.toLowerCase().includes(lowerQuery) ||
      paper.abstract.toLowerCase().includes(lowerQuery) ||
      paper.authors.some(author => author.toLowerCase().includes(lowerQuery))
    );
  } catch (error) {
    console.error("Error searching papers:", error);
    return [];
  }
};
