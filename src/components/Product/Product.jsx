import styles from "./Product.module.css";

const Product = ({ id, name, price, brand }) => {
  return (
    <div className={styles.productContainer}>
      <div className={styles.product}>
        <p className={styles.productName}>{name ?? "Без имени"}</p>
        <p className={styles.productPrice}>{price + " ₽" ?? "Без цены"}</p>
        <p className={styles.productBrand}>{brand ?? "Без бренда"}</p>
        <p className={styles.productId}>{id ?? "Без ID"}</p>
      </div>
    </div>
  );
};

export default Product;
