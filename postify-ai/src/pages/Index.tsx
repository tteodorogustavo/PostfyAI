import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import ArticleCard from "@/components/ArticleCard";
import { Article } from "@/types/article";
import { fetchDailyPapers, searchPapers } from "@/services/papersService";
import { toast } from "sonner";

const Index = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPapers();
  }, []);

  const loadPapers = async () => {
    setIsLoading(true);
    try {
      const papers = await fetchDailyPapers();
      setArticles(papers);
    } catch (error) {
      toast.error("Erro ao carregar artigos", {
        description: "Tente novamente mais tarde.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    
    try {
      const results = await searchPapers(query);
      setArticles(results);

      if (results.length === 0) {
        toast.info("Nenhum artigo encontrado", {
          description: "Tente diferentes palavras-chave ou navegue por todos os artigos.",
        });
        await loadPapers();
      } else {
        toast.success(`${results.length} artigo${results.length > 1 ? "s" : ""} encontrado${results.length > 1 ? "s" : ""}`);
      }
    } catch (error) {
      toast.error("Erro na busca", {
        description: "Tente novamente.",
      });
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Geração de Conteúdo com IA
          </div>
          
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Transforme Artigos Científicos
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                em Posts para o LinkedIn
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra os artigos mais recentes e gere conteúdo envolvente para o LinkedIn com assistência de IA
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8">
          <SearchBar onSearch={handleSearch} isLoading={isSearching} />
        </section>

        {/* Articles Grid */}
        <section className="py-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-semibold text-foreground">
              Artigos Recentes
            </h3>
            <span className="text-sm text-muted-foreground">
              {articles.length} artigo{articles.length !== 1 ? "s" : ""}
            </span>
          </div>

          {isSearching || isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-64 bg-card rounded-lg animate-pulse shadow-card"
                />
              ))}
            </div>
          ) : articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhum artigo disponível no momento.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Index;
