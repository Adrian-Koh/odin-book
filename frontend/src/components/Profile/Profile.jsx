import { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import { HomeContext } from "../../pages/Home/Home";
import { Post } from "../Post/Post";
import { getUserPosts } from "../../api/posts";
import { useSearchParams } from "react-router-dom";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [commentsActiveId, setCommentsActiveId] = useState(-1);
  const [profileUser, setProfileUser] = useState(null);
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const { user, following } = useContext(HomeContext);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchPosts = async () => {
      if (profileUser) {
        const fetchedPosts = await getUserPosts(profileUser.id);
        setPosts(fetchedPosts);
      }
    };
    fetchPosts();
  }, [profileUser]);

  useEffect(() => {
    const userId = searchParams.get("id");
    if (userId) {
      const foundUser = following.find(
        (follow) => follow.followingId === Number(userId)
      );
      setProfileUser(foundUser.following);
    } else {
      setProfileUser(user);
    }
  }, [searchParams]);

  function handlePhotoSubmit() {}
  function handleNameSubmit() {}

  return profileUser ? (
    <div className={styles.container}>
      <h2>Profile</h2>
      <div className={styles.info}>
        {profileUser.avatarUrl ? (
          <img
            src={profileUser.avatarUrl}
            alt="profile pic"
            className={styles.profilePic}
          />
        ) : null}
        {profileUser.id === user.id ? (
          <div className={styles.fileInput}>
            <label htmlFor="file">
              {profileUser.avatarUrl ? "Edit" : "Add"} profile pic:{" "}
            </label>
            <input
              type="file"
              id="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept="image/*"
            />
            <input type="submit" onClick={handlePhotoSubmit} />
          </div>
        ) : null}
        <h3 className={styles.displayName}>
          {profileUser.displayName}
          {profileUser.id === user.id ? (
            <div className={styles.nameInput}>
              <label htmlFor="name">Edit name:</label>
              <input
                type="text"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
              <input type="submit" onClick={handleNameSubmit} />
            </div>
          ) : null}
        </h3>
        <div className={styles.email}>
          <i>{profileUser.email}</i>
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
  ) : (
    <p>No user</p>
  );
};

export { Profile };
