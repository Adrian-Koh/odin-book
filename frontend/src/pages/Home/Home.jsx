import { Outlet, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Error } from "../../components/Error/Error";
import { UsersList } from "../../components/UsersList/UsersList";

export default function Home() {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // grab token from login redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      window.history.replaceState({}, document.title, "/");
    }
  }, [navigate]);

  return (
    <div className={styles.home}>
      <Error error={error} setError={setError} className={styles.error} />
      <div className={styles.navBar}>
        <nav className={styles.navLinks}>
          <Link to="/">Home</Link>
          {user ? null : (
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
