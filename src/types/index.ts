export type Priority = 'low' | 'medium' | 'high';
export type Status = 'pending' | 'in-progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  status: Status;
  createdAt: number;
}

export interface TaskState {
  tasks: Task[];
  viewMode: 'list' | 'card';
  theme: 'light' | 'dark';
  manualSort: boolean;
  filters: {
    search: string;
    priority: Priority | 'all';
    status: Status | 'all';
  };
}
