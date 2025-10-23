import React from 'react';

interface ArticleCardProps {
  title: string;
  summary: string;
  link: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, summary, link }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-700">{summary}</p>
      <a href={link} className="text-blue-500 hover:underline">
        Read more
      </a>
    </div>
  );
};

export default ArticleCard;