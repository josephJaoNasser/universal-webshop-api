import axios, { AxiosResponse } from "axios";
import EcwidTranslator from "../../translationKit/ecwid";
import EcwidCategoryType from "../../types/ecwid/EcwidCategoryType";
import EcwidMultiItemResponse from "../../types/ecwid/EcwidMultiItemResponse";
import RouteConfig from "./RouteConfig";

class EcwidCategories extends RouteConfig {
  /**
   * @description get all categories
   */
  async getAll() {
    const res: AxiosResponse<EcwidMultiItemResponse<EcwidCategoryType>> =
      await axios.get(this.baseURL + "/categories", this.config);

    return EcwidTranslator.Category.translateMultiple(res.data);
  }

  /**
   * Search categories in a store catalog by their path. The response provides basic details of found categories.
   *
   * The method returns a list of categories with the specified path, sorted in ascending order of the category's internal ID. The search is case insensitive.
   *
   * @param path A category path where elements are separated by a delimiter. Spaces around the delimiter and empty path elements are ignored
   * @param delimiter A string of 1 or more characters used as path element separator
   * @param offset Offset from the beginning of the returned items list (for paging)
   * @param limit Maximum number of returned items. Maximum allowed value: 100. Default value: 100
   * */
  async getByPath({ queries }) {
    const pathQueries = new URLSearchParams(queries).toString();
    const res: AxiosResponse<EcwidMultiItemResponse<EcwidCategoryType>> =
      await axios.get(
        this.baseURL + "/categoriesByPath" + pathQueries,
        this.config
      );

    return EcwidTranslator.Category.translateMultiple(res.data);
  }

  /**
   * @description Get order of categories inside a specific category. Use parentCategory=0 to get categories inside the "Store front page" category.
   */
  async getSorted({ queries }) {
    const { parentCategory } = queries;
    const res: AxiosResponse<number[]> = await axios.get(
      this.baseURL + "/categories/sort?parentCategory=" + parentCategory,
      this.config
    );

    return res.data;
  }

  /**
   * @description get a single category by id
   */
  async getById({ id }: { id: number }) {
    const res: AxiosResponse<EcwidCategoryType> = await axios.get(
      this.baseURL + "/categories/" + id,
      this.config
    );

    return EcwidTranslator.Category.translateSingle(res.data);
  }
}

export default EcwidCategories;
