import axios, { AxiosResponse } from "axios";
import EcwidMultiItemResponse from "../../types/ecwid/EcwidMultiItemResponse";
import EcwidProductType from "../../types/ecwid/EcwidProductType";
import RouteConfig from "./RouteConfig";

class EcwidProducts extends RouteConfig {
  /**
   * @description get all products
   */
  async getAll() {
    const res: AxiosResponse<EcwidMultiItemResponse<EcwidProductType>> =
      await axios.get(this.baseURL + "/products", this.config);

    return res.data;
  }

  /**
   * @description search for products using keywords
   * @param keyword Search term. Add an asterisk symbol at the end of keyword to disable exact match search. Ecwid searches products over multiple languages and fields:
    - title
    - description
    - SKU
    - product options
    - category name
    - gallery image descriptions
    - attribute values (except for hidden attributes). If your keywords contain special characters, it may make sense to URL encode them before making a request
   */
  async searchByKeywords() {}

  /**
   * @description search for products using filters. For reference, see the Ecwid api
   */
  async searchByFilters() {}

  /**
   * @description retrieve a single product
   */
  async getById(productId: number) {
    const res: AxiosResponse<EcwidProductType> = await axios.get(
      this.baseURL + "/products/" + productId,
      this.config
    );

    return res.data;
  }
}

export default EcwidProducts;
