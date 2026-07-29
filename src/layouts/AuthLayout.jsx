import styles from "./AuthLayout.module.css";

function AuthLayout({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>{children}</div>
    </div>
  );
}

export default AuthLayout;
