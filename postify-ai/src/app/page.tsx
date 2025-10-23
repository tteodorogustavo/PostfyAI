import React, { useEffect, useState } from 'react';
import ArticleList from '../components/ArticleList';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchArticles } from '../lib/huggingface';

const HomePage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const data = await fetchArticles();
      setArticles(data);
    };

    getArticles();
  }, []);

  return (
    <div>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Artigos</h1>
        <ArticleList articles={articles} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;