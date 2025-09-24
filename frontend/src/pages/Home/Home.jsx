import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Error } from "../../components/Error/Error";
import { UsersList } from "../../components/UsersList/UsersList";

export default function Home() {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

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
