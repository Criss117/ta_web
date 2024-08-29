export type Filters = {
  minStock?: boolean;
  query?: string;
};

export type StatusType<T> = {
  isError: boolean;
  isLoading: boolean;
  response?: T;
};
