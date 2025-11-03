import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Loader2, Calendar, Users, ExternalLink } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Article } from "@/types/article";
import { fetchDailyPapers } from "@/services/papersService";
import { toast } from "sonner";

const N8N_WEBHOOK_URL = "https://webhook.terapiaempresarial.com.br/webhook/postfy-ia";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadArticle();
  }, [id]);

  const loadArticle = async () => {
    setIsLoading(true);
    try {
      const papers = await fetchDailyPapers();
      const found = papers.find((a) => a.id === id);
      setArticle(found || null);
    } catch (error) {
      toast.error("Erro ao carregar artigo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGeneratePost = async () => {
    if (!article) return;

    setIsGenerating(true);

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: article.title,
          abstract: article.abstract,
          authors: article.authors,
          url: article.url,
        }),
      });

      if (!response.ok) throw new Error("Falha ao gerar post");

      const data = await response.json();

<<<<<<< Updated upstream
      // Armazena os dados gerados no sessionStorage para usar na próxima página
      sessionStorage.setItem("generatedPost", JSON.stringify({
        articleId: article.id,
        ...data
      }));

      toast.success("Post gerado com sucesso!");
      navigate(`/post/${article.id}`);
=======
      // Normaliza formatos comuns retornados pelo n8n / HTTP responders:
      // - Pode vir como array [{ output: {...} }]
      // - Ou como { output: {...} }
      // - Ou diretamente o objeto esperado
      const payload =
        (Array.isArray(data) && data[0]?.output) || data?.output || data?.data || data;

      // Em alguns casos ainda há um nível extra 'output'
      const normalized = payload?.output || payload;

      // Garantir que hashtags seja um array quando for string serializado
      if (normalized && typeof normalized.hashtags === "string") {
        try {
          normalized.hashtags = JSON.parse(normalized.hashtags);
        } catch (e) {
          // se não for JSON válido, deixa como string
        }
      }

      // Salva o objeto normalizado para a página de preview (GeneratedPost)
      sessionStorage.setItem(
        "generatedPost",
        JSON.stringify({ articleId: article.id, ...(normalized || {}) })
      );

  toast.success("Post gerado com sucesso!");
  // Mantém a navegação original para a página do artigo
  navigate(`/post/${article.id}`);
>>>>>>> Stashed changes
    } catch (error) {
      console.error("Error generating post:", error);
      toast.error("Erro ao gerar post", {
        description: "Tente novamente mais tarde. " + error.message
      });
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="mt-4 text-muted-foreground">Carregando artigo...</p>
        </main>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Artigo não encontrado</h2>
          <Link to="/">
            <Button>Voltar ao Dashboard</Button>
          </Link>
        </main>
      </div>
    );
  }

  const formattedDate = new Date(article.date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar aos Artigos
          </Button>
        </Link>

        <Card className="p-8 space-y-6">
          {/* Article Header */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">
              {article.title}
            </h1>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{article.authors.join(", ")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{formattedDate}</span>
              </div>
            </div>

            {article.url && (
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                Ver no arXiv
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Abstract */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-foreground">Resumo</h2>
            <p className="text-muted-foreground leading-relaxed">
              {article.abstract}
            </p>
          </div>

          {/* Generate Post CTA */}
          <div className="pt-6 border-t border-border">
            <div className="bg-gradient-primary/10 rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary rounded-lg">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">
                    Gerar Post para LinkedIn
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Transforme este artigo científico em um post envolvente para o LinkedIn com geração de conteúdo por IA
                  </p>
                </div>
              </div>

              <Button
                onClick={handleGeneratePost}
                disabled={isGenerating}
                className="w-full sm:w-auto"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Gerando Post...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Gerar Post com IA
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default ArticleDetail;
