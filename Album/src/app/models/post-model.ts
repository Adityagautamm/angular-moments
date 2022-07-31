// selectedFiles: File[];
export interface Post {
  title: string;
  location: string;
  createdAt: Date;
  tags: string;
  description: string;
  selectedFiles: string;
}

export interface APIResponse<T> {
  results: Array<T>;
}
