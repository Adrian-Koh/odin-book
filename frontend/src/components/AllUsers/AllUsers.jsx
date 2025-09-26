import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import styles from "./AllUsers.module.css";
import {
  toggleFollowUser,
  getAllUsers,
  getFollowingUsers,
} from "../../api/users";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState([]);

  const fetchFollowingCb = async () => {
    const fetchedFollowingUsers = await getFollowingUsers();
    const followingUserIds = fetchedFollowingUsers.map(
      (user) => user.followingId
    );
    setFollowing(followingUserIds);
  };

  useEffect(() => {
    const fetchUsersCb = async () => {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    };
    fetchUsersCb();
    fetchFollowingCb();
  }, []);

  async function handleFollowClick(userId, follow) {
    await toggleFollowUser(userId, follow);
    fetchFollowingCb();
  }

  return (
    <div className={styles.container}>
      <h2>All Users</h2>
      <div className={styles.allUsers}>
        {users.map((user) => (
          <div className={styles.user} key={user.id}>
            <img
              src={user.avatarUrl ? user.avatarUrl : "/face-man-profile.svg"}
              alt="profile pic"
              className={styles.profilePic}
            ></img>
            <div className={styles.displayName}>{user.displayName}</div>
            <div className={styles.email}>{user.email}</div>
            <div className={styles.following}>
              {following.includes(user.id) ? (
                <button
                  className={styles.followingBtn}
                  onClick={() => handleFollowClick(user.id, false)}
                >
                  <img
                    src="/check.svg"
                    alt="unfollow"
                    className={styles.followingIcon}
                  />
                  Following
                </button>
              ) : (
                <button
                  className={styles.followBtn}
                  onClick={() => handleFollowClick(user.id, true)}
                >
                  <img
                    src="/plus.svg"
                    alt="follow"
                    className={styles.followIcon}
                  />
                  Follow
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { AllUsers };
