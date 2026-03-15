import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, LayoutGrid, List } from 'lucide-react';
import type { RootState } from '../../store';
import { setSearchFilter, setPriorityFilter, setStatusFilter, setViewMode } from '../../store/taskSlice';

import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import type { Priority, Status } from '../../types';

export const FilterBar: React.FC = () => {
  const dispatch = useDispatch();
  const { filters, viewMode } = useSelector((state: RootState) => state.tasks);

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'low', label: '🟢 Low' },
    { value: 'medium', label: '🟡 Medium' },
    { value: 'high', label: '🔴 High' },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'pending', label: '⏳ Pending' },
    { value: 'in-progress', label: '🚧 In Progress' },
    { value: 'completed', label: '✅ Completed' },
  ];

  return (
    <div className="glass-morphism p-6 rounded-[2.5rem] flex flex-col gap-6 w-full shadow-2xl border-white/5 relative overflow-hidden">
      {/* Decorative Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-primary)]/5 via-transparent to-transparent opacity-50 pointer-events-none" />

      {/* Row 1: Search — Expansive & Prominent */}
      <div className="relative group w-full z-10">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none transition-all duration-300 group-focus-within:text-[var(--accent-primary)] group-focus-within:scale-110">
          <Search className="w-6 h-6 text-[var(--text-secondary)] opacity-50" />
        </div>
        <input
          type="text"
          placeholder="Search your mission board..."
          value={filters.search}
          onChange={(e) => dispatch(setSearchFilter(e.target.value))}
          className="w-full pl-16 pr-6 py-5 bg-[var(--bg-tertiary)]/30 border border-white/5 rounded-2xl text-[var(--text-primary)] text-xl font-medium outline-none transition-all duration-300 focus:bg-[var(--bg-secondary)]/50 focus:border-[var(--accent-primary)]/30 focus:ring-4 focus:ring-[var(--accent-primary)]/10 shadow-inner placeholder:text-[var(--text-secondary)]/30"
        />
      </div>

      {/* Row 2: Filters + View Toggle — Left/Right Aligned */}
      <div className="flex flex-row items-center justify-between gap-4 z-10">
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--bg-tertiary)]/50 border border-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-secondary)] opacity-60">
            <span>Filter by</span>
          </div>
          <Select
            options={statusOptions}
            value={filters.status}
            onChange={(e) => dispatch(setStatusFilter(e.target.value as Status | 'all'))}
            width="160px"
            className="!py-4"
          />
          <Select
            options={priorityOptions}
            value={filters.priority}
            onChange={(e) => dispatch(setPriorityFilter(e.target.value as Priority | 'all'))}
            width="140px"
            className="!py-4"
          />
        </div>

        {/* View Toggle */}
        <div
          className="flex p-1.5 rounded-2xl bg-[var(--bg-tertiary)]/40 border border-white/5 overflow-hidden shadow-sm flex-shrink-0"
        >
          <Button
            variant={viewMode === 'list' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => dispatch(setViewMode('list'))}
            className={`!px-6 !py-3 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 ${viewMode === 'list' ? 'shadow-md' : ''}`}
            title="List view"
          >
            <List className="w-5 h-5" />
            <span className="text-[11px] font-black uppercase tracking-wider whitespace-nowrap">List View</span>
          </Button>
          <Button
            variant={viewMode === 'card' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => dispatch(setViewMode('card'))}
            className={`!px-6 !py-3 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 ${viewMode === 'card' ? 'shadow-md' : ''}`}
            title="Card view"
          >
            <LayoutGrid className="w-5 h-5" />
            <span className="text-[11px] font-black uppercase tracking-wider whitespace-nowrap">Board View</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
