import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import styles from "./Posts.module.css";
import { getPosts } from "../../api/posts";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPostsCb = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    };
    fetchPostsCb();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Posts</h2>
      {posts && posts.length > 0 ? (
        <div className={styles.posts}>
          {posts.map((post) => (
            <div className={styles.post}>
              <img
                src={post.author.avatarUrl}
                alt="profile pic"
                className={styles.profilePic}
              ></img>
              <div className={styles.author}>{post.author.displayName}</div>
              <div className={styles.caption}>{post.caption}</div>
            </div>
          ))}
        </div>
      ) : (
        <p>There are no posts.</p>
      )}
    </div>
  );
};

export { Posts };
