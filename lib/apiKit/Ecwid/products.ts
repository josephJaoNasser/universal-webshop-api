import axios, { AxiosResponse } from "axios";
import EcwidTranslator from "./ecwidTranslator";
import EcwidMultiItemResponse from "./types/EcwidMultiItemResponse";
import EcwidProductType from "./types/EcwidProductType";
import StandardizedProduct from "@/lib/types/StandardizedProduct";
import RouteConfig from "./RouteConfig";

class EcwidProducts extends RouteConfig {
  /**
   * @description get all products
   */
  async getAll({
    queries,
  }): Promise<StandardMultiItemResponse<StandardizedProduct>> {
    const toParse = {
      ...(queries?.limit && { limit: queries.limit }),
      ...(queries?.offset && { offset: queries.offset }),
    };

    let filterParams = new URLSearchParams(toParse).toString();

    if (filterParams.length) filterParams = "?" + filterParams;

    const res: AxiosResponse<EcwidMultiItemResponse<EcwidProductType>> =
      await axios.get(this.baseURL + "/products" + filterParams, this.config);

    return EcwidTranslator.Product.translateMultiple(res.data);
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
  async searchByKeywords({
    queries,
  }): Promise<StandardMultiItemResponse<StandardizedProduct>> {
    const keyword = queries.keyword as string;
    const res: AxiosResponse<EcwidMultiItemResponse<EcwidProductType>> =
      await axios.get(
        this.baseURL + "/products?keyword=" + keyword,
        this.config
      );

    return EcwidTranslator.Product.translateMultiple(res.data);
  }

  /**
   * @description search for products using filters. For reference, see the Ecwid api
   */
  async searchByFilters({
    queries,
  }): Promise<StandardMultiItemResponse<StandardizedProduct>> {
    const filterParams = new URLSearchParams(queries).toString();
    const res: AxiosResponse<EcwidMultiItemResponse<EcwidProductType>> =
      await axios.get(this.baseURL + "/products?" + filterParams, this.config);

    return EcwidTranslator.Product.translateMultiple(res.data);
  }

  /**
   * @description retrieve a single product
   */
  async getById({ id }: { id: number }): Promise<StandardizedProduct> {
    const res: AxiosResponse<EcwidProductType> = await axios.get(
      this.baseURL + "/products/" + id,
      this.config
    );

    return EcwidTranslator.Product.translateSingle(res.data);
  }
}

export default EcwidProducts;
