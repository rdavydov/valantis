import { API } from "../.env";
import generateHashedToken from "./generateHashedToken";

const fetchProducts = async () => {
  let products;
  const hashedToken = generateHashedToken(true);

  try {
    const idsResponse = await fetch(API, {
      method: "POST",
      body: JSON.stringify({
        action: "get_ids",
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

  return products;
};

export default fetchProducts;
