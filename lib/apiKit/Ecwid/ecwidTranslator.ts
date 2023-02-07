import EcwidProductType, { ProductDimensions } from "./types/EcwidProductType";
import EcwidCategoryType from "./types/EcwidCategoryType";
import EcwidMultiItemResponse from "./types/EcwidMultiItemResponse";
import StandardizedProduct, {
  FileAttachments,
} from "@/lib/types/StandardizedProduct";
import { Image } from "@/lib/types/generalTypes";
import StandardizedCategory from "@/lib/types/StandardizedCategory";

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
        sku: rawData.sku as string,
        name: rawData.name as string,
        url: rawData.url as string,
        description: rawData.description as string,
        translations: {
          ...(rawData.nameTranslated && { name: rawData.nameTranslated }),
          ...(rawData.descriptionTranslated && {
            description: rawData.descriptionTranslated,
          }),
        },
        short_description: "",
        current_price: rawData.defaultDisplayedPrice as number,
        regular_price: rawData.price as number,
        sale_price: rawData.compareToPriceDiscount as number,
        price_formatted: rawData.compareToPriceFormatted as string,
        in_stock: rawData.inStock || false,
        weight: rawData.weight as number,
        dimensions: rawData.dimensions,
        date_created: new Date(rawData.createTimestamp as number),
        date_modified: new Date(rawData.updateTimestamp as number),
        related_product_ids: rawData.relatedProducts?.productIds || [],
        quantity: rawData.quantity as number,
        categories: rawData.categoryIds || [],
        fileAttachments:
          rawData.files?.map(
            (file): FileAttachments => ({
              id: file.id,
              name: file.name,
              url: file.adminUrl,
              description: file.description,
              size: file.size,
            })
          ) || [],
        images:
          rawData.media?.images?.map(
            (image): Image => ({
              src: image.imageOriginalUrl as string,
              alt: "",
              id: image.id,
            })
          ) || [],
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
    ): StandardMultiItemResponse<StandardizedProduct> => {
      const standardizedProductArr: StandardizedProduct[] = rawData.items.map(
        (item) => EcwidTranslator.Product.translateSingle(item)
      );

      return {
        count: rawData.count,
        limit: rawData.limit,
        offset: rawData.offset,
        total: rawData.total,
        items: standardizedProductArr,
      };
    },
  },
  Category: {
    /**
     * @description accepts a single category from ecwid and converts it into the standardized format
     * @param rawData - raw data from the ecwid category
     * @returns standardized category
     */
    translateSingle: (rawData: EcwidCategoryType): StandardizedCategory => {
      const standardizedCategory: StandardizedCategory = {
        id: rawData.id,
        name: rawData.name,
        url: rawData.url,
        description: rawData.description,
        parent_id: rawData.parentId,
        image: rawData.imageUrl,
        product_count: rawData.productCount,
        translations: {
          name: rawData.nameTranslated,
          description: rawData.descriptionTranslated,
        },
      };

      return standardizedCategory;
    },

    /**
     * @description accepts a multi-category response from ecwid and converts each item into the standardized format
     * @param rawData - raw data from the ecwid multi-category response
     * @returns array of standardized category
     */
    translateMultiple: (
      rawData: EcwidMultiItemResponse<EcwidCategoryType>
    ): StandardMultiItemResponse<StandardizedCategory> => {
      const standardizedCategoryArr: StandardizedCategory[] = rawData.items.map(
        (item) => EcwidTranslator.Category.translateSingle(item)
      );

      return {
        count: rawData.count,
        limit: rawData.limit,
        offset: rawData.offset,
        total: rawData.total,
        items: standardizedCategoryArr,
      };
    },
  },
};

export default EcwidTranslator;
