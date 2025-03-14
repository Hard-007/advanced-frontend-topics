import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Editor } from "primereact/editor";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { useFirebase } from "../../../hooks/useFirebase";
import { auth } from "../../../../firebase.config";
import { User } from "firebase/auth";

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  readTime?: string;
  createdAt?: string;
  updatedAt?: string;
}

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [userAuth, setUserAuth] = useState<User | null>(null);
  const [content, setContent] = useState("");
  const [readTimeMinutes, setReadTimeMinutes] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);
  const [title, setTitle] = useState("");

  const { getPostById, updatePost } = useFirebase();

  // Fetch the post data when the component mounts
  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        const postData = await getPostById(id);
        if (postData) {
          setTitle(postData.title);
          setContent(postData.content);

          // Check if the current user is the author
          if (auth.currentUser?.uid !== postData.authorId) {
            toast.current?.show({
              severity: "error",
              summary: "Acesso negado",
              detail: "Você não tem permissão para editar este post",
              life: 3000,
            });
            navigate(`/post/${id}`);
          }
        } else {
          toast.current?.show({
            severity: "error",
            summary: "Erro",
            detail: "Post não encontrado",
            life: 3000,
          });
          navigate("/");
        }
      } catch (error) {
        console.error("Erro ao buscar post:", error);
        toast.current?.show({
          severity: "error",
          summary: "Erro",
          detail: "Erro ao buscar o post",
          life: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate, getPostById]);

  // Calculate read time based on content
  useEffect(() => {
    const textContent = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
    const wordCount = textContent.split(/\s+/).length;
    const wordsPerMinute = 200; // Average reading speed
    const timeToRead = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    setReadTimeMinutes(timeToRead);
  }, [content]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validations
    if (!title.trim() || !content.trim()) {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Título e conteúdo não podem estar vazios",
        life: 3000,
      });
      return;
    }

    try {
      setIsLoading(true);

      const postData = {
        title,
        content,
        readTime: `${readTimeMinutes} min de leitura`,
        updatedAt: new Date().toISOString(),
      };

      await updatePost(id!, postData);

      toast.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Post atualizado com sucesso!",
        life: 3000,
      });

      navigate(`/post/${id}`);
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao atualizar o post. Tente novamente.",
        life: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Preview component
  const PreviewPost = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm text-gray-500">
          {`${readTimeMinutes} min de leitura`} - {userAuth?.displayName || "Autor"}
        </span>
        <span className="text-sm text-gray-500">
          {new Date().toLocaleString()}
        </span>
      </div>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
      />
    </div>
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgressSpinner
          style={{ width: "50px", height: "50px" }}
          strokeWidth="4"
          fill="transparent"
          animationDuration=".5s"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto my-8 py-8 px-8 max-w-5xl border border-gray-300 rounded-lg shadow-lg">
      <Toast ref={toast} />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Editar Post</h1>
        <button
          onClick={() => setPreviewMode(!previewMode)}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
        >
          {previewMode ? "Voltar à edição" : "Visualizar"}
        </button>
      </div>

      {previewMode ? (
        <PreviewPost />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg outline-0"
              required
              placeholder="Digite o título do post"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Conteúdo
            </label>
            <Editor
              value={content}
              onTextChange={(e) => setContent(e.htmlValue || "")}
              style={{ height: "400px" }}
            />
            <p className="text-sm text-gray-500 mt-2">
              Tempo estimado de leitura: {readTimeMinutes} minutos
            </p>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate(`/post/${id}`)}
              className="w-1/2 bg-gray-300 text-gray-800 py-4 rounded-lg hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-1/2 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {isLoading ? (
                <>
                  <ProgressSpinner
                    style={{ width: "20px", height: "20px", color: "white" }}
                    color="white"
                  />
                  <span>Atualizando post...</span>
                </>
              ) : (
                "Atualizar Post"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditPost;