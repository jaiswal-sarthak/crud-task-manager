import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthContext } from 'frontend/contexts';
import { TaskService } from 'frontend/services';
import { Task } from 'frontend/types/task';
import { getAccessTokenFromStorage } from 'frontend/utils/storage-util';
import TaskCard from 'frontend/components/task-card';

const CompletedTasksPage: React.FC = () => {
  const { isUserAuthenticated } = useAuthContext();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize] = useState(12);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');

  const taskService = new TaskService();

  const loadTasks = async (page: number = 1) => {
    if (!isUserAuthenticated()) return;

    try {
      setIsLoading(true);
      const accessToken = getAccessTokenFromStorage();
      if (!accessToken) {
        toast.error('Please login to view completed tasks');
        return;
      }

      const response = await taskService.getTasks(accessToken, page, pageSize, false);
      if (response.data) {
        let filteredTasks = response.data.items;
        
        // Apply search filter
        if (searchQuery.trim()) {
          filteredTasks = filteredTasks.filter(
            (task) =>
              task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              task.description.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        // Apply sorting
        filteredTasks = [...filteredTasks].sort((a, b) => {
          if (sortBy === 'title') {
            return a.title.localeCompare(b.title);
          } else {
            // Default to newest first (tasks are already sorted by newest from API)
            return 0;
          }
        });
        
        setTasks(filteredTasks);
        setTotalPages(response.data.total_pages);
        setTotalCount(response.data.total_count);
        setCurrentPage(page);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to load completed tasks');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useEffect(() => {
    // Debounce search
    const timer = setTimeout(() => {
      if (currentPage === 1) {
        loadTasks(1);
      } else {
        setCurrentPage(1);
        loadTasks(1);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, sortBy]);

  const handleEditTask = (_task: Task) => {
    toast.error('Cannot edit completed tasks');
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this completed task?')) {
      return;
    }

    const accessToken = getAccessTokenFromStorage();
    if (!accessToken) {
      toast.error('Please login to delete tasks');
      return;
    }

    try {
      await taskService.deleteTask(accessToken, taskId);
      toast.success('Task deleted successfully!');
      await loadTasks(currentPage);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete task');
    }
  };

  const handlePageChange = (page: number) => {
    loadTasks(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 dark:bg-boxdark-2 sm:p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold text-black dark:text-white sm:text-3xl">
                Completed Tasks
              </h1>
              <p className="mt-1 text-xs text-bodydark2 dark:text-bodydark sm:mt-2 sm:text-sm">
                {totalCount > 0
                  ? `${totalCount} completed task${totalCount !== 1 ? 's' : ''}`
                  : 'No completed tasks yet'}
              </p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          {tasks.length > 0 && (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <svg className="h-5 w-5 text-bodydark2 dark:text-bodydark" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search completed tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-stroke bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-strokedark dark:bg-boxdark dark:text-white"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-bodydark2 transition-colors hover:bg-gray-100 hover:text-black dark:hover:bg-gray-800 dark:hover:text-white"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <label className="text-xs font-medium text-bodydark2 dark:text-bodydark sm:text-sm">
                  Sort:
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'title')}
                  className="rounded-lg border border-stroke bg-white px-3 py-2 text-sm outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-strokedark dark:bg-boxdark dark:text-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Title A-Z</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="mb-6 grid grid-cols-1 gap-4 sm:mb-8 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-lg border border-stroke bg-white p-4 shadow-sm dark:border-strokedark dark:bg-boxdark sm:p-6"
              >
                <div className="mb-4 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-2 h-4 w-full rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="mb-2 h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-4 w-4/6 rounded bg-gray-200 dark:bg-gray-700"></div>
              </div>
            ))}
          </div>
        ) : tasks.length === 0 ? (
          /* Empty State */
          <div className="flex min-h-[300px] flex-col items-center justify-center rounded-lg border border-stroke bg-white p-6 text-center dark:border-strokedark dark:bg-boxdark sm:min-h-[400px] sm:p-12">
            <div className="mb-3 rounded-full bg-gray-100 p-4 dark:bg-gray-800 sm:mb-4 sm:p-6">
              <svg className="h-10 w-10 text-bodydark2 dark:text-bodydark sm:h-12 sm:w-12" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-black dark:text-white sm:text-xl">
              No completed tasks yet
            </h3>
            <p className="mb-4 text-sm text-bodydark2 dark:text-bodydark sm:mb-6 sm:text-base">
              Complete some tasks to see them here
            </p>
          </div>
        ) : (
          <>
            {/* Tasks Grid */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:mb-8 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className="opacity-0 animate-fadeIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <TaskCard
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    isDeleting={false}
                  />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-stroke bg-white px-3 py-2 text-xs font-medium text-black transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 hover:scale-105 hover:border-primary hover:bg-gray-50 active:scale-95 dark:border-strokedark dark:bg-boxdark dark:text-white dark:hover:bg-gray-800 sm:px-4 sm:text-sm"
                >
                  Previous
                </button>
                <div className="flex flex-wrap items-center justify-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200 hover:scale-110 active:scale-95 sm:px-4 sm:text-sm ${
                          currentPage === page
                            ? 'bg-primary text-white shadow-md'
                            : 'border border-stroke bg-white text-black hover:border-primary hover:bg-gray-50 dark:border-strokedark dark:bg-boxdark dark:text-white dark:hover:bg-gray-800'
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="rounded-lg border border-stroke bg-white px-3 py-2 text-xs font-medium text-black transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 hover:scale-105 hover:border-primary hover:bg-gray-50 active:scale-95 dark:border-strokedark dark:bg-boxdark dark:text-white dark:hover:bg-gray-800 sm:px-4 sm:text-sm"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CompletedTasksPage;


