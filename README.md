# UTD webshop API

### General Instructions
- Each route starts with ``` /api/{storeId}/... ```
- Refer to your respective webshop's API documentation for query parameters
- to run locally, use ```npm run dev``` or ```yarn dev```

## Authentication
- Send your credentials such as access token or api keys through the body of the request. Examples are shown below

<table>
<thead>
<tr>
<td> <b>Webshop</b> </td> <td> <b>Request body</b> </td>
</tr>
</thead>
<tr>
<td> Ecwid</td>
<td>

```json 
{
    "credentials": {
        "token": "your_token_here"
    }
} 
``` 

</td>
</tr>
<tr>
<td> Woocommerce</td>
<td>

```json 
{
    "credentials": {
        "consumer_key": "your_consumer_key"
        "consumer_secret": "your_consumer_secret"
    }
} 
```

</td>
</tr>
</table>

## Products

### Routes

- **Get all products** : 
  -  ```/products```
- **Search for a product** : 
  - ```/products/search?keyword={keyword}```
- **Filter products** : 
  - ```/products/filter?{queries}``` (refer to the API docs for the list of queries)
- **Get single product** : 
  - ```/products/{id}```

### Response

Below is a typescript definion of the expected response along with their types. 

```typescript
interface StandardizedProduct {
  id: string | number;
  sku: string;
  name: string;
  url: string;
  description: string;
  translation?s: Translations // type is defined below;
  short_description: string;
  current_price: number;
  regular_price: number;
  sale_price: number;
  price_formatted: string;
  in_stock: boolean;
  weight: string | number;
  dimensions: Dimensions // type is defined below;
  date_created: Date;
  date_modified: Date;
  related_product_ids: string[] | number[];
  quantity: number;
  categories: number[];
  fileAttachments: FileAttachments[] // type is defined below;
  images: Image[]; // type is defined below
  rawData: any; // the raw data before standardization
}
```

The ``` StandardizedProduct ``` type uses the following helper types 

``` typescript
interface Dimensions {
  length: string | number;
  width: string | number;
  height: string | number;
}

interface FileAttachments {
  id: string | number;
  name?: string;
  description?: string;
  url: string;
  size?: number;
}

interface Image {
  id?: string | number;
  src: string;
  alt?: string;
}

interface Translations {
  name: {
    [key: string]: string;
  };
  description?: {
    [key: string]: string;
  };
}

```

### Multiple Products

For calls where the client requests multiple products such ass ```getAll()```, the response is as follows
```typescript
interface MultipleProducts {
  total: number;
  count: number;
  offset: number;
  limit: number;
  items: StandardizedProduct;
}
```

## Categories

### Routes

- **Get all categories** : 
  - ```/categories``` (refer to the API docs for the list of queries)
- **Get category by path** : 
  - ```/categories/path?path={path}&delimiter={delimiter}``` (refer to the API for additional queries)
- **Sort subcategories within a category** : 
  - ```/categories/sort?parentCategory={id}```
- **Get single category** : 
  - ```/categories/{id}```
  
### Response

Below is a typescript definion of the expected response along with their types. 

```typescript
interface StandardizedCategory {
  id: string | number;
  name: string;
  url: string;
  description: string;
  parent_id: string | number;
  image: string;
  order?: number;
  product_count: number;
  translations?: Translations; // defined below
}
```

The ```StandardizedCategory``` type uses the following helper types

```typescript
interface Image {
  id?: string | number;
  src: string;
  alt?: string;
}

interface Translations {
  name: {
    [key: string]: string;
  };
  description?: {
    [key: string]: string;
  };
}

```

### Multiple Categories

For calls where the client requests multiple categories such ass ```getAll()```, the response is as follows
```typescript
interface MultipleCategories {
  total: number;
  count: number;
  offset: number;
  limit: number;
  items: StandardizedProduct;
}
```
