import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserForm.module.css";
import { submitSignupEmail, submitLoginEmail } from "../../api/authentication";
import { getUserFromToken } from "../../utils/tokenUtils";
import { Error } from "../../components/Error/Error";

const UserForm = ({ action }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();

    if (action === "signup") {
      setLoading(true);
      submitSignupEmail(email, password, name, file)
        .then(() => {
          setLoading(false);
          navigate("/login");
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    } else if (action === "login") {
      setLoading(true);
      submitLoginEmail(email, password)
        .then(() => {
          setLoading(false);
          const user = getUserFromToken();
          //   setUser(user);
          navigate("/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    if (action === "login") {
      setTitle("Log In");
    } else if (action === "signup") {
      setTitle("Sign Up");
    }
  }, [action]);

  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      {loading ? (
        <h2 className={styles.loading}>Loading...</h2>
      ) : (
        <div className={styles.container}>
          <form onSubmit={onSubmit} className={styles.form}>
            <label htmlFor="email">Email: </label>
            <input
              className={styles.inputField}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password: </label>
            <input
              className={styles.inputField}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {action === "signup" ? (
              <>
                <label htmlFor="name">Name: </label>
                <input
                  className={styles.inputField}
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="file">Upload profile picture: </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  accept="image/*"
                />
              </>
            ) : null}
            <input type="submit" className={styles.submit} />
          </form>
          <a
            className={styles.githubLink}
            href="http://localhost:8000/auth/github"
          >
            <img src="/github.svg" alt="Github" className={styles.githubIcon} />
            {title} with GitHub
          </a>
        </div>
      )}
      <Error error={error} setError={setError} />
    </>
  );
};

export { UserForm };
