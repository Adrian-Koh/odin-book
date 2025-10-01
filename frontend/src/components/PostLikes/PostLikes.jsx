import styles from "./PostLikes.module.css";

const PostLikes = ({ likes, closePanel }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Post likes</h3>
      <button onClick={closePanel}>Close</button>
      {likes && likes.length > 0 ? (
        likes.map((like) => (
          <div className={styles.userLike}>{like.likedBy.displayName}</div>
        ))
      ) : (
        <p>No likes.</p>
      )}
    </div>
  );
};

export { PostLikes };
