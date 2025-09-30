import { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { HomeContext } from "../../pages/Home/Home";
import { Post } from "../Post/Post";
import { getUserPosts } from "../../api/posts";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [commentsActiveId, setCommentsActiveId] = useState(-1);
  const { user } = useContext(HomeContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await getUserPosts();
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Profile</h2>
      <div className={styles.info}>
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt="profile pic"
            className={styles.profilePic}
          />
        ) : null}
        <h3 className={styles.displayName}>{user.displayName}</h3>
        <div className={styles.email}>
          <i>{user.email}</i>
        </div>
      </div>
      {posts && posts.length > 0 ? (
        <>
          <h4 className={styles.postsTitle}>Posts</h4>
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
        </>
      ) : (
        <p>This user has no posts.</p>
      )}
    </div>
  );
};

export { Profile };
