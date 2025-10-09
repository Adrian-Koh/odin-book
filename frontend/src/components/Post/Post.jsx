import { useContext, useEffect, useState } from "react";
import styles from "./Post.module.css";
import { HomeContext } from "../../pages/Home/Home";
import { getTimeSincePost } from "../../utils/timeUtils";
import { deletePost, editPost, togglePostLike } from "../../api/posts";
import {
  getPostComments,
  submitComment,
  editComment,
} from "../../api/comments";

const Post = ({
  post,
  posts,
  setPosts,
  commentsActiveId,
  setCommentsActiveId,
  setDisplayLikesId,
}) => {
  const [comment, setComment] = useState("");
  const [editPostActive, setEditPostActive] = useState(false);
  const [postInput, setPostInput] = useState("");
  const [editCommentId, setEditCommentId] = useState(-1);
  const [editCommentInput, setEditCommentInput] = useState("");
  const { user } = useContext(HomeContext);

  useEffect(() => {
    if (post) {
      setPostInput(post.caption);
    }
  }, [post]);

  async function handleLikeClick(like) {
    await togglePostLike(post.id, like);
    const newPosts = [...posts];
    for (const newPost of newPosts) {
      if (post.id === newPost.id) {
        if (like) {
          post.likes.push({ likedBy: user });
        } else {
          post.likes = post.likes.filter((like) => like.likedBy.id !== user.id);
        }
      }
    }
    setPosts(newPosts);
  }

  const refreshComments = async () => {
    const newPosts = [...posts];
    for (const newPost of newPosts) {
      if (post.id === newPost.id) {
        const comments = await getPostComments(post.id);
        post.comments = comments;
      }
    }
    setPosts(newPosts);
  };

  async function handleCommentSubmit() {
    await submitComment(post.id, comment);
    refreshComments();
    setComment("");
  }

  async function handleCommentEdit() {
    await editComment(post.id, editCommentId, editCommentInput);
    refreshComments();
    setEditCommentId(-1);
    setEditCommentInput("");
  }

  async function submitEditPost() {
    const editedPost = await editPost(post.id, postInput);
    let newPosts = [...posts];
    for (let i = 0; i < newPosts.length; i++) {
      if (newPosts[i].id === editedPost.id) {
        newPosts[i] = editedPost;
      }
    }
    setPosts(newPosts);
    setEditPostActive(false);
  }

  async function handleDeletePost() {
    await deletePost(post.id);
    const newPosts = posts.filter((newPost) => newPost.id !== post.id);
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
        className={
          post.author.avatarUrl
            ? styles.profilePic
            : `${styles.profilePic} genericPic`
        }
      ></img>
      <div className={styles.authorTime}>
        <div className={styles.author}>
          <div className={styles.displayName}>{post.author.displayName}</div>
          <div className={styles.email}>{post.author.email}</div>
        </div>
        <div className={styles.postTime}>
          {post.editedTime ? (
            <>
              {getTimeSincePost(post.editedTime)} <i>(edited)</i>
            </>
          ) : (
            <>{getTimeSincePost(post.addedTime)}</>
          )}
        </div>
      </div>
      <div className={styles.caption}>
        <div className={styles.captionRow}>
          <i className={styles.captionText}>{post.caption}</i>
          {post.authorId === user.id ? (
            <>
              <img
                src="/pencil.svg"
                className="actionIcon"
                onClick={() => setEditPostActive(!editPostActive)}
              />
              <img
                src="/delete.svg"
                className="actionIcon"
                onClick={handleDeletePost}
              />
            </>
          ) : null}
        </div>
        {editPostActive ? (
          <div className={styles.editPostInput}>
            <input
              type="text"
              value={postInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submitEditPost();
                }
              }}
              onChange={(e) => setPostInput(e.target.value)}
            />
            <img
              src="/send.svg"
              className="actionIcon"
              onClick={submitEditPost}
            />
          </div>
        ) : null}
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
              post.likes.filter((like) => like.likedBy.id === user.id).length >
              0
                ? `${styles.likeIcon} ${styles.liked}`
                : `${styles.likeIcon}`
            }
            onClick={() =>
              handleLikeClick(
                !post.likes.filter((like) => like.likedBy.id === user.id)
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
      <div
        className={styles.viewLikes}
        onClick={() => setDisplayLikesId(post.id)}
      >
        View likes
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
                    className={
                      comment.author.avatarUrl
                        ? styles.commentPic
                        : `${styles.commentPic} genericPic`
                    }
                  />
                  <div className={styles.commentAuthor}>
                    <b>{comment.author.displayName}</b>{" "}
                    <span className={styles.commentEmail}>
                      ({comment.author.email})
                    </span>
                  </div>
                  <div className={styles.commentText}>{comment.text}</div>
                  {comment.author.id === user.id ? (
                    <div className={styles.actionIcons}>
                      <img
                        src="/pencil.svg"
                        className="actionIcon"
                        onClick={() => {
                          setEditCommentId(comment.id);
                          setEditCommentInput(comment.text);
                        }}
                      />
                      <img src="/delete.svg" className="actionIcon" />
                    </div>
                  ) : null}
                  {editCommentId === comment.id ? (
                    <div className={styles.editCommentSection}>
                      <input
                        type="text"
                        value={editCommentInput}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleCommentEdit();
                          }
                        }}
                        onChange={(e) => setEditCommentInput(e.target.value)}
                      />
                      <img
                        src="/send.svg"
                        alt="send"
                        onClick={handleCommentEdit}
                        className="actionIcon"
                      />
                    </div>
                  ) : null}
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
                  handleCommentSubmit();
                }
              }}
              onChange={(e) => setComment(e.target.value)}
            />
            <img
              src="/send.svg"
              alt="send"
              onClick={handleCommentSubmit}
              className="actionIcon"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export { Post };
