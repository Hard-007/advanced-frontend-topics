import React from "react";

interface Article {
  title: string;
  content: string;
}

const MoreArticlesCard: React.FC<{ article: Article; index: number }> = ({
  article,
  index,
}) => {
  return (
    <div
      className="group p-8 bg-white border border-gray-100 rounded-xl shadow-sm 
        hover:shadow-xl hover:border-blue-100 hover:scale-[1.02] 
        transition-all duration-300 h-[380px] flex flex-col justify-between"
    >
      <div>
        <div className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
          <span className="text-sm text-blue-600 font-medium">
            Artigo {index + 1}
          </span>
        </div>
        <h4 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h4>
        <p className="text-base text-gray-600 line-clamp-4 leading-relaxed">
          {article.content}
        </p>
      </div>
      <div className="mt-6">
        <button
          className="inline-flex items-center gap-2 bg-gray-50 text-gray-900 font-medium 
          py-2.5 px-5 rounded-lg group-hover:bg-blue-600 group-hover:text-white 
          transition-all duration-300"
        >
          Ler mais
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M5 12h14m-7-7l7 7-7 7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MoreArticlesCard;
