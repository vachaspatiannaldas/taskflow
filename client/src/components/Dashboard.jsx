import { useEffect, useState } from 'react';
import api from '../api/axios';
import Navbar from './Navbar';
import SortableTask from './SortableTask';
import toast from 'react-hot-toast';
import { lazy, Suspense } from 'react';
const WeekPlanner = lazy(() => import('./WeekPlanner'));
const MonthPlanner = lazy(() => import('./MonthPlanner'));
import { useMemo } from 'react';

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

const priorityStyle = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
};

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [search, setSearch] = useState(
    localStorage.getItem('taskSearch') || ''
  );
  const [filter, setFilter] = useState(
    localStorage.getItem('taskFilter') || 'all'
  );
  const [priorityFilter, setPriorityFilter] = useState(
    localStorage.getItem('taskPriority') || 'all'
  );


  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [view, setView] = useState('list');

  useEffect(() => {
    localStorage.setItem('taskFilter', filter);
  }, [filter]);

  useEffect(() => {
    localStorage.setItem('taskSearch', search);
  }, [search]);

  useEffect(() => {
    localStorage.setItem('taskPriority', priorityFilter);
  }, [priorityFilter]);

  useEffect(() => {
    const load = async () => {
      try {
        const userRes = await api.get('/auth/profile');
        setUser(userRes.data.user);

        const taskRes = await api.get('/tasks');
        setTasks(taskRes.data);
      } catch {
        window.location.href = '/login';
      }
    };
    load();
  }, []);

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const { data } = await api.post('/tasks', {
      text: newTask,
      priority,
      dueDate: dueDate || null,
    });

    setTasks([data, ...tasks]);
    setNewTask('');
    setPriority('medium');
    setDueDate('');
    toast.success('Task added');
  };

  const toggleTask = async (id, status) => {
    const { data } = await api.put(`/tasks/${id}`, {
      isCompleted: !status,
    });
    setTasks(tasks.map(t => (t._id === id ? data : t)));
    toast.success(status ? 'Marked pending' : 'Completed 🎉');
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
    toast.error('Task deleted');
  };

  const saveEdit = async (id) => {
    const { data } = await api.put(`/tasks/${id}`, { text: editText });
    setTasks(tasks.map(t => (t._id === id ? data : t)));
    setEditingId(null);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      if (filter === 'completed' && !task.isCompleted) return false;
      if (filter === 'pending' && task.isCompleted) return false;
      if (priorityFilter !== 'all' && task.priority !== priorityFilter)
        return false;
      if (search && !task.text.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [tasks, filter, priorityFilter, search]);


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );


  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 dark:text-slate-100">
      <Navbar user={user} />

      <main className="max-w-3xl mx-auto px-4 py-6">

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg p-3 text-center">
            <p className="text-xs text-slate-500">Total</p>
            <p className="text-xl font-bold">{tasks.length}</p>
          </div>

          <div className="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 rounded-lg p-3 text-center">
            <p className="text-xs text-emerald-600">Completed</p>
            <p className="text-xl font-bold text-emerald-700">
              {tasks.filter(t => t.isCompleted).length}
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg p-3 text-center">
            <p className="text-xs text-amber-600">Pending</p>
            <p className="text-xl font-bold text-amber-700">
              {tasks.filter(t => !t.isCompleted).length}
            </p>
          </div>
        </div>


        <form
          onSubmit={addTask}
          className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-6"
        >
          <input
            className="border rounded-lg px-3 py-2 sm:col-span-2 text-black"
            placeholder="Task title"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />

          <select
            className="border rounded-lg px-3 py-2 text-black"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <input
            type="date"
            className="border rounded-lg px-3 py-2 text-black"
            value={dueDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <button
            type="submit"
            disabled={!newTask.trim()}
            className={`rounded-lg text-white font-medium
                py-3 sm:py-2
                text-base sm:text-sm
                ${
                newTask.trim()
                  ? 'bg-slate-800 hover:bg-slate-900'
                  : 'bg-slate-400 cursor-not-allowed'
            }`}
          >
            Add Task
          </button>
        </form>


        <div className="mb-5 space-y-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            
            <div className="flex w-full sm:w-auto rounded-lg border overflow-hidden">
              {['all', 'pending', 'completed'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`flex-1 px-3 py-2 text-sm capitalize transition ${
                    filter === f
                      ? 'bg-slate-800 text-white'
                      : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {['all', 'high', 'medium', 'low'].map(p => (
                <button
                  key={p}
                  onClick={() => setPriorityFilter(p)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition ${
                    priorityFilter === p
                      ? 'bg-slate-800 text-white'
                      : 'bg-white dark:bg-slate-800 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  {p === 'all' ? 'All priorities' : p}
                </button>
              ))}
            </div>

            <input
              placeholder="Search tasks…"
              className="w-full sm:w-56 sm:ml-auto border rounded-lg px-3 py-2 text-sm text-black focus:outline-none focus:ring-2 focus:ring-slate-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>


        <div className="flex w-full sm:w-auto mb-6 rounded-lg border overflow-hidden">
          {['list', 'week', 'month'].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`flex-1 px-4 py-2 text-sm font-medium transition ${
                view === v
                  ? 'bg-slate-800 text-white'
                  : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              {v === 'list' && '📋 List'}
              {v === 'week' && '📅 Week'}
              {v === 'month' && '🗓 Month'}
            </button>
          ))}
        </div>

        <Suspense fallback={<div className="text-sm">Loading planner...</div>}>
          {view === 'week' && <WeekPlanner />}
          {view === 'month' && <MonthPlanner />}
        </Suspense>

        {view === 'list'  && (

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={({ active, over }) => {
            if (!over || active.id === over.id) return;

            const oldIndex = tasks.findIndex(t => t._id === active.id);
            const newIndex = tasks.findIndex(t => t._id === over.id);

            setTasks(arrayMove(tasks, oldIndex, newIndex));
          }}
        >
          <SortableContext
            items={filteredTasks.map(t => t._id)}
            strategy={verticalListSortingStrategy}
          >
            <ul className="space-y-2">
              {filteredTasks.map(task => {
                const isOverdue =
                  task.dueDate &&
                  !task.isCompleted &&
                  new Date(task.dueDate) < new Date();

                return (
                  <SortableTask key={task._id} task={task}>
                    <div
                      style={{ WebkitTouchCallout: 'none' }}
                      className={`bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-lg p-3 flex justify-between
                        select-none
                        ${
                          isOverdue ? 'border-red-400 bg-red-50' : ''
                        }
                      `}
                    >
                      <div className="flex gap-3">
                        <input
                          type="checkbox"
                          checked={task.isCompleted}
                          onPointerDown={(e) => e.stopPropagation()} 
                          onChange={() =>
                            toggleTask(task._id, task.isCompleted)
                          }
                          className="mt-1 accent-emerald-500"
                        />

                        <div>
                          {editingId === task._id ? (
                            <input
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              onBlur={() => saveEdit(task._id)}
                              className="border rounded px-2 py-1 text-sm text-black"
                            />
                          ) : (
                            <p
                              onDoubleClick={() => {
                                setEditingId(task._id);
                                setEditText(task.text);
                              }}
                              className={
                                task.isCompleted
                                  ? 'line-through text-slate-400'
                                  : ''
                              }
                            >
                              {task.text}
                            </p>
                          )}

                          <div className="flex gap-2 text-xs mt-1">
                            <span
                              className={`px-2 py-0.5 rounded ${priorityStyle[task.priority]}`}
                            >
                              {task.priority}
                            </span>

                            {task.dueDate && (
                              <span>
                                📅 {new Date(task.dueDate).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <button
                        onPointerDown={(e) => e.stopPropagation()}
                        onClick={() => deleteTask(task._id)}
                        className="text-rose-500"
                      >
                        ✕
                      </button>
                    </div>
                  </SortableTask>
                );
              })}
            </ul>
          </SortableContext>
        </DndContext>
)}
      </main>
    </div>
  );
};

export default Dashboard;
