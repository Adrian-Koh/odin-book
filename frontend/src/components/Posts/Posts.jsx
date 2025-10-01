import { useContext, useEffect, useState, useRef } from "react";
import styles from "./Posts.module.css";
import { getPosts, submitNewPost } from "../../api/posts";
import { HomeContext } from "../../pages/Home/Home";
import { Post } from "../Post/Post";

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
          <img
            src="/send.svg"
            alt="send"
            onClick={handleNewPostSubmit}
            className="submit"
          />
        </div>
      </div>
      {posts && posts.length > 0 ? (
        <div className={styles.posts}>
          {posts.map((post) => (
            <Post
              post={post}
              posts={posts}
              setPosts={setPosts}
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
