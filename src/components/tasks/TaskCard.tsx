import React from 'react';
import { Clock, CheckCircle2, RotateCcw, Edit2, Trash2 } from 'lucide-react';
import type { Task, Priority } from '../../types';
import { Button } from '../ui/Button';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onToggleStatus,
}) => {
  const isCompleted = task.status === 'completed';

  const getPriorityConfig = (priority: Priority) => {
    switch (priority) {
      case 'high':
        return { 
          color: '#ef4444', 
          bg: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
          label: 'High Priority'
        };
      case 'medium':
        return { 
          color: '#f59e0b', 
          bg: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
          label: 'Medium Priority'
        };
      case 'low':
        return { 
          color: '#3b82f6', 
          bg: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
          label: 'Low Priority'
        };
      default:
        return { color: '#6366f1', bg: 'bg-gray-100 text-gray-700', label: 'Task' };
    }
  };

  const priorityInfo = getPriorityConfig(task.priority);

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <div className={`group bg-[var(--bg-secondary)] rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-500 border border-[var(--border-color)] flex flex-col h-full relative overflow-hidden ${isCompleted ? 'opacity-80' : ''}`}>
      {/* Accent bar at the top */}
      <div 
        className="absolute top-0 left-0 w-full h-1.5 opacity-40 transition-opacity group-hover:opacity-100"
        style={{ backgroundColor: priorityInfo.color }}
      />

      <div className="flex-grow">
        <div className="flex items-start justify-between mb-4 mt-1">
          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${priorityInfo.bg}`}>
            {task.priority}
          </span>
          <div className="flex items-center gap-1.5 text-[var(--text-secondary)] bg-[var(--bg-tertiary)]/50 px-2.5 py-1 rounded-full border border-[var(--border-color)]/30">
            <Clock className="w-3 h-3" />
            <span className="text-[10px] font-bold">{formatDate(task.dueDate)}</span>
          </div>
        </div>

        <h3 className={`text-lg font-bold mb-2 leading-tight transition-colors ${isCompleted ? 'line-through text-[var(--text-secondary)]' : 'text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]'}`}>
          {task.title}
        </h3>
        <p className="text-[var(--text-secondary)] text-sm mb-6 line-clamp-3 leading-relaxed">
          {task.description}
        </p>
      </div>

      <div className="p-6 pt-0 mt-auto">
        <div className="flex items-center justify-between gap-4">
          <Button
            variant={task.status === 'completed' ? 'secondary' : 'primary'}
            fullWidth
            onClick={() => onToggleStatus(task.id)}
            className={`!py-3 rounded-2xl flex items-center justify-center gap-3 font-extrabold text-sm transition-all active:scale-95 ${
              task.status === 'completed' 
                ? 'bg-[var(--bg-tertiary)] border-2 border-[var(--border-color)] !text-[var(--text-secondary)] hover:!text-[var(--text-primary)]' 
                : 'shadow-lg shadow-indigo-500/25'
            }`}
          >
            {task.status === 'completed' ? (
              <>
                <RotateCcw className="w-4 h-4" />
                <span>Restart</span>
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Finish Task</span>
              </>
            )}
          </Button>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(task)}
              className="p-3 rounded-2xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-all active:scale-90 border border-transparent hover:border-[var(--accent-primary)]/20"
              title="Edit Task"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="p-3 rounded-2xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-red-600 hover:bg-red-50 transition-all active:scale-90 border border-transparent hover:border-red-200"
              title="Delete Task"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
