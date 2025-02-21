import { useState } from "react";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");

  const trendingTopics = [
    "Design Thinking",
    "Tecnologia",
    "Web3",
    "Programação",
    "IA",
  ];

  const blogPosts = [
    {
      date: "1 Mar",
      title:
        "Ferramentas e Recursos Poderosos de Trading para Investidores Experientes",
      excerpt:
        "Estou sempre tentando pensar em ideias de negócios novas e interessantes. Geralmente tento criar ideias pensando no que eu gostaria de fazer ou ver no mundo. Então, tento encontrar razões pelas quais não funcionaria...",
      author: "Mark Tuchel",
      readTime: "7 min de leitura",
      category: "Ferramentas",
      image:
        "https://i.pinimg.com/736x/2d/b3/97/2db397256bf1518b79c879169e37db5d.jpg",
    },
    {
      date: "2 Jan",
      title: "Estamos implementando IA e Tecnologia",
      excerpt:
        "Estou sempre tentando pensar em ideias de negócios novas e interessantes. Geralmente tento criar ideias pensando no que eu gostaria de fazer ou ver no mundo. Então, tento encontrar razões pelas quais não funcionaria...",
      author: "Harry Oland",
      readTime: "4 min de leitura",
      category: "IA",
      image:
        "https://i.pinimg.com/736x/45/12/d3/4512d38668cf7822308e67d69084922b.jpg",
    },
  ];

  return (
    <div className="min-h-screen py-24 px-4 md:px-8">
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
          Insights da nossa equipe
        </h1>
        <p className="text-xl text-gray-600">
          Ferramentas e Recursos Poderosos de Trading para Investidores
          Experientes
        </p>
      </div>

      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder="pesquisar..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 px-4 pr-12 border border-gray-200 rounded-lg"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-xl font-semibold text-blue-600 mb-4">
            Tópicos em Alta
          </h2>
          <div className="flex flex-wrap gap-3">
            {trendingTopics.map((topic) => (
              <button
                key={topic}
                className="px-4 py-2 rounded-full border border-gray-200 text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {blogPosts.map((post, index) => (
          <article key={index} className="group cursor-pointer">
            <div className="aspect-video bg-blue-600 rounded-lg mb-4 overflow-hidden">
              <div className="w-full h-full bg-blue-500/50 rounded-lg">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-blue-600">{post.date}</span>
                <span className="px-2 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                  {post.category}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
              <div className="flex items-center gap-2 text-gray-500">
                <span>By {post.author}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Artigos Relacionados
        </h3>
        <div className="flex flex-wrap grid md:grid-cols-2 gap-4">
          <div className="p-8 border rounded-lg h-[350px] flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Explorando as Melhores Ferramentas de Trading para Iniciantes
              </h4>
              <p className="text-sm text-gray-600 line-clamp-4">
                Descubra as ferramentas mais eficazes para quem está começando
                no mundo do trading. Este artigo explora as opções mais
                acessíveis e como usá-las para melhorar sua estratégia de
                investimento.
              </p>
            </div>
            <div className="mt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Ler mais
              </button>
            </div>
          </div>
          <div className="p-8 border rounded-lg h-[350px] flex flex-col justify-between">
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Como a Inteligência Artificial Está Transformando o Mercado
                Financeiro
              </h4>
              <p className="text-sm text-gray-600 line-clamp-4">
                A inteligência artificial tem ganhado cada vez mais espaço no
                mercado financeiro. Neste artigo, discutimos como as empresas
                estão implementando IA para otimizar decisões de investimento.
              </p>
            </div>
            <div className="mt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Ler mais
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-16 bg-gray-100 p-8 rounded-lg flex flex-col gap-6 items-center text-center">
        <span className="text-blue-600 cursor-default">Fique atualizado</span>
        <div className="flex items-center gap-6 w-full">
          <h2 className="text-2xl font-bold">Junte-se à nossa newsletter</h2>
          <div className="flex flex-col w-200 md:flex-row gap-4">
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-150 p-3 border border-gray-300 rounded-lg"
            />
            <button className="px-10 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Inscrever-se
            </button>
          </div>
        </div>
        <p className="text-gray-500 text-sm">
          Você pode cancelar a inscrição a qualquer momento.
        </p>
      </div>
    </div>
  );
};

export default BlogPage;
