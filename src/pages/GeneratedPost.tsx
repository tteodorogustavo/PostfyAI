import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Copy, CheckCheck, Hash, FileText, Heading } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

const GeneratedPost = () => {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<any>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("generatedPost");
    if (stored) {
      setGeneratedPost(JSON.parse(stored));
    }
  }, []);

  if (!generatedPost) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Post não encontrado</h2>
          <Link to="/">
            <Button>Voltar ao Dashboard</Button>
          </Link>
        </main>
      </div>
    );
  }

  const fullPost = `${generatedPost.title}\n\n${generatedPost.summary}\n\n${generatedPost.hashtags?.join(" ") || ""}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullPost);
      setCopied(true);
      toast.success("Post copiado!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Falha ao copiar");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Link to={`/article/${id}`}>
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Artigo
          </Button>
        </Link>

        <div className="space-y-6">
          {/* Success Banner */}
          <Card className="p-6 bg-accent/10 border-accent/20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent rounded-lg">
                <CheckCheck className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <h2 className="font-semibold text-foreground">Post Gerado com Sucesso!</h2>
                <p className="text-sm text-muted-foreground">Seu post para LinkedIn está pronto para compartilhar</p>
              </div>
            </div>
          </Card>

          {/* Generated Content */}
          <Card className="p-8 space-y-6">
            {/* Title */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heading className="w-4 h-4" />
                <span className="font-medium">Título do Post</span>
              </div>
              <h3 className="text-2xl font-bold text-foreground">
                {generatedPost.title}
              </h3>
            </div>

            <div className="border-t border-border" />

            {/* Summary */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="w-4 h-4" />
                <span className="font-medium">Conteúdo do Post</span>
              </div>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {generatedPost.summary}
              </p>
            </div>

            <div className="border-t border-border" />

            {/* Hashtags */}
            {generatedPost.hashtags && generatedPost.hashtags.length > 0 && (
              <>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Hash className="w-4 h-4" />
                    <span className="font-medium">Hashtags</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {generatedPost.hashtags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="border-t border-border" />
              </>
            )}

            {/* Copy Button */}
            <div className="pt-4">
              <Button
                onClick={handleCopy}
                className="w-full sm:w-auto"
                size="lg"
              >
                {copied ? (
                  <>
                    <CheckCheck className="w-4 h-4 mr-2" />
                    Copiado!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar Post Completo
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default GeneratedPost;
