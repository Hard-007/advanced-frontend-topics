import React from "react";

interface NewsletterProps {
  email: string;
  setEmail: (email: string) => void;
}

const Newsletter: React.FC<NewsletterProps> = ({ email, setEmail }) => {
  return (
    <div className="max-w-7xl mx-auto mt-16 bg-gray-100 p-8 rounded-lg flex flex-col gap-6 items-center text-center">
      <span className="text-blue-600 cursor-default">Fique atualizado</span>
      <div className="flex flex-col md:flex-row items-center gap-6 w-full">
        <h2 className="text-2xl font-bold">Junte-se à nossa newsletter</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-80 p-3 border border-gray-300 rounded-lg"
          />
          <button className="w-full sm:w-auto px-10 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Inscrever-se
          </button>
        </div>
      </div>
      <p className="text-gray-500 text-sm">
        Você pode cancelar a inscrição a qualquer momento.
      </p>
    </div>
  );
};

export default Newsletter;
