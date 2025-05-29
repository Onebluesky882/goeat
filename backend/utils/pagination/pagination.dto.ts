export type PaginationParams = {
  page?: number;
  limit?: number;
};

export type PaginationResult<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};
