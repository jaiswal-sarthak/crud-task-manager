import APIService from 'frontend/services/api.service';
import { AccessToken, ApiResponse } from 'frontend/types';
import {
  CreateTaskRequest,
  PaginatedTasksResponse,
  Task,
  UpdateTaskRequest,
} from 'frontend/types/task';

export default class TaskService extends APIService {
  getTasks = async (
    userAccessToken: AccessToken,
    page: number = 1,
    size: number = 10,
    active: boolean | null = null,
  ): Promise<ApiResponse<PaginatedTasksResponse>> => {
    let url = `/accounts/${userAccessToken.accountId}/tasks?page=${page}&size=${size}`;
    if (active !== null) {
      url += `&active=${active}`;
    }
    return this.apiClient.get(url, {
      headers: {
        Authorization: `Bearer ${userAccessToken.token}`,
      },
    });
  };

  getTask = async (
    userAccessToken: AccessToken,
    taskId: string,
  ): Promise<ApiResponse<Task>> =>
    this.apiClient.get(
      `/accounts/${userAccessToken.accountId}/tasks/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      },
    );

  createTask = async (
    userAccessToken: AccessToken,
    taskData: CreateTaskRequest,
  ): Promise<ApiResponse<Task>> =>
    this.apiClient.post(
      `/accounts/${userAccessToken.accountId}/tasks`,
      taskData,
      {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      },
    );

  updateTask = async (
    userAccessToken: AccessToken,
    taskId: string,
    taskData: UpdateTaskRequest,
  ): Promise<ApiResponse<Task>> =>
    this.apiClient.patch(
      `/accounts/${userAccessToken.accountId}/tasks/${taskId}`,
      taskData,
      {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      },
    );

  deleteTask = async (
    userAccessToken: AccessToken,
    taskId: string,
  ): Promise<ApiResponse<void>> =>
    this.apiClient.delete(
      `/accounts/${userAccessToken.accountId}/tasks/${taskId}`,
      {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      },
    );

  markTaskAsDone = async (
    userAccessToken: AccessToken,
    taskId: string,
  ): Promise<ApiResponse<Task>> =>
    this.apiClient.patch(
      `/accounts/${userAccessToken.accountId}/tasks/${taskId}`,
      { action: 'mark_as_done' },
      {
        headers: {
          Authorization: `Bearer ${userAccessToken.token}`,
        },
      },
    );
}

