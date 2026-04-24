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
  additionalImages?: { id: string; url: string }[];
  comments?: Comment[];
}

export interface Comment {
  id: string;
  name: string;
  message: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: string;
  blogId: string;
}

export interface ApiResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
