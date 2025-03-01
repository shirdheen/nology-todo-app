import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <i className="fa-solid fa-circle-check"></i>tickit.
      </h1>
      <p className={styles.subtitle}>Check off tasks like a pro</p>
    </header>
  );
};

export default Header;
