import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Copy, CheckCheck, Hash, FileText, Heading, Linkedin, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { GeneratedPost as GeneratedPostType } from "@/types/article";

const LINKEDIN_WEBHOOK_URL = "https://webhook.terapiaempresarial.com.br/webhook/postlinkedin";

const GeneratedPost = () => {
  const { id } = useParams();
  const [copied, setCopied] = useState(false);
  const [generatedPost, setGeneratedPost] = useState<GeneratedPostType | null>(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [linkedinUrn, setLinkedinUrn] = useState<string | null>(null);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

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

  const handlePublishLinkedin = async () => {
    if (!generatedPost) return;

    setIsPublishing(true);

    try {
      // Prepare payload
      const payload = {
        content: generatedPost.summary,
        hashtags: generatedPost.hashtags || [],
        title: generatedPost.title, // Include title in case the webhook needs it
      };

      console.log("Sending to LinkedIn webhook:", payload);

      const response = await fetch(LINKEDIN_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error(`Falha ao publicar no LinkedIn (${response.status}): ${errorText}`);
      }

      // Get response as text
      const responseText = await response.text();
      console.log("Response text:", responseText);

      let urn: string | null = null;

      // Check if response is plain text URN (starts with urn:li:share:)
      if (responseText.trim().startsWith('urn:li:share:')) {
        urn = responseText.trim();
        console.log("Detected plain text URN:", urn);
      } else {
        // Try to parse as JSON
        try {
          const data = JSON.parse(responseText);
          console.log("Response data (parsed JSON):", data);

          // Extract URN from different JSON formats:
          // - Array: [{ "urn": "urn:li:share:123" }]
          // - Object with URN key: { "urn:li:share:123": { "urn": "urn:li:share:123" } }
          // - Direct object: { "urn": "urn:li:share:123" }

          if (Array.isArray(data) && data[0]?.urn) {
            urn = data[0].urn;
          } else if (data?.urn) {
            urn = data.urn;
          } else {
            // Check if data is an object with URN as key
            const keys = Object.keys(data || {});
            const urnKey = keys.find((key) => key.startsWith('urn:li:share:'));
            if (urnKey && data[urnKey]?.urn) {
              urn = data[urnKey].urn;
            }
          }
        } catch (parseError) {
          // If JSON parse fails, the response might be plain text without proper format
          console.log("Not a valid JSON, treating as plain text");
          // Don't throw here, just let urn remain null and handle below
        }
      }

      console.log("Final extracted URN:", urn);

      if (!urn) {
        console.error("Could not extract URN from response:", responseText);
        throw new Error("URN não recebido do LinkedIn");
      }

      setLinkedinUrn(urn);
      setShowLinkDialog(true);
      toast.success("Post publicado no LinkedIn!");
    } catch (error) {
      console.error("Error publishing to LinkedIn:", error);
      toast.error("Erro ao publicar no LinkedIn", {
        description: error instanceof Error ? error.message : "Tente novamente mais tarde",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const handleCopyLink = async () => {
    if (!linkedinUrn) return;

    try {
      // Extract the share ID from the URN (urn:li:share:7396299652368596992 -> 7396299652368596992)
      const shareId = linkedinUrn.split(":").pop();
      const linkedinUrl = `https://www.linkedin.com/feed/update/${linkedinUrn}`;

      await navigator.clipboard.writeText(linkedinUrl);
      setLinkCopied(true);
      toast.success("Link copiado!");
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      toast.error("Falha ao copiar link");
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

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleCopy}
                className="w-full sm:w-auto"
                size="lg"
                variant="outline"
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

              <Button
                onClick={handlePublishLinkedin}
                disabled={isPublishing}
                className="w-full sm:w-auto"
                size="lg"
              >
                {isPublishing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Publicando...
                  </>
                ) : (
                  <>
                    <Linkedin className="w-4 h-4 mr-2" />
                    Publicar no LinkedIn
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>
      </main>

      {/* LinkedIn Link Dialog */}
      <Dialog open={showLinkDialog} onOpenChange={setShowLinkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Post Publicado no LinkedIn!</DialogTitle>
            <DialogDescription>
              Seu post foi publicado com sucesso. Copie o link abaixo para compartilhar.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-4 bg-muted rounded-lg break-all text-sm">
              {linkedinUrn && `https://www.linkedin.com/feed/update/${linkedinUrn}`}
            </div>

            <Button
              onClick={handleCopyLink}
              className="w-full"
              size="lg"
            >
              {linkCopied ? (
                <>
                  <CheckCheck className="w-4 h-4 mr-2" />
                  Link Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copiar Link
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GeneratedPost;
