import { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { HomeContext } from "../../pages/Home/Home";
import { getUserPosts } from "../../api/posts";

const Profile = () => {
  const [posts, setPosts] = useState([]);
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
      {user.avatarUrl ? (
        <img
          src={user.avatarUrl}
          alt="profile pic"
          className={styles.profilePic}
        />
      ) : null}
      <h3 className={styles.displayName}>{user.displayName}</h3>
      <div className={styles.email}>Email: {user.email}</div>
      {posts && posts.length > 0 ? (
        <>
          <h4>Posts</h4>
          <div className={styles.posts}>
            {posts.map((post) => (
              <div className={styles.post}>
                <div className={styles.caption}>{post.caption}</div>
                {post.photoUrl ? (
                  <img src={post.photoUrl} className={styles.postPhoto} />
                ) : null}
              </div>
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
