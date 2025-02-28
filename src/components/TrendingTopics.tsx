import React from "react";

interface TrendingTopicsProps {
  topics: string[];
}

const TrendingTopics: React.FC<TrendingTopicsProps> = ({ topics }) => {
  return (
    <div className="mb-12">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">
        Tópicos em Alta
      </h2>
      <div className="flex flex-wrap gap-3">
        {topics.map((topic) => (
          <button
            key={topic}
            className="px-4 py-2 rounded-full border border-gray-200 text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors"
          >
            {topic}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TrendingTopics;
