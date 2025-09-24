import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { Error } from "../../components/Error/Error";

export default function Home() {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  return (
    <div className={styles.home}>
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
      <Error error={error} setError={setError} />
      <div className={styles.container}>
        <Outlet context={{ setUser, setError }}></Outlet>
      </div>
    </div>
  );
}
