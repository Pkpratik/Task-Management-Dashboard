import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';
import { loadState } from '../utils/localStorage';
import type { TaskState } from '../types';

const preloadedState: { tasks: TaskState } = {
  tasks: {
    tasks: loadState('tasks') || [],
    theme: loadState('theme') || 'light',
    viewMode: loadState('viewMode') || 'list',
    manualSort: false,
    filters: {
      search: '',
      priority: 'all',
      status: 'all',
    },
  },
};

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
