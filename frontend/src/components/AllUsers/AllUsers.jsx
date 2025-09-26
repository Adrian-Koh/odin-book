import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import styles from "./AllUsers.module.css";
import { getAllUsers } from "../../api/users";

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersCb = async () => {
      const fetchedUsers = await getAllUsers();
      setUsers(fetchedUsers);
    };
    fetchUsersCb();
  }, []);

  return (
    <div className={styles.container}>
      <h2>All Users</h2>
      <div className={styles.allUsers}>
        {users.map((user) => (
          <div className={styles.user}>
            <img
              src={user.avatarUrl ? user.avatarUrl : "/face-man-profile.svg"}
              alt="profile pic"
              className={styles.profilePic}
            ></img>
            <div className={styles.displayName}>{user.displayName}</div>
            <div className={styles.email}>{user.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { AllUsers };
