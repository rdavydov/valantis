import { API, PRODUCTS_PER_PAGE } from "../.env";
import generateHashedToken from "./generateHashedToken";

const fetchProductsPerPage = async (
  page,
  amount,
  filterMethod,
  filterValue
) => {
  let products;
  const hashedToken = generateHashedToken(false);
  // console.log(
  //   `page: ${page}\namount: ${amount}\nfilterMethod: ${filterMethod}\nfilterValue: ${filterValue}`
  // );
  switch (filterMethod) {
    case "noFilter":
      try {
        const idsResponse = await fetch(API, {
          method: "POST",
          body: JSON.stringify({
            action: "get_ids",
            params: {
              offset: page ? page - 1 : 0,
              limit: amount ?? PRODUCTS_PER_PAGE + 1,
            },
          }),
          headers: {
            "Content-Type": "application/json;",
            "X-Auth": hashedToken,
          },
        });

        const ids = await idsResponse.json();

        // console.log(`Trying to fetch ${ids.result.length} items..`);

        const itemsResponse = await fetch(API, {
          method: "POST",
          body: JSON.stringify({
            action: "get_items",
            params: { ids: ids.result },
          }),
          headers: {
            "Content-Type": "application/json;",
            "X-Auth": hashedToken,
          },
        });

        products = await itemsResponse.json();

        // console.log(`Got ${products.result.length} items`);
      } catch (err) {
        throw new Error(err);
      }
      break;
    case "byPrice":
      try {
        const idsResponse = await fetch(API, {
          method: "POST",
          body: JSON.stringify({
            action: "filter",
            params: { price: Number(filterValue) },
          }),
          headers: {
            "Content-Type": "application/json;",
            "X-Auth": hashedToken,
          },
        });
        const ids = await idsResponse.json();

        // console.log(`Trying to fetch ${ids.result.length} filtered items..`);

        const itemsResponse = await fetch(API, {
          method: "POST",
          body: JSON.stringify({
            action: "get_items",
            params: { ids: ids.result },
          }),
          headers: {
            "Content-Type": "application/json;",
            "X-Auth": hashedToken,
          },
        });

        products = await itemsResponse.json();
        // console.log(`Got ${products.result.length} items`);
      } catch (err) {
        throw new Error(err);
      }
      break;
    case "byName":
      try {
        const idsResponse = await fetch(API, {
          method: "POST",
          body: JSON.stringify({
            action: "filter",
            params: { product: filterValue },
          }),
          headers: {
            "Content-Type": "application/json;",
            "X-Auth": hashedToken,
          },
        });
        const ids = await idsResponse.json();

        // console.log(`Trying to fetch ${ids.result.length} filtered items..`);

        const itemsResponse = await fetch(API, {
          method: "POST",
          body: JSON.stringify({
            action: "get_items",
            params: { ids: ids.result },
          }),
          headers: {
            "Content-Type": "application/json;",
            "X-Auth": hashedToken,
          },
        });

        products = await itemsResponse.json();
        // console.log(`Got ${products.result.length} items`);
      } catch (err) {
        throw new Error(err);
      }
      break;
    case "byBrand":
      try {
        const idsResponse = await fetch(API, {
          method: "POST",
          body: JSON.stringify({
            action: "filter",
            params: { brand: filterValue },
          }),
          headers: {
            "Content-Type": "application/json;",
            "X-Auth": hashedToken,
          },
        });
        const ids = await idsResponse.json();

        // console.log(`Trying to fetch ${ids.result.length} filtered items..`);

        const itemsResponse = await fetch(API, {
          method: "POST",
          body: JSON.stringify({
            action: "get_items",
            params: { ids: ids.result },
          }),
          headers: {
            "Content-Type": "application/json;",
            "X-Auth": hashedToken,
          },
        });

        products = await itemsResponse.json();
        // console.log(`Got ${products.result.length} items`);
      } catch (err) {
        throw new Error(err);
      }
      break;
    default:
      products = null;
      break;
  }
  return products;
};

export default fetchProductsPerPage;
