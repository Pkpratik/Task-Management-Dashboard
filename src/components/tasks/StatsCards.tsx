import React from 'react';
import { motion } from 'framer-motion';
import { ListTodo, Clock, CheckCircle2, Activity } from 'lucide-react';

interface StatsCardsProps {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  total,
  pending,
  inProgress,
  completed,
}) => {
  const stats = [
    {
      label: 'Total Tasks',
      value: total,
      icon: ListTodo,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600',
    },
    {
      label: 'Pending',
      value: pending,
      icon: Clock,
      color: 'bg-amber-500',
      textColor: 'text-amber-600',
    },
    {
      label: 'In Progress',
      value: inProgress,
      icon: Activity,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
    },
    {
      label: 'Completed',
      value: completed,
      icon: CheckCircle2,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="glass-morphism p-6 rounded-2xl flex items-center gap-5"
        >
          <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-white shadow-lg`}>
            <stat.icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-semibold text-[var(--text-secondary)]">
              {stat.label}
            </p>
            <h3 className="text-2xl font-bold text-[var(--text-primary)]">
              {stat.value}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
