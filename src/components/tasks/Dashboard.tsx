import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Plus,
  Moon,
  Sun,
  Search,
  List,
  LayoutGrid,
  Clock,
  CheckCircle2,
  Activity,
  AlertCircle,
  RotateCcw,
  Edit2,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { RootState } from '../../store';
import {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
  setTheme,
  reorderTasks
} from '../../store/taskSlice';
import type { Task, Status } from '../../types';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { TaskForm } from './TaskForm';
import { TaskCard } from './TaskCard';
import { StatsCards } from './StatsCards';
import { FilterBar } from './FilterBar';

export const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const { tasks, filters, theme, viewMode } = useSelector((state: RootState) => state.tasks);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
      const matchesStatus = filters.status === 'all' || task.status === filters.status;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [tasks, filters]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const sourceStatus = source.droppableId as Status;
    const destStatus = destination.droppableId as Status;

    const sourceColumnTasks = filteredTasks.filter(t => t.status === sourceStatus);
    const destColumnTasks = filteredTasks.filter(t => t.status === destStatus);

    const taskToMove = sourceColumnTasks[source.index];
    if (!taskToMove) return;

    const globalStartIndex = tasks.findIndex(t => t.id === taskToMove.id);
    let globalEndIndex = -1;

    if (source.droppableId === destination.droppableId) {
      const targetTask = sourceColumnTasks[destination.index];
      if (targetTask) {
        globalEndIndex = tasks.findIndex(t => t.id === targetTask.id);
      } else {
        globalEndIndex = tasks.length - 1;
      }
    } else {
      const targetTask = destColumnTasks[destination.index];
      if (targetTask) {
        globalEndIndex = tasks.findIndex(t => t.id === targetTask.id);
      } else {
        const lastTaskInDest = destColumnTasks[destColumnTasks.length - 1];
        if (lastTaskInDest) {
          globalEndIndex = tasks.findIndex(t => t.id === lastTaskInDest.id) + 1;
        } else {
          globalEndIndex = tasks.length;
        }
      }
    }

    if (globalStartIndex !== -1) {
      dispatch(reorderTasks({
        startIndex: globalStartIndex,
        endIndex: globalEndIndex,
        status: destStatus
      }));
    }
  };

  const columns: { id: Status; title: string; color: string; icon: React.ReactNode }[] = [
    { id: 'in-progress', title: 'In Progress', color: 'var(--accent-primary)', icon: <Activity className="w-5 h-5" /> },
    { id: 'pending', title: 'Pending', color: 'var(--pending)', icon: <Clock className="w-5 h-5" /> },
    { id: 'completed', title: 'Completed', color: 'var(--success)', icon: <CheckCircle2 className="w-5 h-5" /> },
  ];

  const stats = useMemo(() => ({
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length
  }), [tasks]);

  const handleCreateTask = (data: any) => {
    const newTask: Task = {
      ...data,
      id: crypto.randomUUID(),
      status: 'pending',
      createdAt: Date.now(),
    };
    dispatch(addTask(newTask));
    setIsModalOpen(false);
  };

  const handleUpdateTask = (data: any) => {
    if (editingTask) {
      dispatch(updateTask({ ...editingTask, ...data }));
      setEditingTask(undefined);
      setIsModalOpen(false);
    }
  };

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="container min-h-screen py-10 px-4 sm:px-6">
      {/* Header */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-[var(--text-primary)] mb-2 text-glow">
            Task Kanban
          </h1>
          <p className="text-[var(--text-secondary)] font-medium">
            Drag and drop to manage your workflow.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={toggleTheme} className="!p-3 rounded-2xl shadow-sm glass-morphism hover-scale">
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
          </Button>
          <Button onClick={() => { setEditingTask(undefined); setIsModalOpen(true); }} className="!px-6 !py-3 rounded-2xl flex items-center gap-2 shadow-lg hover-scale">
            <Plus className="w-5 h-5 flex-shrink-0" />
            <span className="font-bold">New Task</span>
          </Button>
        </div>
      </header>

      {/* Stats */}
      <section className="mb-10">
        <StatsCards {...stats} />
      </section>

      {/* Filters */}
      <section className="mb-8">
        <FilterBar />
      </section>

      {/* Task Content Area */}
      <main className="flex-grow">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={`kanban-container ${viewMode === 'card'
              ? 'grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'
              : 'flex flex-col gap-12'
            }`}>
            {columns
              .filter(column => filters.status === 'all' || column.id === filters.status)
              .map((column, index) => (
              <div key={column.id} className={`kanban-column flex flex-col ${viewMode === 'card' ? 'min-h-[500px] h-full' : `w-full ${index > 0 ? 'mt-10' : ''}`
                }`}>
                {/* Column Header */}
                <div className={`flex items-center justify-between px-2 ${viewMode === 'card' ? 'mb-4' : 'mb-6'
                  }`}>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center gap-2"
                      style={{ color: column.color }}
                    >
                      {column.icon}
                      <h2 className={`${viewMode === 'card' ? 'text-lg' : 'text-2xl'
                        } font-black text-[var(--text-primary)] uppercase tracking-[0.15em]`}>
                        {column.title}
                      </h2>
                    </div>
                    <span className="text-sm font-black px-3 py-1 rounded-[0.75rem] bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-color)]/30">
                      {filteredTasks.filter(t => t.status === column.id).length}
                    </span>
                  </div>
                </div>

                {/* Droppable Area */}
                <Droppable droppableId={column.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={`flex-grow p-4 rounded-[2rem] transition-all duration-500 ${snapshot.isDraggingOver
                          ? 'bg-[var(--accent-primary)]/10 ring-2 ring-dashed ring-[var(--accent-primary)]/40 ring-offset-4 ring-offset-transparent'
                          : 'bg-[var(--bg-secondary)]/30 backdrop-blur-sm border border-white/5'
                        } ${viewMode === 'list' ? 'min-h-[120px]' : 'min-h-[500px]'}`}
                    >
                      <div className={`${viewMode === 'card' ? 'flex flex-col gap-4' : 'grid grid-cols-1 gap-4'
                        }`}>
                        <AnimatePresence mode="popLayout" initial={false}>
                          {filteredTasks
                            .filter((t) => t.status === column.id)
                            .map((task, index) => (
                              <Draggable key={task.id} draggableId={task.id} index={index}>
                                {(dragProvided, dragSnapshot) => (
                                  <div
                                    ref={dragProvided.innerRef}
                                    {...dragProvided.draggableProps}
                                    {...dragProvided.dragHandleProps}
                                    className={`${dragSnapshot.isDragging ? 'z-50' : ''}`}
                                    style={{
                                      ...dragProvided.draggableProps.style,
                                      marginBottom: '1rem',
                                    }}
                                  >
                                    <motion.div
                                      layoutId={dragSnapshot.isDragging ? undefined : task.id}
                                      initial={false}
                                      animate={{
                                        opacity: dragSnapshot.isDragging ? 0.9 : 1,
                                        y: 0,
                                        scale: 1,
                                        rotate: dragSnapshot.isDragging ? 1 : 0
                                      }}
                                      transition={dragSnapshot.isDragging ? { duration: 0 } : {
                                        type: 'spring',
                                        damping: 25,
                                        stiffness: 200,
                                        opacity: { duration: 0.2 }
                                      }}
                                    >
                                      {viewMode === 'card' ? (
                                        <TaskCard
                                          task={task}
                                          onEdit={(t) => { setEditingTask(t); setIsModalOpen(true); }}
                                          onDelete={setDeleteId}
                                          onToggleStatus={(id) => dispatch(toggleTaskStatus(id))}
                                        />
                                      ) : (
                                        <div className={`bg-[var(--bg-secondary)] rounded-2xl p-5 border border-[var(--border-color)] flex items-center gap-6 hover:shadow-lg transition-all group ${task.status === 'completed' ? 'opacity-70' : ''}`}>
                                          <div className={`w-1.5 h-12 rounded-full flex-shrink-0 ${task.priority === 'high' ? 'bg-red-500' :
                                              task.priority === 'medium' ? 'bg-yellow-500' :
                                                'bg-blue-500'
                                            }`} />

                                          <div className="flex-grow min-w-0">
                                            <h3 className={`font-black text-lg truncate ${task.status === 'completed' ? 'line-through text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'}`}>
                                              {task.title}
                                            </h3>
                                            <p className="text-sm text-[var(--text-secondary)] font-medium truncate opacity-70">
                                              {task.description || 'No description provided'}
                                            </p>
                                          </div>

                                          <div className="flex items-center gap-3">
                                            <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg ${task.priority === 'high' ? 'bg-red-50 text-red-600' :
                                                task.priority === 'medium' ? 'bg-yellow-50 text-yellow-600' :
                                                  'bg-blue-50 text-blue-600'
                                              }`}>
                                              {task.priority}
                                            </span>

                                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                              <button
                                                className="p-2 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 transition-all"
                                                onClick={() => { setEditingTask(task); setIsModalOpen(true); }}
                                              >
                                                <Edit2 className="w-4 h-4" />
                                              </button>
                                              <button
                                                className="p-2 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-red-600 hover:bg-red-50 transition-all"
                                                onClick={() => setDeleteId(task.id)}
                                              >
                                                <Trash2 className="w-4 h-4" />
                                              </button>
                                            </div>

                                            <button
                                              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${task.status === 'completed'
                                                  ? 'bg-green-500 text-white animate-in'
                                                  : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:bg-[var(--accent-primary)] hover:text-white'
                                                }`}
                                              onClick={() => dispatch(toggleTaskStatus(task.id))}
                                            >
                                              {task.status === 'completed' ? <RotateCcw className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </motion.div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                        </AnimatePresence>
                        {provided.placeholder}

                        {filteredTasks.filter((t) => t.status === column.id).length === 0 && !snapshot.isDraggingOver && (
                          <div className="flex flex-col items-center justify-center py-12 text-[var(--text-secondary)] opacity-50">
                            <AlertCircle className="w-8 h-8 mb-2" />
                            <p className="text-sm font-medium">No tasks</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Droppable>
              </div>
            ))}
          </div>
        </DragDropContext>
      </main>

      {/* Modals */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingTask(undefined); }}
        title=""
      >
        <TaskForm
          initialData={editingTask}
          onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
          onCancel={() => { setIsModalOpen(false); setEditingTask(undefined); }}
        />
      </Modal>

      <Modal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        title=""
      >
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-10">
            <div className="w-32 h-32 rounded-[3.5rem] bg-red-500/10 flex items-center justify-center text-red-500 shadow-[inset_0_2px_10px_rgba(239,68,68,0.2)] group relative overflow-hidden">
              <div className="absolute inset-0 bg-red-500/5 group-hover:scale-125 transition-transform duration-700 blur-2xl" />
              <Trash2 className="w-14 h-14 relative z-10 transition-transform group-hover:scale-110 duration-500" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-12 h-12 rounded-[1.25rem] bg-white shadow-2xl flex items-center justify-center text-red-500 border-4 border-[var(--bg-secondary)]">
              <AlertCircle className="w-6 h-6 animate-pulse" />
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <h3 className="text-4xl font-black text-[var(--text-primary)] tracking-tighter leading-none">
              Delete Task?
            </h3>
            <p className="text-[var(--text-secondary)] font-medium text-xl leading-relaxed max-w-[360px]">
              This action is <span className="text-red-500 font-bold">irretrievable</span>. Are you sure you want to scrub this from your board?
            </p>
          </div>

          <div className="flex flex-col w-full gap-4">
            <Button
              variant="danger"
              fullWidth
              onClick={() => {
                if (deleteId) dispatch(deleteTask(deleteId));
                setDeleteId(null);
              }}
              className="!py-5 rounded-[1.5rem] font-black text-xl shadow-[0_20px_40px_-10px_rgba(239,68,68,0.4)] active:scale-[0.98] transition-all hover:translate-y-[-2px]"
            >
              Confirm Deletion
            </Button>
            <Button
              variant="secondary"
              fullWidth
              onClick={() => setDeleteId(null)}
              className="!py-5 rounded-[1.5rem] font-bold text-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all bg-[var(--bg-tertiary)]/50 border-2 border-transparent hover:border-[var(--border-color)]"
            >
              Cancel and Back
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
