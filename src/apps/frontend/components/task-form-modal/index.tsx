import React, { useEffect } from 'react';
import { Task } from 'frontend/types/task';
import { Button } from 'frontend/components';
import Input from 'frontend/components/input';
import { FormControl } from 'frontend/components';
import { ButtonType } from 'frontend/types/button';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; description: string }) => void;
  task?: Task | null;
  isLoading?: boolean;
}

const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  task,
  isLoading = false,
}) => {
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [errors, setErrors] = React.useState<{
    title?: string;
    description?: string;
  }>({});

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle('');
      setDescription('');
    }
    setErrors({});
  }, [task, isOpen]);

  const validate = () => {
    const newErrors: { title?: string; description?: string } = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ title: title.trim(), description: description.trim() });
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 backdrop-blur-sm sm:p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg rounded-lg border border-stroke bg-white shadow-2xl dark:border-strokedark dark:bg-boxdark max-h-[90vh] overflow-y-auto animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-stroke p-4 dark:border-strokedark sm:p-6">
          <h2 className="text-lg font-semibold text-black dark:text-white sm:text-xl">
            {task ? 'Edit Task' : 'Create New Task'}
          </h2>
          <button
            onClick={onClose}
            className="flex-shrink-0 rounded-md p-1.5 text-bodydark transition-all duration-200 hover:scale-110 hover:bg-gray-100 hover:text-black active:scale-95 dark:hover:bg-gray-800 dark:hover:text-white sm:p-2"
            aria-label="Close modal"
          >
            <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <div className="mb-4 space-y-4 sm:mb-6">
            <FormControl
              label="Title *"
              error={errors.title}
            >
              <Input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) {
                    setErrors({ ...errors, title: undefined });
                  }
                }}
                placeholder="Enter task title"
                className={errors.title ? 'border-red-500' : ''}
              />
            </FormControl>
            <FormControl
              label="Description *"
              error={errors.description}
            >
              <textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                  if (errors.description) {
                    setErrors({ ...errors, description: undefined });
                  }
                }}
                placeholder="Enter task description"
                rows={4}
                className={`w-full rounded-lg border bg-white p-3 text-sm outline-none transition-colors duration-150 focus:border-primary focus-visible:shadow-none dark:bg-boxdark sm:p-4 sm:text-base ${
                  errors.description
                    ? 'border-red-500'
                    : 'border-stroke dark:border-strokedark'
                }`}
              />
            </FormControl>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 rounded-lg border border-stroke bg-white px-3 py-2 text-sm font-medium text-black transition-all duration-200 hover:scale-105 hover:bg-gray-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 dark:border-strokedark dark:bg-boxdark dark:text-white dark:hover:bg-gray-800 sm:px-4 sm:text-base"
            >
              Cancel
            </button>
            <Button
              type={ButtonType.SUBMIT}
              isLoading={isLoading}
              className="flex-1"
            >
              {task ? 'Update Task' : 'Create Task'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskFormModal;

