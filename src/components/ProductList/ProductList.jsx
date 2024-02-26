import styles from "./ProductList.module.css";
import Product from "../Product/Product";

const ProductList = ({ products }) => {
  return (
    <div className={styles.productListContainer}>
      <p>Всего на странице: {products.length} товаров</p>
      <div className={styles.productList}>
        {products &&
          products.map((product) => (
            <Product
              key={product.id}
              id={product.id}
              name={product.product}
              price={product.price}
              brand={product.brand}
            />
          ))}
      </div>
    </div>
  );
};

export default ProductList;
