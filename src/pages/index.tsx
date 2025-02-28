import { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TrendingTopics from "../components/TrendingTopics";
import BlogPostCard from "../components/BlogPostCard";
import MoreArticlesCard from "../components/MoreArticlesCard";
import Newsletter from "../components/Newsletter";

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

  const moreArticles = [
    {
      title: "Explorando as Melhores Ferramentas de Trading para Iniciantes",
      content:
        "Descubra as ferramentas mais eficazes para quem está começando no mundo do trading. Este artigo explora as opções mais acessíveis e como usá-las para melhorar sua estratégia de investimento.",
    },
    {
      title:
        "Como a Inteligência Artificial Está Transformando o Mercado Financeiro",
      content:
        "A inteligência artificial tem ganhado cada vez mais espaço no mercado financeiro. Neste artigo, discutimos como as empresas estão implementando IA para otimizar decisões de investimento.",
    },
  ];

  return (
    <div className="min-h-screen container mx-auto py-24 px-4">
      <Header
        title="Insights da nossa equipe"
        subtitle="Ferramentas e Recursos Poderosos de Trading para Investidores Experientes"
      />

      <div className="mb-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-8">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <TrendingTopics topics={trendingTopics} />
      </div>

      <div className="mx-auto grid md:grid-cols-2 gap-8">
        {blogPosts.map((post, index) => (
          <BlogPostCard key={index} post={post} />
        ))}
      </div>

      <div className="mt-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
          Mais Artigos
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          {moreArticles.map((article, index) => (
            <MoreArticlesCard key={index} article={article} index={index} />
          ))}
        </div>
      </div>

      <Newsletter email={email} setEmail={setEmail} />
    </div>
  );
};

export default BlogPage;
