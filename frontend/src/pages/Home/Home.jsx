import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Error } from "../../components/Error/Error";
import { UsersList } from "../../components/UsersList/UsersList";
import { getUserFromToken } from "../../utils/tokenUtils";

export default function Home() {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
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

  return (
    <div className={styles.home}>
      <h1 className={styles.title}>Odinbook</h1>
      <Error error={error} setError={setError} className={styles.error} />
      <div className={styles.navBar}>
        <nav className={styles.navLinks}>
          <Link to="/">Home</Link>
          {user ? (
            <>
              <Link to="profile">Profile</Link>
            </>
          ) : (
            <>
              <Link to="login">Log In</Link>
              <Link to="signup">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
      <div className={styles.container}>
        <Outlet context={{ setUser, setError }}></Outlet>
      </div>
      <UsersList className={styles.usersList} />
    </div>
  );
}
