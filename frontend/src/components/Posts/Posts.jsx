import { useContext, useEffect, useState, useRef } from "react";
import styles from "./Posts.module.css";
import { getPosts, togglePostLike, submitNewPost } from "../../api/posts";
import { HomeContext } from "../../pages/Home/Home";
import { getPostComments, submitComment } from "../../api/comments";
import { getTimeSincePost } from "../../utils/timeUtils";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [newPostInput, setNewPostInput] = useState("");
  const [file, setFile] = useState(null);
  const [commentsActiveId, setCommentsActiveId] = useState(-1);
  const [comment, setComment] = useState("");

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

  async function handleCommentSubmit(postId) {
    await submitComment(postId, comment);
    setComment("");
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
                  <div className={styles.displayName}>
                    {post.author.displayName}
                  </div>
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
                          <div className={styles.commentText}>
                            {comment.text}
                          </div>
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
                          handleCommentSubmit(post.id);
                        }
                      }}
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <input
                      type="submit"
                      onClick={() => handleCommentSubmit(post.id)}
                    />
                  </div>
                </div>
              ) : null}
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
