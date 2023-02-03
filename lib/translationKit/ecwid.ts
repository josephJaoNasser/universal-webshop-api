import EcwidProductType from "../types/ecwid/EcwidProductType";
import EcwidCategoryType from "../types/ecwid/EcwidCategoryType";
import EcwidMultiItemResponse from "../types/ecwid/EcwidMultiItemResponse";
import StandardizedProduct, {
  FileAttatchments,
} from "../types/StandardizedProduct";
import { Image } from "../types/generalTypes";

const EcwidTranslator = {
  Product: {
    /**
     * @description accepts a single product from ecwid and converts it into the standardized format
     * @param rawData - raw data from the ecwid product
     * @returns standardized product
     */
    translateSingle: (rawData: EcwidProductType): StandardizedProduct => {
      const standardizedProduct: StandardizedProduct = {
        id: rawData.id,
        sku: rawData.sku,
        name: rawData.name,
        url: rawData.url,
        description: rawData.description,
        translations: {
          name: rawData.nameTranslated,
          description: rawData.descriptionTranslated,
        },
        short_description: "",
        current_price: rawData.defaultDisplayedPrice,
        regular_price: rawData.price,
        sale_price: rawData.compareToPriceDiscount,
        price_formatted: rawData.compareToPriceFormatted,
        in_stock: rawData.inStock,
        weight: rawData.weight,
        dimensions: rawData.dimensions,
        date_created: new Date(rawData.createTimestamp),
        date_modified: new Date(rawData.updateTimestamp),
        related_product_ids: rawData.relatedProducts.productIds,
        quantity: rawData.quantity,
        categories: rawData.categoryIds,
        fileAttatchments: rawData.files?.map(
          (file): FileAttatchments => ({
            id: file.id,
            name: file.name,
            url: file.adminUrl,
            description: file.description,
            size: file.size,
          })
        ),
        images: rawData.media?.images?.map(
          (image): Image => ({
            src: image.imageOriginalUrl,
            alt: "",
            id: image.id,
          })
        ),
        rawData: rawData as EcwidProductType,
      };

      return standardizedProduct;
    },

    /**
     * @description accepts a multi-product response from ecwid and converts each item into the standardized format
     * @param rawData - raw data from the ecwid multi-product response
     * @returns array of standardized products
     */
    translateMultiple: (
      rawData: EcwidMultiItemResponse<EcwidProductType>
    ): StandardizedProduct[] => {
      const standardizedProductArr: StandardizedProduct[] = rawData.items.map(
        (item) => EcwidTranslator.Product.translateSingle(item)
      );

      return standardizedProductArr;
    },
  },
  Category: {
    /**
     * @description accepts a single category from ecwid and converts it into the standardized format
     * @param rawData - raw data from the ecwid category
     * @returns standardized category
     */
    translateSingle: (rawData: EcwidCategoryType) => {},

    /**
     * @description accepts a multi-product response from ecwid and converts each item into the standardized format
     * @param rawData - raw data from the ecwid multi-product response
     * @returns array of standardized category
     */
    translateMultiple: (
      rawData: EcwidMultiItemResponse<EcwidCategoryType>
    ) => {},
  },
};

export default EcwidTranslator;
