# Ecwid webshop API

### !! INSTRUCTIONS !!
- For more information on how to use each route, please refer to the ecwid API documentation
- Each route starts with ``` /api/{storeId}/... ```
- Pass the ACCESS TOKEN (public or secret) as a Bearer token



## Products
- **Get all products** : 
  -  ```/products```
- **Search for a product** : 
  - ```/products/search?keyword={keyword}```
- **Filter products** : 
  - ```/products/filter?{queries}``` (refer to the API docs for the list of queries)
- **Get single product** : 
  - ```/products/{id}```

## Categories
- **Get all categories** : 
  - ```/categories``` (refer to the API docs for the list of queries)
- **Get category by path** : 
  - ```/categories/path?path={path}&delimiter={delimiter}``` (refer to the API for additional queries)
- **Sort subcategories within a category** : 
  - ```/categories/sort?parentCategory={id}```
- **Get single category** : 
  - ```/categories/{id}```
