import styles from "./PostLikes.module.css";

const PostLikes = ({ likes, closePanel }) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Post likes</h3>
      <img
        src="/close-box-outline.svg"
        alt="close likes"
        onClick={closePanel}
        className={styles.closeBtn}
      />
      {likes && likes.length > 0 ? (
        likes.map((like) => (
          <div className={styles.userLike}>
            <img
              src={
                like.likedBy.avatarUrl
                  ? like.likedBy.avatarUrl
                  : "/face-man-profile.svg"
              }
              className={
                like.likedBy.avatarUrl
                  ? styles.profilePic
                  : `${styles.profilePic} genericPic`
              }
            />
            <div className={styles.name}>{like.likedBy.displayName}</div>
          </div>
        ))
      ) : (
        <p>No likes.</p>
      )}
    </div>
  );
};

export { PostLikes };
