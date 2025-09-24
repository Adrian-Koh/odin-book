import styles from "./Error.module.css";

const Error = ({ error, setError }) => {
  return error ? (
    <div className={styles.errorPanel}>
      {error}{" "}
      <button className={styles.dismissError} onClick={() => setError("")}>
        Dismiss
      </button>
    </div>
  ) : null;
};

export { Error };
