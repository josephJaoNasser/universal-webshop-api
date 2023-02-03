interface StandardMultiItemResponse<T> {
  total: number;
  count: number;
  offset: number;
  limit: number;
  items: Array<T>;
}