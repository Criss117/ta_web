export interface CommonResponse<T = null> {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
}

export type Filters = {
  minStock?: boolean | undefined;
  query?: string | undefined;
};
