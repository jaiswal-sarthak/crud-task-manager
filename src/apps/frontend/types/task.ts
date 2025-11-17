export interface Task {
  id: string;
  account_id: string;
  title: string;
  description: string;
  active?: boolean;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
}

export interface UpdateTaskRequest {
  title: string;
  description: string;
}

export interface PaginatedTasksResponse {
  items: Task[];
  pagination_params: {
    page: number;
    size: number;
    offset: number;
  };
  total_count: number;
  total_pages: number;
}

