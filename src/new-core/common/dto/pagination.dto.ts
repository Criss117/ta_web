export interface PaginationDto<T> {
  items: T[];
  total: number;
  offset: number;
  page: number;
  totalPage: number;
}
