import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../../hooks/useFirebase";
import Header from "../../components/Header";
import { auth } from "../../../firebase.config";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  image: string;
  date: string;
  author: string;
  readTime?: string;
  category?: string;
  likeCount?: number;
  commentCount?: number;
  comments?: Comment[];
}

interface Comment {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userPhoto: string;
  createdAt: string;
  likes: number;
}

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const {
    getPostById,
    addComment,
    deleteComment,
    toggleLike,
    subscribeToComments,
  } = useFirebase();

  useEffect(() => {
    const fetchPost = async () => {
      if (id) {
        try {
          const postData = await getPostById(id);
          setPost(postData as BlogPost);
          // Subscribe to real-time comments updates
          const unsubscribe = subscribeToComments(id);
          return () => unsubscribe();
        } catch (error) {
          console.error("Error fetching post:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPost();
  }, []);

  const handleAddComment = async () => {
    if (!auth.currentUser || !id || !newComment.trim()) return;

    try {
      await addComment(id, {
        text: newComment.trim(),
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName || "",
        userPhoto: auth.currentUser.photoURL || "",
        createdAt: new Date().toISOString(),
        likes: 0,
      });
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!id) return;
    try {
      await deleteComment(id, commentId);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleToggleLike = async (commentId?: string) => {
    if (!id) return;
    try {
      await toggleLike(id, commentId);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Post não encontrado
        </h2>
        <a
          href="/"
          className="text-blue-600 hover:text-blue-700 flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              d="M19 12H5M5 12L12 19M5 12L12 5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Voltar para a página inicial
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <Header
          title={post.title}
          subtitle={`Por ${post.author} • ${post.date}`}
        />

        {post.image && (
          <div className="mb-12 rounded-2xl overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
        )}

        <div className="">
          <div className="flex items-center gap-4 mb-8">
            {post.category && (
              <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
                {post.category}
              </span>
            )}
            {post.readTime && (
              <span className="text-gray-600 text-sm">
                {post.readTime} de leitura
              </span>
            )}
            <button
              onClick={() => handleToggleLike()}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{post.likeCount || 0}</span>
            </button>
          </div>

          <article className="prose prose-lg">
            <div
              dangerouslySetInnerHTML={{ __html: post.content }}
              className="text-gray-800 leading-relaxed"
            />
          </article>

          {/* Comments Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-8">
              Comentários ({post.commentCount || 0})
            </h3>

            <div className="space-y-6">
              {post.comments?.map((comment) => (
                <div
                  key={comment.id}
                  className="flex gap-4 p-4 bg-white rounded-lg shadow-sm"
                >
                  <img
                    src={comment.userPhoto}
                    alt={comment.userName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">
                        {comment.userName}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="mt-1 text-gray-700">{comment.text}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <button
                        onClick={() => handleToggleLike(comment.id)}
                        className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{comment.likes}</span>
                      </button>
                      {auth.currentUser?.uid === comment.userId && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="text-sm text-red-500 hover:text-red-600"
                        >
                          Excluir
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {auth.currentUser ? (
              <div className="mb-8">
                <textarea
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewComment(value);
                  }}
                  placeholder="Escreva seu comentário..."
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                />
                <button
                  onClick={handleAddComment}
                  disabled={!newComment.trim()}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Comentar
                </button>
              </div>
            ) : (
              <div className="mb-8 p-4 bg-gray-100 rounded-lg">
                <p className="text-gray-600">
                  F aça login para deixar um comentário
                </p>
              </div>
            )}
          </div>

          {/* Social Share Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Compartilhe este artigo
            </h3>
            <div className="flex gap-4">
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
