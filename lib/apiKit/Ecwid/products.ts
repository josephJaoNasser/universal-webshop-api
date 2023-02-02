import axios, { AxiosResponse } from "axios";
import EcwidApi from "./Ecwid";

class EcwidProducts extends EcwidApi {
  queries?: any;

  constructor(storeId: string, token: string, queries?: any) {
    super(storeId, token);
    this.queries = queries;
  }

  /**
   * @description get all products
   */
  getAll() {
    const config = {
      headers: {
        Authorization: this.token,
      },
    };

    return axios.get(this.baseURL + "/products", config);
  }

  /**
   * @description search for products using keywords
   * @queryParam ```keyword``` Search term. Add an asterisk symbol at the end of keyword to disable exact match search. Ecwid searches products over multiple languages and fields:
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
  async getById() {}
}

export default EcwidProducts;
