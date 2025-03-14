import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Editor } from "primereact/editor";
import { Toast } from "primereact/toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { useFirebase } from "../../hooks/useFirebase";
import { auth } from "../../../firebase.config";
import { User } from "firebase/auth";

const CreatePost = () => {
  const navigate = useNavigate();
  const toast = useRef<Toast>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userAuth, setUserAuth] = useState<any>();
  const [content, setContent] = useState("");
  const [readTimeMinutes, setReadTimeMinutes] = useState(1);
  const [previewMode, setPreviewMode] = useState(false);
  const [title, setTitle] = useState("");

  const { handleSubmitPost } = useFirebase();

  useEffect(() => {
    const handleAuthStateChange = (user: User | null) => {
      setUserAuth(user);
    };
    auth.onAuthStateChanged(handleAuthStateChange);
  }, []);

  // Calcula o tempo de leitura baseado no conteúdo
  useEffect(() => {
    const textContent = content.replace(/<[^>]*>/g, ""); // Remove HTML tags
    const charCount = textContent.length;
    
    // 22 segundos para 200 caracteres = 545 caracteres por minuto
    const charsPerMinute = (60 / 22) * 200;
    
    const timeToRead = Math.max(1, Math.ceil(charCount / charsPerMinute));
    setReadTimeMinutes(timeToRead);
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (!content.trim()) {
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "O conteúdo do post não pode estar vazio",
        life: 3000,
      });
      return;
    }

    try {
      setIsLoading(true);

      const postData = {
        title,
        content,
        author: auth.currentUser?.displayName,
        readTime: `${readTimeMinutes} min de leitura`,
        createdAt: new Date().toISOString(),
      };

      await handleSubmitPost(postData);

      toast.current?.show({
        severity: "success",
        summary: "Sucesso",
        detail: "Post criado com sucesso!",
        life: 3000,
      });

      navigate("/");
      // navigate("/");
    } catch (error) {
      console.error("Erro ao criar post:", error);
      toast.current?.show({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao criar o post. Tente novamente.",
        life: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const PreviewPost = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm text-gray-500">
          {`${readTimeMinutes} min de leitura`} - {userAuth.displayName}
        </span>
        <span className="text-sm text-gray-500">
          {new Date().toLocaleString()}
        </span>
      </div>

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );

  return (
    <div className="container mx-auto my-8 py-8 px-8 max-w-5xl border border-gray-300 rounded-lg shadow-lg">
      <Toast ref={toast} />
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Criar Novo Post</h1>
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
              onChange={(e: any) => setTitle(e.target.value)}
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

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2
              ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? (
              <>
                <ProgressSpinner
                  style={{ width: "20px", height: "20px", color: "white" }}
                  color="white"
                />
                <span>Criando post...</span>
              </>
            ) : (
              "Publicar Post"
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default CreatePost;
