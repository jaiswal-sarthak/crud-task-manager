import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'frontend/contexts';
import { TaskService } from 'frontend/services';
import { Task } from 'frontend/types/task';
import { getAccessTokenFromStorage } from 'frontend/utils/storage-util';
import { Button } from 'frontend/components';
import routes from 'frontend/constants/routes';

const Dashboard: React.FC = () => {
  const { isUserAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const taskService = new TaskService();

  useEffect(() => {
    loadRecentTasks();
  }, []);

  const loadRecentTasks = async () => {
    if (!isUserAuthenticated()) return;

    try {
      setIsLoading(true);
      const accessToken = getAccessTokenFromStorage();
      if (!accessToken) {
        return;
      }

      // Load active tasks
      const response = await taskService.getTasks(accessToken, 1, 6, true);
      if (response.data) {
        setTasks(response.data.items);
        setTotalCount(response.data.total_count);
      }

      // Load completed tasks count
      const completedResponse = await taskService.getTasks(accessToken, 1, 1, false);
      if (completedResponse.data) {
        setCompletedCount(completedResponse.data.total_count);
      }
    } catch (error: any) {
      // Silently fail - dashboard should still show even if tasks fail to load
      console.error('Failed to load tasks:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 dark:bg-boxdark-2 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl font-bold text-black dark:text-white sm:text-3xl">
            Dashboard
          </h1>
          <p className="mt-1 text-xs text-bodydark2 dark:text-bodydark sm:mt-2 sm:text-sm">
            Welcome back! Here's an overview of your tasks.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:mb-8 sm:gap-6 md:grid-cols-3">
          {/* Total Tasks Card */}
          <div className="group rounded-lg border border-stroke bg-white p-4 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary hover:shadow-lg dark:border-strokedark dark:bg-boxdark sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-bodydark2 dark:text-bodydark sm:text-sm">
                  Total Tasks
                </p>
                <p className="mt-1 text-2xl font-bold text-black dark:text-white sm:mt-2 sm:text-3xl">
                  {isLoading ? '...' : totalCount + completedCount}
                </p>
              </div>
              <div className="rounded-full bg-primary/10 p-2 dark:bg-primary/20 sm:p-3">
                <svg className="h-5 w-5 fill-current sm:h-6 sm:w-6" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.45928 0.984375H1.6874C1.04053 0.984375 0.478027 1.51875 0.478027 2.19375V3.96563C0.478027 4.6125 1.0124 5.175 1.6874 5.175H3.45928C4.10615 5.175 4.66865 4.64063 4.66865 3.96563V2.16562C4.64053 1.51875 4.10615 0.984375 3.45928 0.984375ZM3.3749 3.88125H1.77178V2.25H3.3749V3.88125Z" fill="currentColor"/>
                  <path d="M7.22793 3.71245H16.8748C17.2123 3.71245 17.5217 3.4312 17.5217 3.06558C17.5217 2.69995 17.2404 2.4187 16.8748 2.4187H7.22793C6.89043 2.4187 6.58105 2.69995 6.58105 3.06558C6.58105 3.4312 6.89043 3.71245 7.22793 3.71245Z" fill="currentColor"/>
                  <path d="M3.45928 6.75H1.6874C1.04053 6.75 0.478027 7.28437 0.478027 7.95937V9.73125C0.478027 10.3781 1.0124 10.9406 1.6874 10.9406H3.45928C4.10615 10.9406 4.66865 10.4062 4.66865 9.73125V7.95937C4.64053 7.28437 4.10615 6.75 3.45928 6.75ZM3.3749 9.64687H1.77178V8.01562H3.3749V9.64687Z" fill="currentColor"/>
                  <path d="M16.8748 8.21252H7.22793C6.89043 8.21252 6.58105 8.49377 6.58105 8.8594C6.58105 9.22502 6.86231 9.47815 7.22793 9.47815H16.8748C17.2123 9.47815 17.5217 9.1969 17.5217 8.8594C17.5217 8.5219 17.2123 8.21252 16.8748 8.21252Z" fill="currentColor"/>
                  <path d="M3.45928 12.8531H1.6874C1.04053 12.8531 0.478027 13.3875 0.478027 14.0625V15.8344C0.478027 16.4813 1.0124 17.0438 1.6874 17.0438H3.45928C4.10615 17.0438 4.66865 16.5094 4.66865 15.8344V14.0625C4.64053 13.3875 4.10615 12.8531 3.45928 12.8531ZM3.3749 15.75H1.77178V14.1188H3.3749V15.75Z" fill="currentColor"/>
                  <path d="M16.8748 14.2875H7.22793C6.89043 14.2875 6.58105 14.5687 6.58105 14.9344C6.58105 15.3 6.86231 15.5812 7.22793 15.5812H16.8748C17.2123 15.5812 17.5217 15.3 17.5217 14.9344C17.5217 14.5687 17.2123 14.2875 16.8748 14.2875Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Active Tasks Card */}
          <div className="group rounded-lg border border-stroke bg-white p-4 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary hover:shadow-lg dark:border-strokedark dark:bg-boxdark sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-bodydark2 dark:text-bodydark sm:text-sm">
                  Active Tasks
                </p>
                <p className="mt-1 text-2xl font-bold text-black dark:text-white sm:mt-2 sm:text-3xl">
                  {isLoading ? '...' : totalCount}
                </p>
              </div>
              <div className="rounded-full bg-blue-500/10 p-2 dark:bg-blue-500/20 sm:p-3">
                <svg className="h-5 w-5 fill-current sm:h-6 sm:w-6" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.45928 0.984375H1.6874C1.04053 0.984375 0.478027 1.51875 0.478027 2.19375V3.96563C0.478027 4.6125 1.0124 5.175 1.6874 5.175H3.45928C4.10615 5.175 4.66865 4.64063 4.66865 3.96563V2.16562C4.64053 1.51875 4.10615 0.984375 3.45928 0.984375ZM3.3749 3.88125H1.77178V2.25H3.3749V3.88125Z" fill="currentColor"/>
                  <path d="M7.22793 3.71245H16.8748C17.2123 3.71245 17.5217 3.4312 17.5217 3.06558C17.5217 2.69995 17.2404 2.4187 16.8748 2.4187H7.22793C6.89043 2.4187 6.58105 2.69995 6.58105 3.06558C6.58105 3.4312 6.89043 3.71245 7.22793 3.71245Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Completed Tasks Card */}
          <div className="group rounded-lg border border-stroke bg-white p-4 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary hover:shadow-lg dark:border-strokedark dark:bg-boxdark sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs font-medium text-bodydark2 dark:text-bodydark sm:text-sm">
                  Completed
                </p>
                <p className="mt-1 text-2xl font-bold text-black dark:text-white sm:mt-2 sm:text-3xl">
                  {isLoading ? '...' : completedCount}
                </p>
              </div>
              <div className="rounded-full bg-green-500/10 p-2 dark:bg-green-500/20 sm:p-3">
                <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Task Progress Section */}
        {!isLoading && (totalCount > 0 || completedCount > 0) && (
          <div className="mb-6 rounded-lg border border-stroke bg-white p-4 shadow-sm dark:border-strokedark dark:bg-boxdark sm:mb-8 sm:p-6">
            <h2 className="mb-4 text-lg font-semibold text-black dark:text-white sm:text-xl">
              Task Progress
            </h2>
            <div className="space-y-4">
              {/* Active Tasks Bar */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-black dark:text-white sm:text-sm">Active Tasks</span>
                  <span className="text-xs text-bodydark2 dark:text-bodydark sm:text-sm">
                    {totalCount + completedCount > 0 
                      ? Math.round((totalCount / (totalCount + completedCount)) * 100) 
                      : 0}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{
                      width: `${totalCount + completedCount > 0 
                        ? (totalCount / (totalCount + completedCount)) * 100 
                        : 0}%`,
                    }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-bodydark2 dark:text-bodydark">
                  {isLoading ? '...' : `${totalCount} tasks active`}
                </p>
              </div>

              {/* Completed Tasks Bar */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-medium text-black dark:text-white sm:text-sm">Completed Tasks</span>
                  <span className="text-xs text-bodydark2 dark:text-bodydark sm:text-sm">
                    {totalCount + completedCount > 0 
                      ? Math.round((completedCount / (totalCount + completedCount)) * 100) 
                      : 0}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-full bg-green-500 transition-all duration-500"
                    style={{
                      width: `${totalCount + completedCount > 0 
                        ? (completedCount / (totalCount + completedCount)) * 100 
                        : 0}%`,
                    }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-bodydark2 dark:text-bodydark">
                  {isLoading ? '...' : `${completedCount} tasks completed`}
                </p>
              </div>

              {/* Completion Rate */}
              <div className="pt-2 border-t border-stroke dark:border-strokedark">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-bodydark2 dark:text-bodydark sm:text-sm">
                    Completion Rate
                  </span>
                  <span className="text-sm font-bold text-primary sm:text-base">
                    {totalCount + completedCount > 0 
                      ? Math.round((completedCount / (totalCount + completedCount)) * 100) 
                      : 0}%
                  </span>
                </div>
                <p className="mt-1 text-xs text-bodydark2 dark:text-bodydark">
                  {isLoading ? '...' : `${completedCount} of ${totalCount + completedCount} tasks completed`}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Recent Tasks Section */}
        <div className="rounded-lg border border-stroke bg-white shadow-sm dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke p-4 dark:border-strokedark sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-black dark:text-white sm:text-xl">
                  Recent Tasks
                </h2>
                <p className="mt-1 text-xs text-bodydark2 dark:text-bodydark sm:text-sm">
                  Your latest tasks at a glance
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button onClick={() => navigate(routes.TASKS)} className="w-full sm:w-auto">
                  View All Tasks
                </Button>
                {completedCount > 0 && (
                  <Button 
                    onClick={() => navigate(routes.COMPLETED_TASKS)} 
                    className="w-full sm:w-auto bg-green-500 hover:bg-green-600"
                  >
                    View Completed
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6">
            {isLoading ? (
              <div className="flex min-h-[200px] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  <p className="text-sm text-bodydark2 dark:text-bodydark">
                    Loading tasks...
                  </p>
                </div>
              </div>
            ) : tasks.length === 0 ? (
              <div className="flex min-h-[200px] flex-col items-center justify-center text-center">
                <div className="mb-4 rounded-full bg-gray-100 p-4 dark:bg-gray-800">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-black dark:text-white">
                  No tasks yet
                </h3>
                <p className="mb-4 text-sm text-bodydark2 dark:text-bodydark">
                  Get started by creating your first task
                </p>
                <Button onClick={() => navigate(routes.TASKS)}>
                  Create Your First Task
                </Button>
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="group rounded-lg border border-stroke bg-gray-50 p-3 transition-all duration-300 hover:scale-[1.01] hover:border-primary hover:bg-white hover:shadow-md dark:border-strokedark dark:bg-gray-800/50 dark:hover:bg-boxdark sm:p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-black dark:text-white sm:text-base">
                          {task.title}
                        </h3>
                        <p className="mt-1 text-xs text-bodydark2 dark:text-bodydark line-clamp-2 sm:text-sm">
                          {task.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                {totalCount > tasks.length && (
                  <div className="pt-4 text-center">
                    <Button
                      onClick={() => navigate(routes.TASKS)}
                      className="w-full sm:w-auto"
                    >
                      View All {totalCount} Tasks
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mt-6 rounded-lg border border-stroke bg-white p-4 shadow-sm dark:border-strokedark dark:bg-boxdark sm:mt-8 sm:p-6">
          <h2 className="mb-3 text-lg font-semibold text-black dark:text-white sm:mb-4 sm:text-xl">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            <button
              onClick={() => navigate(routes.TASKS)}
              className="flex items-center gap-2 rounded-lg border border-stroke bg-white p-3 text-left transition-all duration-200 hover:border-primary hover:shadow-md dark:border-strokedark dark:bg-boxdark dark:hover:bg-gray-800 sm:gap-3 sm:p-4"
            >
              <div className="flex-shrink-0 rounded-full bg-primary/10 p-1.5 dark:bg-primary/20 sm:p-2">
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4v16m8-8H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-black dark:text-white sm:text-base">
                  Create Task
                </p>
                <p className="text-xs text-bodydark2 dark:text-bodydark">
                  Add a new task
                </p>
              </div>
            </button>

            <button
              onClick={() => navigate(routes.TASKS)}
              className="flex items-center gap-2 rounded-lg border border-stroke bg-white p-3 text-left transition-all duration-200 hover:border-primary hover:shadow-md dark:border-strokedark dark:bg-boxdark dark:hover:bg-gray-800 sm:gap-3 sm:p-4"
            >
              <div className="flex-shrink-0 rounded-full bg-blue-500/10 p-1.5 dark:bg-blue-500/20 sm:p-2">
                <svg className="h-4 w-4 fill-current sm:h-5 sm:w-5" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.45928 0.984375H1.6874C1.04053 0.984375 0.478027 1.51875 0.478027 2.19375V3.96563C0.478027 4.6125 1.0124 5.175 1.6874 5.175H3.45928C4.10615 5.175 4.66865 4.64063 4.66865 3.96563V2.16562C4.64053 1.51875 4.10615 0.984375 3.45928 0.984375ZM3.3749 3.88125H1.77178V2.25H3.3749V3.88125Z" fill="currentColor"/>
                  <path d="M7.22793 3.71245H16.8748C17.2123 3.71245 17.5217 3.4312 17.5217 3.06558C17.5217 2.69995 17.2404 2.4187 16.8748 2.4187H7.22793C6.89043 2.4187 6.58105 2.69995 6.58105 3.06558C6.58105 3.4312 6.89043 3.71245 7.22793 3.71245Z" fill="currentColor"/>
                  <path d="M3.45928 6.75H1.6874C1.04053 6.75 0.478027 7.28437 0.478027 7.95937V9.73125C0.478027 10.3781 1.0124 10.9406 1.6874 10.9406H3.45928C4.10615 10.9406 4.66865 10.4062 4.66865 9.73125V7.95937C4.64053 7.28437 4.10615 6.75 3.45928 6.75ZM3.3749 9.64687H1.77178V8.01562H3.3749V9.64687Z" fill="currentColor"/>
                  <path d="M16.8748 8.21252H7.22793C6.89043 8.21252 6.58105 8.49377 6.58105 8.8594C6.58105 9.22502 6.86231 9.47815 7.22793 9.47815H16.8748C17.2123 9.47815 17.5217 9.1969 17.5217 8.8594C17.5217 8.5219 17.2123 8.21252 16.8748 8.21252Z" fill="currentColor"/>
                  <path d="M3.45928 12.8531H1.6874C1.04053 12.8531 0.478027 13.3875 0.478027 14.0625V15.8344C0.478027 16.4813 1.0124 17.0438 1.6874 17.0438H3.45928C4.10615 17.0438 4.66865 16.5094 4.66865 15.8344V14.0625C4.64053 13.3875 4.10615 12.8531 3.45928 12.8531ZM3.3749 15.75H1.77178V14.1188H3.3749V15.75Z" fill="currentColor"/>
                  <path d="M16.8748 14.2875H7.22793C6.89043 14.2875 6.58105 14.5687 6.58105 14.9344C6.58105 15.3 6.86231 15.5812 7.22793 15.5812H16.8748C17.2123 15.5812 17.5217 15.3 17.5217 14.9344C17.5217 14.5687 17.2123 14.2875 16.8748 14.2875Z" fill="currentColor"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-black dark:text-white sm:text-base">
                  View All Tasks
                </p>
                <p className="text-xs text-bodydark2 dark:text-bodydark">
                  Manage your tasks
                </p>
              </div>
            </button>

            <button
              onClick={() => navigate(routes.TASKS)}
              className="flex items-center gap-2 rounded-lg border border-stroke bg-white p-3 text-left transition-all duration-200 hover:border-primary hover:shadow-md dark:border-strokedark dark:bg-boxdark dark:hover:bg-gray-800 sm:gap-3 sm:p-4"
            >
              <div className="flex-shrink-0 rounded-full bg-green-500/10 p-1.5 dark:bg-green-500/20 sm:p-2">
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 17l-5-5-4 4-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-black dark:text-white sm:text-base">
                  Task Analytics
                </p>
                <p className="text-xs text-bodydark2 dark:text-bodydark">
                  View statistics
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
