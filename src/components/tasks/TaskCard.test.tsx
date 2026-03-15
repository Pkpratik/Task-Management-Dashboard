import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TaskCard } from './TaskCard';
import { Task } from '../../types';

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'Test Description',
  priority: 'high',
  dueDate: '2026-12-31',
  status: 'pending',
  createdAt: Date.now(),
};

describe('TaskCard', () => {
  it('renders task details correctly', () => {
    render(
      <TaskCard
        task={mockTask}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onToggleStatus={vi.fn()}
      />
    );

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('high')).toBeInTheDocument();
  });

  it('calls onToggleStatus when done button is clicked', () => {
    const onToggleStatus = vi.fn();
    render(
      <TaskCard
        task={mockTask}
        onEdit={vi.fn()}
        onDelete={vi.fn()}
        onToggleStatus={onToggleStatus}
      />
    );

    const doneButton = screen.getByText('Pend');
    fireEvent.click(doneButton);
    expect(onToggleStatus).toHaveBeenCalledWith('1');
  });
});
