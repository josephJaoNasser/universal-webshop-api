import axios, { AxiosResponse } from "axios";
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

    return res.data;
  }

  /**
   * Search categories in a store catalog by their path. The response provides basic details of found categories.
   *
   * The method returns a list of categories with the specified path, sorted in ascending order of the category's internal ID. The search is case insensitive.
   *
   * @queryParam ```path``` A category path where elements are separated by a delimiter. Spaces around the delimiter and empty path elements are ignored
   * @queryParam ```delimiter``` A string of 1 or more characters used as path element separator
   * @queryParam ```offset``` Offset from the beginning of the returned items list (for paging)
   * @queryParam ```limit``` Maximum number of returned items. Maximum allowed value: 100. Default value: 100
   * */
  async getByPath() {}

  /**
   * @description Get order of categories inside a specific category. Use parentCategory=0 to get categories inside the "Store front page" category.
   */
  async getSorted() {}

  /**
   * @description get a single category by id
   */
  async getById(categoryId: number) {
    const res: AxiosResponse<EcwidCategoryType> = await axios.get(
      this.baseURL + "/categories/" + categoryId,
      this.config
    );

    return res.data;
  }
}

export default EcwidCategories;
