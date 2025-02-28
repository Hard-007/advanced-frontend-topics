import React from "react";

interface BlogPost {
  date: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
}

const BlogPostCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <article className="group cursor-pointer">
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
  );
};

export default BlogPostCard;
