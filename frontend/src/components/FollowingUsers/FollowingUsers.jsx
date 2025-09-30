import { useEffect, useContext } from "react";
import styles from "./FollowingUsers.module.css";
import { HomeContext } from "../../pages/Home/Home";
import { useNavigate } from "react-router-dom";

const FollowingUsers = () => {
  const { following, fetchFollowing } = useContext(HomeContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFollowing();
  }, []);

  function handleUserClick(userId) {
    navigate("/profile?id=" + userId);
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Following</h2>
      <div className={styles.followingUsers}>
        {following.map((follow) => (
          <div
            className={styles.user}
            key={follow.followingId}
            onClick={() => handleUserClick(follow.followingId)}
          >
            <img
              src={
                follow.following.avatarUrl
                  ? follow.following.avatarUrl
                  : "/face-man-profile.svg"
              }
              alt="profile pic"
              className={styles.profilePic}
            ></img>
            <div className={styles.displayName}>
              {follow.following.displayName}
            </div>
            <div className={styles.email}>{follow.following.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { FollowingUsers };
