import styles from "./Spinner.module.css";

export const Spinner = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}>
        <div className={styles.spinner}></div>
        <h2 className={styles.loadingText}>Загрузка...</h2>
      </div>
    </div>
  );
};
