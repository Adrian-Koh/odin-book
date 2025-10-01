import { useContext, useState } from "react";
import styles from "./Post.module.css";
import { HomeContext } from "../../pages/Home/Home";
import { getTimeSincePost } from "../../utils/timeUtils";
import { togglePostLike } from "../../api/posts";
import { getPostComments, submitComment } from "../../api/comments";

const Post = ({
  post,
  posts,
  setPosts,
  commentsActiveId,
  setCommentsActiveId,
}) => {
  const [comment, setComment] = useState("");

  const { user } = useContext(HomeContext);

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

  return (
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
      <div className={styles.authorTime}>
        <div className={styles.author}>
          <div className={styles.displayName}>{post.author.displayName}</div>
          <div className={styles.email}>{post.author.email}</div>
        </div>
        <div className={styles.postTime}>
          {post.editedTime ? (
            <>
              {getTimeSincePost(post.editedTime)} ago <i>(edited)</i>
            </>
          ) : (
            <>{getTimeSincePost(post.addedTime)} ago</>
          )}
        </div>
      </div>
      <div className={styles.caption}>
        <i>{post.caption}</i>
      </div>
      {post.photoUrl ? (
        <img
          src={post.photoUrl}
          alt="post image"
          className={styles.postImage}
        />
      ) : null}
      <div className={styles.likesComments}>
        <div className={styles.likes}>
          <img
            src="/heart.svg"
            alt="heart"
            className={
              post.likes.filter((like) => like.likedById === user.id).length > 0
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
        <div
          className={styles.comments}
          onClick={() => setCommentsActiveId(post.id)}
        >
          <img
            src="/comment.svg"
            alt="comment"
            className={styles.commentIcon}
          />
          {post.comments.length}
        </div>
      </div>
      {commentsActiveId === post.id ? (
        <div className={styles.commentSection}>
          {post.comments && post.comments.length > 0 ? (
            <>
              <div className={styles.commentsTitle}>Comments</div>
              {post.comments.map((comment) => (
                <div className={styles.comment} key={comment.id}>
                  <img
                    src={
                      comment.author.avatarUrl
                        ? comment.author.avatarUrl
                        : "/face-man-profile.svg"
                    }
                    className={styles.commentPic}
                  />
                  <div className={styles.commentAuthor}>
                    <b>{comment.author.displayName}</b>{" "}
                    <span className={styles.commentEmail}>
                      ({comment.author.email})
                    </span>
                  </div>
                  <div className={styles.commentText}>{comment.text}</div>
                </div>
              ))}
            </>
          ) : null}
          <div className={styles.commentsInput}>
            <input
              type="text"
              placeholder="Add a comment..."
              value={comment}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleCommentSubmit(post.id, comment);
                  setComment("");
                }
              }}
              onChange={(e) => setComment(e.target.value)}
            />
            <img
              src="/send.svg"
              alt="send"
              onClick={() => {
                handleCommentSubmit(post.id, comment);
                setComment("");
              }}
              className="submit"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export { Post };
