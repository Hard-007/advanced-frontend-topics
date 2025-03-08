import React from "react";
import { Link } from "react-router-dom";

const MoreArticlesCard: React.FC<{ article: any; index: number }> = ({
  article,
  index,
}) => {
  return (
    <div
      className="group p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg 
        transition-all duration-300 h-[160px] flex  justify-between hover:border-blue-200"
    >
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
          <span className="text-xs text-blue-500 font-medium uppercase tracking-wide">
            Artigo {index + 1}
          </span>
        </div>
        <h4 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {article.title}
        </h4>
        <div
          dangerouslySetInnerHTML={{ __html: article.content }}
          className="text-sm text-gray-600 line-clamp-3 leading-relaxed"
        ></div>
      </div>
      <div className="mt-4">
        <Link
          to={`/post/${article.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium 
          py-2 px-4 rounded-md text-blue-600 hover:text-white hover:bg-blue-600 
          transition-all duration-200 border border-blue-200 hover:border-blue-600"
        >
          Ler mais
          <svg
            className="w-3.5 h-3.5"
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
        </Link>
      </div>
    </div>
  );
};

export default MoreArticlesCard;
