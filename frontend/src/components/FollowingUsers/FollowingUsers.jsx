import { useEffect, useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import styles from "./FollowingUsers.module.css";
import { getFollowingUsers } from "../../api/users";

const FollowingUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersCb = async () => {
      const fetchedUsers = await getFollowingUsers();
      setUsers(fetchedUsers);
    };
    fetchUsersCb();
  }, []);

  return <h2>Following</h2>;
};

export { FollowingUsers };
