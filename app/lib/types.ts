export interface Blog {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  published: boolean;
  allowComments: boolean;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
  additionalImages: BlogImage[];
}

export interface BlogImage {
  id: string;
  url: string;
  blogId: string;
}

export interface Comment {
  id: string;
  name: string;
  message: string;
  approved: boolean;
  createdAt: string;
  blogId: string;
}

export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
