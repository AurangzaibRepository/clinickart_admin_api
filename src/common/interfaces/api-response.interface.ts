export interface ApiResponse<T = null> {
  status: boolean;
  message?: string;
  data?: T;
}
