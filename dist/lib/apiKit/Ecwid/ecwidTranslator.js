"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EcwidTranslator = {
    Product: {
        /**
         * @description accepts a single product from ecwid and converts it into the standardized format
         * @param rawData - raw data from the ecwid product
         * @returns standardized product
         */
        translateSingle: (rawData) => {
            var _a, _b, _c, _d;
            const standardizedProduct = {
                original_id: rawData.id,
                sku: rawData.sku,
                name: rawData.name,
                url: rawData.url,
                description: rawData.description,
                translations: Object.assign(Object.assign({}, (rawData.nameTranslated && { name: rawData.nameTranslated })), (rawData.descriptionTranslated && {
                    description: rawData.descriptionTranslated,
                })),
                short_description: "",
                current_price: rawData.defaultDisplayedPrice,
                regular_price: rawData.price,
                sale_price: rawData.compareToPriceDiscount,
                price_formatted: rawData.compareToPriceFormatted,
                in_stock: rawData.inStock || false,
                weight: rawData.weight,
                dimensions: rawData.dimensions,
                date_created: new Date(rawData.createTimestamp),
                date_modified: new Date(rawData.updateTimestamp),
                related_product_ids: ((_a = rawData.relatedProducts) === null || _a === void 0 ? void 0 : _a.productIds) || [],
                quantity: rawData.quantity,
                categories: rawData.categoryIds || [],
                fileAttachments: ((_b = rawData.files) === null || _b === void 0 ? void 0 : _b.map((file) => ({
                    id: file.id,
                    name: file.name,
                    url: file.adminUrl,
                    description: file.description,
                    size: file.size,
                }))) || [],
                images: ((_d = (_c = rawData.media) === null || _c === void 0 ? void 0 : _c.images) === null || _d === void 0 ? void 0 : _d.map((image) => ({
                    src: image.imageOriginalUrl,
                    alt: "",
                    id: image.id,
                }))) || [],
                rawData: rawData,
            };
            return standardizedProduct;
        },
        /**
         * @description accepts a multi-product response from ecwid and converts each item into the standardized format
         * @param rawData - raw data from the ecwid multi-product response
         * @returns array of standardized products
         */
        translateMultiple: (rawData) => {
            const standardizedProductArr = rawData.items.map((item) => EcwidTranslator.Product.translateSingle(item));
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
        translateSingle: (rawData) => {
            const standardizedCategory = {
                original_id: rawData.id,
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
        translateMultiple: (rawData) => {
            const standardizedCategoryArr = rawData.items.map((item) => EcwidTranslator.Category.translateSingle(item));
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
exports.default = EcwidTranslator;
