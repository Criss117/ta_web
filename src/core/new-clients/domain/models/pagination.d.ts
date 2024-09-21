export interface Pagination<T> {
  items: T[];
  total: number;
  offset: number;
  page: number;
  totalPage: number;
}
