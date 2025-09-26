import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import styles from "./Posts.module.css";
import { getPosts, togglePostLike } from "../../api/posts";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useOutletContext();

  useEffect(() => {
    const fetchPostsCb = async () => {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    };
    fetchPostsCb();
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

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Posts</h2>
      {posts && posts.length > 0 ? (
        <div className={styles.posts}>
          {posts.map((post) => (
            <div className={styles.post} key={post.id}>
              <img
                src={
                  post.author.avatarUrl
                    ? post.author.avatarUrl
                    : "/face-man-profile.svg"
                }
                alt="profile pic"
                className={styles.profilePic}
              ></img>
              <div className={styles.author}>{post.author.displayName}</div>
              <div className={styles.caption}>{post.caption}</div>
              <div className={styles.likes}>
                <img
                  src="/heart.svg"
                  alt="heart"
                  className={
                    post.likes.filter((like) => like.likedById === user.id)
                      .length > 0
                      ? `${styles.likeIcon} ${styles.liked}`
                      : `${styles.likeIcon}`
                  }
                  onClick={() =>
                    handleLikeClick(
                      post.id,
                      !post.likes.filter((like) => like.likedById === user.id)
                        .length > 0
                    )
                  }
                />
                {post.likes.length}
              </div>
              <div className={styles.comments}>
                <img
                  src="/comment.svg"
                  alt="comment"
                  className={styles.commentIcon}
                />
                {post.comments.length}
              </div>
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
