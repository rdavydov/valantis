import { useEffect, useState, useCallback } from "react";
import fetchProductsPerPage from "./utils/fetchProductsPerPage";
import fetchProducts from "./utils/fetchProducts";
import removeDuplicates from "./utils/removeDuplicates";
import { PRODUCTS_PER_PAGE } from "./.env";
import { Spinner } from "./components/Spinner/Spinner";
import { Filter } from "./components/Filter/Filter";
import { Pagination } from "./components/Pagination/Pagination";
import ProductList from "./components/ProductList/ProductList";

const getTotalPageCount = (rowCount) => {
  // console.log("PRODUCTS_PER_PAGE", PRODUCTS_PER_PAGE);
  // console.log("rowCount", rowCount);
  return Math.ceil(rowCount / PRODUCTS_PER_PAGE);
};

const App = () => {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [filterMethod, setFilterMethod] = useState("noFilter");
  const [filterValue, setFilterValue] = useState("");

  const handleNextPageClick = useCallback(() => {
    const next = page + 1;
    const total = products ? getTotalPageCount(totalItems) : page;
    setPage(next <= total ? next : page);
    window.scrollTo(0,  0);
  }, [page, products, totalItems]);

  const handlePrevPageClick = useCallback(() => {
    const prev = page - 1;
    setPage(prev > 0 ? prev : page);
    window.scrollTo(0,  0);
  }, [page]);

  const handleFilterClick = (method, value) => {
    setPage(1);
    setFilterMethod(method);
    setFilterValue(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await fetchProducts();
        const filteredProducts = removeDuplicates(fetchedProducts.result);
        // console.log("filteredProducts length", filteredProducts.length);
        setTotalItems(filteredProducts.length);
      } catch (err) {
        if (err) {
          console.error('Ошибка:', err);
        }
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let retryTimeoutId = null;
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await fetchProductsPerPage(
          page,
          PRODUCTS_PER_PAGE + 1,
          filterMethod,
          filterValue
        );
        const filteredProducts = removeDuplicates(fetchedProducts.result);
        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        if (err) {
          console.error('Ошибка:', err);
        }
        setProducts([]);

        retryTimeoutId = setTimeout(() => {
          fetchData();
        }, 3000);        
      }
    };
    fetchData();
    
    return () => {
      if (retryTimeoutId) {
        clearTimeout(retryTimeoutId);
      }
    };    
  }, [page, filterMethod, filterValue]);

  return (
    <>
      <Filter filter={handleFilterClick} />
      {isLoading ? <Spinner /> : <ProductList products={products} />}
      {!isLoading && (
        <Pagination
          pages={{
            current: page,
            total: getTotalPageCount(totalItems),
          }}
          onNextPageClick={handleNextPageClick}
          onPrevPageClick={handlePrevPageClick}
          disable={{
            left: page === 1,
            right: page === getTotalPageCount(totalItems),
          }}
        />
      )}
    </>
  );
};

export default App;
