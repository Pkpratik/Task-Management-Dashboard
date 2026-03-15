import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Task, TaskState, Priority, Status } from '../types';

const initialState: TaskState = {
  tasks: [],
  viewMode: 'card', // Default to 'card' as requested for kanban-style
  theme: 'light',
  manualSort: false, // Track if user has manually reordered
  filters: {
    search: '',
    priority: 'all',
    status: 'all',
  },
};

const priorityWeight = { high: 3, medium: 2, low: 1 };

const sortTasks = (tasks: Task[]) => {
  return [...tasks].sort((a, b) => {
    // Priority: High > Medium > Low
    if (priorityWeight[a.priority] !== priorityWeight[b.priority]) {
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    }
    // Date: Ascending (soonest first)
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = state.manualSort ? action.payload : sortTasks(action.payload);
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.unshift(action.payload);
      if (!state.manualSort) {
        state.tasks = sortTasks(state.tasks);
      }
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
        if (!state.manualSort) {
          state.tasks = sortTasks(state.tasks);
        }
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    toggleTaskStatus: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.status = task.status === 'completed' ? 'pending' : 'completed';
        if (!state.manualSort) {
          state.tasks = sortTasks(state.tasks);
        }
      }
    },
    setViewMode: (state, action: PayloadAction<'list' | 'card'>) => {
      state.viewMode = action.payload;
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setSearchFilter: (state, action: PayloadAction<string>) => {
      state.filters.search = action.payload;
    },
    setPriorityFilter: (state, action: PayloadAction<Priority | 'all'>) => {
      state.filters.priority = action.payload;
    },
    setStatusFilter: (state, action: PayloadAction<Status | 'all'>) => {
      state.filters.status = action.payload;
    },
    reorderTasks: (state, action: PayloadAction<{ startIndex: number; endIndex: number; status?: Status }>) => {
      state.manualSort = true; // User manually reordered
      const [removed] = state.tasks.splice(action.payload.startIndex, 1);
      if (action.payload.status) {
        removed.status = action.payload.status;
      }
      state.tasks.splice(action.payload.endIndex, 0, removed);
    },
    moveTask: (state, action: PayloadAction<{ taskId: string; newStatus: Status; newIndex: number }>) => {
      const taskIndex = state.tasks.findIndex(t => t.id === action.payload.taskId);
      if (taskIndex !== -1) {
        const [task] = state.tasks.splice(taskIndex, 1);
        task.status = action.payload.newStatus;
        
        // This is a bit tricky with global ordering. 
        // We'll place it at the end of the global list if no target index is found,
        // or we'll need a better way to handle global index from local dropped index.
        // For simplicity in a flat array, we'll just push it and rely on Dashboard logic 
        // to pass the correct global index for reordering.
        state.tasks.splice(action.payload.newIndex, 0, task);
      }
    },
  },
});

export const {
  setTasks,
  addTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
  setViewMode,
  setTheme,
  setSearchFilter,
  setPriorityFilter,
  setStatusFilter,
  reorderTasks,
} = taskSlice.actions;

export default taskSlice.reducer;
