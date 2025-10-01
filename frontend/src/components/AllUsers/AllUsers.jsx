import { useContext, useEffect, useState } from "react";
import styles from "./AllUsers.module.css";
import { toggleFollowUser, getAllUsers } from "../../api/users";
import { HomeContext } from "../../pages/Home/Home";
import { useNavigate } from "react-router-dom";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const { following, fetchFollowing } = useContext(HomeContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersCb = async () => {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    };
    fetchUsersCb();
    fetchFollowing();
  }, []);

  async function handleFollowClick(userId, follow) {
    await toggleFollowUser(userId, follow);
    fetchFollowing();
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
            {following.filter((follow) => follow.followingId === user.id)
              .length > 0 ? (
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
        ))}
      </div>
    </div>
  );
};

export { AllUsers };
