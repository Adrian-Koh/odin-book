import { Outlet, Link, useNavigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Error } from "../../components/Error/Error";
import { FollowingUsers } from "../../components/FollowingUsers/FollowingUsers";
import { getUserFromToken, removeToken } from "../../utils/tokenUtils";
import { getFollowingUsers } from "../../api/users";

const HomeContext = createContext({});
export default function Home() {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getUserFromToken());
  }, []);

  // grab token from login redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, document.title, "/");
      setUser(getUserFromToken());
    }
  }, [navigate]);

  const fetchFollowing = async () => {
    const fetchedUsers = await getFollowingUsers();
    setFollowing(fetchedUsers);
  };

  function handleLogOut() {
    removeToken();
    setUser(null);
  }

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Odinbook</h1>
      <Error error={error} setError={setError} className={styles.error} />
      <div className={styles.navBar}>
        <nav className={styles.navLinks}>
          <Link to="/">Home</Link>
          {user ? (
            <>
              <Link to="users">Users</Link>
              <Link to="profile">Profile</Link>
              <img
                src="/logout-variant.svg"
                alt="logout"
                className={styles.logOut}
                onClick={handleLogOut}
              />
            </>
          ) : (
            <>
              <Link to="login">Log In</Link>
              <Link to="signup">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
      <HomeContext
        value={{ user, setUser, setError, following, fetchFollowing }}
      >
        {user ? (
          <>
            <div className={styles.container}>
              <Outlet></Outlet>
            </div>
            <FollowingUsers className={styles.followingUsers} />
          </>
        ) : (
          <p>
            Welcome to Odinbook! Please log in or sign up to interact with the
            world.
          </p>
        )}
      </HomeContext>
    </div>
  );
}

export { HomeContext };
