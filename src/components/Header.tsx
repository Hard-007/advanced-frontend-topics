import React from "react";

interface HeaderProps {
  title: string;
  subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="max-w-7xl mx-auto mb-16">
      <a
        href="/tutorial"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
      >
        Ver Tutorial Coranu
        <svg
          className="w-4 h-4 ml-1"
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
      </a>

      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        {title}
      </h1>
      <p className="text-xl text-gray-600">{subtitle}</p>
    </div>
  );
};

export default Header;
