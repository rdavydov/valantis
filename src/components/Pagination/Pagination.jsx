import styles from "./Pagination.module.css";

export const Pagination = ({
  pages,
  onNextPageClick,
  onPrevPageClick,
  disable,
}) => {
  // console.log("Current page:", pages.current, "Total pages:", pages.total);

  const handleNextPageClick = () => {
    onNextPageClick();
  };
  const handlePrevPageClick = () => {
    onPrevPageClick();
  };

  return (
    <div className={styles.paginationContainer}>
      <button
        className={styles.paginationButton}
        onClick={handlePrevPageClick}
        disabled={disable.left}
      >
        &lt;
      </button>

      {pages && (
        <span className={styles.paginationPages}>
          {pages.current} / {pages.total ? pages.total : "Загрузка..."}
        </span>
      )}

      <button
        className={styles.paginationButton}
        onClick={handleNextPageClick}
        disabled={disable.right}
      >
        &gt;
      </button>
    </div>
  );
};
