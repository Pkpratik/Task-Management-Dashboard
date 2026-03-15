import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, Edit3, Trash2, GripVertical, Activity } from 'lucide-react';
import type { Task } from '../../types';
import { Button } from '../ui/Button';

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
  innerRef?: (element: HTMLElement | null) => void;
  draggableProps?: any;
  dragHandleProps?: any;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
  innerRef,
  draggableProps,
  dragHandleProps,
}) => {
  const priorityConfig = {
    low: { bg: 'var(--priority-low-bg)', text: 'var(--priority-low-text)', label: 'Low' },
    medium: { bg: 'var(--priority-medium-bg)', text: 'var(--priority-medium-text)', label: 'Medium' },
    high: { bg: 'var(--priority-high-bg)', text: 'var(--priority-high-text)', label: 'High' },
  };

  const isCompleted = task.status === 'completed';
  const isInProgress = task.status === 'in-progress';
  const priority = priorityConfig[task.priority];

  const formattedDate = new Date(task.dueDate + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  const getStatusColor = () => {
    if (isCompleted) return 'var(--success)';
    if (isInProgress) return 'var(--accent-primary)';
    return 'var(--text-secondary)';
  };

  const getStatusBg = () => {
    if (isCompleted) return 'var(--success-bg)';
    if (isInProgress) return 'var(--accent-primary-bg)';
    return 'var(--pending-bg)';
  };

  return (
    <motion.div
      ref={innerRef}
      {...draggableProps}
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`glass-morphism rounded-xl flex items-center gap-3 px-4 py-3 transition-all duration-300 group ${
        isCompleted ? 'opacity-75' : ''
      }`}
      style={{
        borderLeft: `3px solid ${getStatusColor()}`,
      }}
    >
      {/* Drag Handle */}
      <span
        {...dragHandleProps}
        className="text-[var(--text-secondary)] cursor-grab active:cursor-grabbing opacity-30 group-hover:opacity-70 transition-opacity flex-shrink-0"
      >
        <GripVertical className="w-4 h-4" />
      </span>

      {/* Status Toggle Circle */}
      <button
        onClick={() => onToggleStatus(task.id)}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
          isCompleted
            ? 'bg-[var(--success)] border-[var(--success)] text-white'
            : isInProgress
            ? 'bg-[var(--accent-primary)] border-[var(--accent-primary)] text-white'
            : 'border-[var(--text-secondary)] hover:border-[var(--accent-primary)]'
        }`}
        title={isCompleted ? 'Mark as pending' : 'Mark as in progress'}
      >
        {isCompleted ? <CheckCircle2 className="w-3 h-3" /> : isInProgress ? <Activity className="w-3 h-3" /> : null}
      </button>

      {/* Main Content */}
      <div className="flex-grow min-w-0 flex flex-col gap-1">
        <h3
          className={`font-bold truncate text-sm ${
            isCompleted ? 'line-through text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'
          }`}
        >
          {task.title}
        </h3>
        <p className="text-xs text-[var(--text-secondary)] truncate">{task.description}</p>
        <div className="flex items-center gap-2 mt-0.5 flex-wrap">
          {/* Priority Badge */}
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ background: priority.bg, color: priority.text }}
          >
            {priority.label}
          </span>

          {/* Status Badge */}
          <span
            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex items-center gap-1"
            style={{
              background: getStatusBg(),
              color: getStatusColor(),
            }}
          >
            {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace('-', ' ')}
          </span>

          {/* Due Date */}
          <div className="flex items-center gap-1 text-[11px] text-[var(--text-secondary)]">
            <Clock className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(task)}
          className="!p-1.5 rounded-lg hover:bg-[var(--accent-primary)] hover:text-white"
          title="Edit task"
        >
          <Edit3 className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(task.id)}
          className="!p-1.5 rounded-lg hover:bg-[var(--danger)] hover:text-white"
          title="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};
