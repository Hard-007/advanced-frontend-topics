import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../../hooks/useFirebase";
import Header from "../../components/Header";
import { auth } from "../../../firebase.config";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-gray-50">
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
              <span className="px-3 py-1 bg-blu5100 text-blue-600 rounded-full text-sm">
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

            <div className="space-y-4">
              {post.comments?.map((comment) => (
                <div
                  key={comment.id}
                  className="flex gap-4 p-4 bg-white rounded-lg shadow-sm"
                >
                  {comment.userPhoto ? (
                    <img 
                      src={comment.userPhoto}
                      alt={comment.userName}
                      className="w-10 h-10 rounded-full" 
                    />
                  ):(
                    <div 
                      className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-medium text-lg"
                    >
                      {comment.userName.charAt(0).toUpperCase()}
                    </div>
                  )}
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
              <div className="my-12">
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
              <div
                className="mb-8 p-4 mx-auto w-150 bg-gray-100 rounded-lg border-2 border-blue-500 cursor-pointer
                transition-all hover:bg-blue-100 hover:shadow-lg transform hover:-translate-y-0.5"
                onClick={() => navigate("/login")}
              >
                <p className="text-blue-600 text-center ">
                  Faça login para deixar um comentário
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
              {/* Twitter Share */}
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Share on Twitter"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>

              {/* LinkedIn Share */}
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Share on LinkedIn"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Facebook Share */}
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Share on Facebook"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>

              {/* WhatsApp Share */}
              <a
                href={`https://wa.me/?text=${encodeURIComponent(`${post.title} ${window.location.href}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-green-600 transition-colors"
                aria-label="Share on WhatsApp"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 448 512">
                  <path d="M380.9 97.1C339.3 55.5 282.2 32 224 32 100.3 32 0 132.3 0 256c0 45.1 12.2 84.7 33.3 120.7L0 480l105.6-33.3c35.9 19.7 76.1 30 118.4 30 123.7 0 224-100.3 224-224 0-58.2-23.7-115.3-66.1-158zM224 426.7c-34.5 0-68.2-9.4-97.8-27.1l-6.9-4.2L77.3 441l15.2-45.7-4.5-7C50.8 341.6 42 301.9 42 256 42 148.3 124.3 66 224 66s182 82.3 182 190-82.3 190-182 190zm101.1-137.7c-5.6-2.8-33.1-16.4-38.2-18.3-5.1-2-9-2.8-12.8 2.8s-14.7 18.3-18 22.1c-3.3 3.7-6.7 4.2-12.3 1.4-33.1-16.5-54.8-29.5-76.5-66-5.9-10.1 5.9-9.3 16.9-30.9 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.8-30.8-17.5-42.2-4.6-11.1-9.3-9.7-12.8-9.9-3.3-.3-7-.4-10.7-.4-5.6 0-9.3 2.8-14.2 6.9-4.8 4.2-18.2 17.8-18.2 43.3 0 25.5 18.6 50.1 21.2 53.5 2.8 3.3 39.5 60.3 95.7 84.6 13.4 5.8 23.9 9.3 32.1 11.9 13.5 4.3 25.7 3.7 35.3 2.3 10.7-1.6 33.1-13.5 37.8-26.5 4.6-13.2 4.6-24.5 3.3-26.5-1.3-2-5-3.3-10.7-6.1z" />
                </svg>
              </a>

              {/* Copy Link Button */}
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copiado para a área de transferência!');
                }}
                className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                aria-label="Copy link"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 010 5.656L10.172 19.314a4 4 0 01-5.656-5.656l3.657-3.657a4 4 0 015.656 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.172 13.828a4 4 0 010-5.656l3.657-3.657a4 4 0 015.656 5.656l-3.657 3.657a4 4 0 01-5.656 0z" />
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
