import { useEffect, useContext } from "react";
import styles from "./FollowingUsers.module.css";
import { HomeContext } from "../../pages/Home/Home";

const FollowingUsers = () => {
  const { following, fetchFollowing } = useContext(HomeContext);

  useEffect(() => {
    fetchFollowing();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Following</h2>
      <div className={styles.followingUsers}>
        {following.map((follow) => (
          <div className={styles.user} key={follow.followingId}>
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
