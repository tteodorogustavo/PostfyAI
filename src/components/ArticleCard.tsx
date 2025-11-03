import { Calendar, Users, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Article } from "@/types/article";
import { Link } from "react-router-dom";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const formattedDate = new Date(article.date).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <Card className="group p-6 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {article.title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span className="line-clamp-1">{article.authors.slice(0, 2).join(", ")}</span>
            {article.authors.length > 2 && <span>+{article.authors.length - 2}</span>}
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">{article.abstract}</p>

        <div className="pt-2">
          <Link to={`/article/${article.id}`}>
            <Button variant="outline" className="group/btn w-full sm:w-auto">
              Ver Artigo Completo
              <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default ArticleCard;
