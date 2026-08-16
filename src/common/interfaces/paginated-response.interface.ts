import { Pagination } from './pagination.interface';

export interface PaginatedResponse<T> {
  data: T[];
  meta: Pagination;
}
