import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import { saveState } from '../utils/localStorage';

export const usePersistence = () => {
  const state = useSelector((state: RootState) => state.tasks);

  // Apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
  }, [state.theme]);

  // Save state to localStorage when it changes
  useEffect(() => {
    saveState('tasks', state.tasks);
  }, [state.tasks]);

  useEffect(() => {
    saveState('theme', state.theme);
  }, [state.theme]);

  useEffect(() => {
    saveState('viewMode', state.viewMode);
  }, [state.viewMode]);
};
