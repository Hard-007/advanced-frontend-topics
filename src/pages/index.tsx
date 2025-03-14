import { useState, useEffect } from "react";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import MoreArticlesCard from "../components/MoreArticlesCard";
import { useFirebase } from "../hooks/useFirebase";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  author: string;
  [key: string]: any;
}

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const { subscribeToPath } = useFirebase();

  useEffect(() => {
    const unsubscribe = subscribeToPath("posts", (newPosts) => {
      setBlogPosts(newPosts as BlogPost[]);
    });

    // Cleanup subscription when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <Header
          title="Insights da nossa equipe"
          subtitle="Ferramentas e Recursos Poderosos de Trading para Investidores Experientes"
        />

        <div className="mt-8 mb-12 ">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            Artigos em Destaque
          </h3>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((article, index) => (
              <MoreArticlesCard key={index} article={article} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
