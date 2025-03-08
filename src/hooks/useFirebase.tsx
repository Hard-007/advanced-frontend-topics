import { signInWithPopup } from "firebase/auth";
import { auth, db, googleProvider } from "../../firebase.config";
import {
  ref,
  set,
  get,
  push,
  onValue,
  child,
  remove,
  increment,
  update,
} from "firebase/database";
import { useEffect, useState } from "react";

interface Comment {
  id: string;
  text: string;
  userId: string;
  userName: string;
  userPhoto: string;
  createdAt: string;
  likes: number;
}

export const useFirebase = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  // auth with login
  const signWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };

  // Post section

  const handleSubmitPost = async (post: any) => {
    try {
      // Criar uma nova referência com ID único
      const newPostRef = push(ref(db, "posts"));
      // Salvar o post com o ID gerado
      await set(newPostRef, {
        ...post,
        id: newPostRef.key,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const subscribeToPath = (path: string, callback: (data: any) => void) => {
    const dbRef = ref(db, path);
    return onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Converter objeto em array se necessário
        const dataArray =
          path === "posts"
            ? Object.entries(data).map(([key, value]: [string, any]) => ({
                id: key,
                ...value,
              }))
            : data;
        callback(dataArray);
      } else {
        callback(path === "posts" ? [] : null);
      }
    });
  };

  // Subscribe to all posts
  useEffect(() => {
    const unsubscribe = subscribeToPath("posts", (newPosts) => {
      setPosts(newPosts || []);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const getPosts = async () => {
    try {
      const snapshot = await get(ref(db, "posts"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.entries(data).map(([key, value]: [string, any]) => ({
          id: key,
          ...value,
        }));
      }
      return [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  const getPostById = async (id: string) => {
    try {
      const snapshot = await get(child(ref(db), `posts/${id}`));
      if (snapshot.exists()) {
        const postData = {
          id: snapshot.key,
          ...snapshot.val(),
        };

        // Fetch comments for this post
        const commentsSnapshot = await get(child(ref(db), `comments/${id}`));
        const commentsData = commentsSnapshot.exists()
          ? commentsSnapshot.val()
          : {};

        // Convert comments object to array and sort by date
        const comments = Object.entries(commentsData)
          .map(([commentId, comment]: [string, any]) => ({
            id: commentId,
            ...comment,
          }))
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        return {
          ...postData,
          comments,
        };
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const addComment = async (postId: string, comment: Omit<Comment, "id">) => {
    try {
      if (!auth.currentUser)
        throw new Error("User must be logged in to comment");

      const newCommentRef = push(ref(db, `comments/${postId}`));
      await set(newCommentRef, {
        ...comment,
        id: newCommentRef.key,
        userId: auth.currentUser.uid,
        userName: auth.currentUser.displayName,
        userPhoto: auth.currentUser.photoURL,
        createdAt: new Date().toISOString(),
        likes: 0,
      });

      // Update post comment count
      const postRef = ref(db, `posts/${postId}`);
      await update(postRef, {
        commentCount: increment(1),
      });

      return newCommentRef.key;
    } catch (error) {
      console.error("Error adding comment:", error);
      throw error;
    }
  };

  const deleteComment = async (postId: string, commentId: string) => {
    try {
      if (!auth.currentUser) throw new Error("User must be logged in");

      const commentRef = ref(db, `comments/${postId}/${commentId}`);
      const commentSnapshot = await get(commentRef);

      if (!commentSnapshot.exists()) throw new Error("Comment not found");

      const comment = commentSnapshot.val();
      if (comment.userId !== auth.currentUser.uid)
        throw new Error("Not authorized");

      await remove(commentRef);

      // Update post comment count
      const postRef = ref(db, `posts/${postId}`);
      await update(postRef, {
        commentCount: increment(-1),
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
      throw error;
    }
  };

  const toggleLike = async (postId: string, commentId?: string) => {
    try {
      if (!auth.currentUser) throw new Error("User must be logged in");

      const userId = auth.currentUser.uid;
      const path = commentId
        ? `comments/${postId}/${commentId}/likes/${userId}`
        : `posts/${postId}/likes/${userId}`;

      const likeRef = ref(db, path);
      const likeSnapshot = await get(likeRef);

      if (likeSnapshot.exists()) {
        // Unlike
        await remove(likeRef);
        await update(
          ref(
            db,
            commentId ? `comments/${postId}/${commentId}` : `posts/${postId}`
          ),
          {
            likeCount: increment(-1),
          }
        );
      } else {
        // Like
        await set(likeRef, {
          userId,
          createdAt: new Date().toISOString(),
        });
        await update(
          ref(
            db,
            commentId ? `comments/${postId}/${commentId}` : `posts/${postId}`
          ),
          {
            likeCount: increment(1),
          }
        );
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      throw error;
    }
  };

  const subscribeToComments = (postId: string) => {
    const commentsRef = ref(db, `comments/${postId}`);
    return onValue(commentsRef, (snapshot) => {
      if (snapshot.exists()) {
        const commentsData = snapshot.val();
        const commentsArray = Object.entries(commentsData)
          .map(([key, value]: [string, any]) => ({
            id: key,
            ...value,
          }))
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        setComments(commentsArray);
      } else {
        setComments([]);
      }
    });
  };

  return {
    signWithGoogle,
    handleSubmitPost,
    getPosts,
    getPostById,
    posts,
    comments,
    subscribeToPath,
    addComment,
    deleteComment,
    toggleLike,
    subscribeToComments,
  };
};
