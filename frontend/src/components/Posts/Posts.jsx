import { useContext, useEffect, useState, useRef } from "react";
import styles from "./Posts.module.css";
import { getPosts, togglePostLike, submitNewPost } from "../../api/posts";
import { HomeContext } from "../../pages/Home/Home";
import { Post } from "../Post/Post";
import { getPostComments, submitComment } from "../../api/comments";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [newPostInput, setNewPostInput] = useState("");
  const [file, setFile] = useState(null);
  const [commentsActiveId, setCommentsActiveId] = useState(-1);

  const { user } = useContext(HomeContext);
  const fileInputRef = useRef(null);

  const fetchPosts = async () => {
    const fetchedPosts = await getPosts();
    setPosts(fetchedPosts);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  async function handleLikeClick(postId, like) {
    await togglePostLike(postId, like);
    const newPosts = [...posts];
    for (const post of newPosts) {
      if (post.id === postId) {
        if (like) {
          post.likes.push({ likedById: user.id, postId });
        } else {
          post.likes = post.likes.filter((like) => like.likedById !== user.id);
        }
      }
    }
    setPosts(newPosts);
  }

  async function handleCommentSubmit(postId, comment) {
    await submitComment(postId, comment);
    const newPosts = [...posts];
    for (const post of newPosts) {
      if (post.id === postId) {
        const comments = await getPostComments(postId);
        post.comments = comments;
      }
    }
    setPosts(newPosts);
  }

  async function handleNewPostSubmit() {
    await submitNewPost(newPostInput, file);
    fetchPosts();
    setNewPostInput("");
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Posts</h2>
      <div className={styles.createPost}>
        <img
          src={
            user && user.avatarUrl ? user.avatarUrl : "/face-man-profile.svg"
          }
          alt="logged in pic"
          className={styles.loggedInPic}
        />
        <h3 className={styles.newPostTitle}>Create new post</h3>
        <div className={styles.fileInput}>
          Attach a photo:{" "}
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*"
            ref={fileInputRef}
          />
        </div>
        <div className={styles.inputs}>
          <input
            type="text"
            placeholder="Post something..."
            className={styles.postInput}
            value={newPostInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleNewPostSubmit();
              }
            }}
            onChange={(e) => {
              setNewPostInput(e.target.value);
            }}
          />
          <input type="submit" onClick={handleNewPostSubmit} />
        </div>
      </div>
      {posts && posts.length > 0 ? (
        <div className={styles.posts}>
          {posts.map((post) => (
            <Post
              post={post}
              handleLikeClick={handleLikeClick}
              handleCommentSubmit={handleCommentSubmit}
              commentsActiveId={commentsActiveId}
              setCommentsActiveId={setCommentsActiveId}
            />
          ))}
        </div>
      ) : (
        <p>There are no posts.</p>
      )}
    </div>
  );
};

export { Posts };
