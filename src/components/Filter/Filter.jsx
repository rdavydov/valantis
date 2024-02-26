import { useState } from "react";
import styles from "./Filter.module.css";

export const Filter = ({ filter }) => {
  const [filterMethod, setFilterMethod] = useState("noFilter");
  const [filterValue, setFilterValue] = useState("");

  const handleFilterMethod = (e) => {
    setFilterMethod(e.target.value);
  };

  const handleFilterValue = (e) => {
    setFilterValue(e.target.value);
  };

  const applyFilter = (e) => {
    e.preventDefault();
    filter(filterMethod, filterValue);
  };

  return (
    <div className={styles.filter}>
      <label>Фильтр: </label>
      <select
        className={styles.customSelect}
        value={filterMethod}
        onChange={handleFilterMethod}
      >
        <option value="noFilter">Нет</option>
        <option value="byPrice">По цене</option>
        <option value="byName">По названию</option>
        <option value="byBrand">По бренду</option>
      </select>
      <input
        className={styles.customInput}
        type="text"
        onChange={handleFilterValue}
        value={filterValue}
      />
      <input
        className={styles.customButton}
        type="submit"
        value="Применить"
        onClick={applyFilter}
      />
    </div>
  );
};
