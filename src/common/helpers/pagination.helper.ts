import { Pagination } from '../interfaces/pagination.interface';

export function createPagination(
  page: number,
  limit: number,
  totalRecords: number,
): Pagination {
  return {
    page,
    limit,
    totalRecords,
    totalPages: Math.ceil(totalRecords / limit),
  };
}
