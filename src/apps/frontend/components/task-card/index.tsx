import React from 'react';
import { Task } from 'frontend/types/task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onMarkAsDone?: (taskId: string) => void;
  isDeleting?: boolean;
  isMarkingAsDone?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onMarkAsDone,
  isDeleting = false,
  isMarkingAsDone = false,
}) => {
  const isCompleted = task.active === false;
  return (
    <div className="group relative rounded-lg border border-stroke bg-white p-4 shadow-sm transition-all duration-300 hover:scale-[1.02] hover:border-primary hover:shadow-lg dark:border-strokedark dark:bg-boxdark sm:p-6">
      <div className="mb-3 flex items-start justify-between gap-2 sm:mb-4">
        <h3 className="flex-1 text-base font-semibold text-black transition-colors duration-200 dark:text-white sm:text-lg min-w-0 group-hover:text-primary">
          {task.title}
        </h3>
        <div className="flex items-center gap-1 opacity-100 transition-all duration-300 sm:gap-2 sm:opacity-0 sm:translate-x-2 sm:group-hover:translate-x-0 sm:group-hover:opacity-100">
          {!isCompleted && (
            <>
              <button
                onClick={() => onEdit(task)}
                className="flex-shrink-0 rounded-md p-1.5 text-bodydark transition-all duration-200 hover:scale-110 hover:bg-primary/10 hover:text-primary active:scale-95 dark:hover:bg-primary/20 sm:p-2"
                aria-label="Edit task"
              >
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              {onMarkAsDone && (
                <button
                  onClick={() => onMarkAsDone(task.id)}
                  disabled={isMarkingAsDone}
                  className="flex-shrink-0 rounded-md p-1.5 text-bodydark transition-all duration-200 hover:scale-110 hover:bg-green-50 hover:text-green-600 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 dark:hover:bg-green-900/20 dark:hover:text-green-400 sm:p-2"
                  aria-label="Mark as done"
                >
                  {isMarkingAsDone ? (
                    <svg className="h-4 w-4 animate-spin sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                  ) : (
                    <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>
              )}
            </>
          )}
          <button
            onClick={() => onDelete(task.id)}
            disabled={isDeleting}
            className="flex-shrink-0 rounded-md p-1.5 text-bodydark transition-all duration-200 hover:scale-110 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 dark:hover:bg-red-900/20 dark:hover:text-red-400 sm:p-2"
            aria-label="Delete task"
          >
            {isDeleting ? (
              <svg className="h-4 w-4 animate-spin sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
            ) : (
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </button>
        </div>
      </div>
      <p className="text-xs leading-relaxed text-bodydark2 dark:text-bodydark sm:text-sm line-clamp-3">
        {task.description}
      </p>
      <div className="mt-3 flex items-center gap-2 text-xs text-bodydark2 dark:text-bodydark sm:mt-4">
        {isCompleted ? (
          <>
            <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
            <span className="text-green-600 dark:text-green-400">Completed</span>
          </>
        ) : (
          <>
            <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></div>
            <span>Active</span>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskCard;

