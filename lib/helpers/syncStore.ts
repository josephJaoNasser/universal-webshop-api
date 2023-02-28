import categoryControllers from "@/controllers/categoryControllers";
import productControllers from "@/controllers/productControllers";
import axios from "axios";
import StandardizedCategory from "../types/StandardizedCategory";
import StandardizedProduct from "../types/StandardizedProduct";
import { prune, stripHtml } from "./stripHtml";

/**
 * @desc sync the current webshop's product data with the UTD pages
 * @param storeInfo
 */
export async function syncStoreProducts(storeInfo: StoreInfo) {
  try {
    const controllerParams = {
      method: "getAll",
      credentials: storeInfo.credentials,
      storeInfo,
    };

    const productsList: StandardMultiItemResponse<StandardizedProduct> =
      await productControllers[storeInfo.source](controllerParams);

    // helper function used to make api calls to the UTD builder
    const handleUTDBuilderCall = async (
      product: StandardizedProduct,
      categories: StandardizedCategory[]
    ) => {
      const categoryNames = categories.map((catItem) => catItem.name);
      categoryNames.unshift(storeInfo.categoryAggregator);

      const body = {
        syncId: product.original_id,
        bloggerId: "8989560993773713237",
        metadata: {
          title: product.name,
          description: stripHtml(prune(product.description, 150)),
          image: product.images[0]?.src || "",
          categories: categoryNames,
        },
        payload: {
          locationPageIdSource: storeInfo.locationPageIdSource,
          name: product.name,
          data: product,
        },
      };

      const url = process.env.SITE_BUILDER_API + "/site-builder/location-pages/" +
        storeInfo.siteId +
        "?access_token=" +
        storeInfo.builder_token + '&shop=1';

      try {
        const utdRes = await axios.post(url, body);
        return utdRes;
      } catch (err) {
        throw err;
      }
    };

    // loop through all the products
    productsList.items.forEach((product) => {
      const fetchCategoriesRequest: Promise<StandardizedCategory>[] =
        product.categories.map((catId) =>
          categoryControllers[storeInfo.source]({
            ...controllerParams,
            id: catId,
          })
        );

      Promise.all(fetchCategoriesRequest)
        .then((categories) =>
          handleUTDBuilderCall(product, categories)
            .then((response) => console.log({ response }))
            .catch((err) => console.log({ err }))
        )
        .catch((err) => console.error({ err }));
    });
  } catch (e) {
    throw e;
  }
}

/**
 * @desc sync the current webshop's category data with the UTD pages
 * @param storeInfo
 */
async function syncStoreCategories(storeInfo: StoreInfo) {}

export default async function syncStore(storeInfo: StoreInfo) {
  await Promise.all([
    syncStoreCategories(storeInfo),
    syncStoreProducts(storeInfo),
  ]);
}
