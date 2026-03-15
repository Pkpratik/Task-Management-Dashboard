import React, { useState, useEffect } from 'react';
import type { Task, Priority } from '../../types';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

interface TaskFormProps {
  initialData?: Task;
  onSubmit: (data: Omit<Task, 'id' | 'createdAt' | 'status'>) => void;
  onCancel: () => void;
}

import { ClipboardList, Sparkles } from 'lucide-react';

export const TaskForm: React.FC<TaskFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  // ... existing state ...
  // (Adding the state back because I'm replacing from line 14)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as Priority,
    dueDate: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title,
        description: initialData.description,
        priority: initialData.priority,
        dueDate: initialData.dueDate,
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
  ];

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      <div className="flex items-center gap-6 p-7 rounded-[2.25rem] bg-[var(--bg-tertiary)]/40 border border-white/[0.05] shadow-sm">
        <div className="w-20 h-20 rounded-3xl bg-[var(--accent-primary)] flex items-center justify-center text-white shadow-[0_15px_30px_-10px_rgba(99,102,241,0.4)]">
          {initialData ? <Sparkles className="w-10 h-10" /> : <ClipboardList className="w-10 h-10" />}
        </div>
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-[var(--text-primary)] tracking-tighter">
            {initialData ? 'Refine Objective' : 'New Milestone'}
          </h2>
          <p className="text-lg text-[var(--text-secondary)] font-medium opacity-60">
            {initialData ? 'Updating task parameters' : 'Plan your next big move'}
          </p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="group transition-all">
          <Input
            label="Mission Title"
            placeholder="Launch into execution..."
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            error={errors.title}
            className="text-xl font-bold !py-4"
          />
        </div>
        
        <Textarea
          label="Context & Details"
          placeholder="Brief your team or yourself..."
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          error={errors.description}
          rows={5}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Select
            label="Priority Tier"
            options={priorityOptions}
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
          />
          <Input
            label="Deadline"
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            error={errors.dueDate}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 pt-10 border-t border-white/[0.05]">
        <Button 
          type="button" 
          variant="secondary" 
          onClick={onCancel}
          className="w-full sm:flex-1 !py-5 rounded-[1.5rem] font-bold text-lg hover:bg-[var(--bg-tertiary)]"
        >
          Discard
        </Button>
        <Button 
          type="submit"
          className="w-full sm:flex-[2] !py-5 rounded-[1.5rem] font-black text-xl shadow-[0_20px_40px_-8px_rgba(99,102,241,0.3)] hover:translate-y-[-2px] transition-all"
        >
          {initialData ? 'Confirm Update' : 'Initialize Task'}
        </Button>
      </div>
    </form>
  );
};
