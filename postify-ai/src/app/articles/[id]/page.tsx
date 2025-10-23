import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchArticleById } from '../../../lib/huggingface';
import { Article } from '../../../types';

const ArticlePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const getArticle = async () => {
        const data = await fetchArticleById(id as string);
        setArticle(data);
        setLoading(false);
      };
      getArticle();
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
    </div>
  );
};

export default ArticlePage;