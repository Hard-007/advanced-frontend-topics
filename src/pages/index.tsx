import { useState } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import TrendingTopics from "../components/TrendingTopics";
import BlogPostCard from "../components/BlogPostCard";
import MoreArticlesCard from "../components/MoreArticlesCard";
import Newsletter from "../components/Newsletter";
import { BLOG_POSTS, MORE_ARTICLES, TRENDING_TOPICS } from "../data";
import Navbar from "../components/Navbar";

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div>
      <Navbar />
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

          <TrendingTopics topics={TRENDING_TOPICS} />
        </div>

        <div className="mx-auto grid md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <BlogPostCard key={index} post={post} />
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Mais Artigos
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {MORE_ARTICLES.map((article, index) => (
              <MoreArticlesCard key={index} article={article} index={index} />
            ))}
          </div>
        </div>

        <Newsletter email={email} setEmail={setEmail} />
      </div>
    </div>
  );
};

export default BlogPage;
