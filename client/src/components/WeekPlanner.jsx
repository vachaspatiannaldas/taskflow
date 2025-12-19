import { useEffect, useState } from 'react';
import api from '../api/axios';

const getWeekDays = (baseDate) => {
  const start = new Date(baseDate);
  start.setDate(start.getDate() - start.getDay() + 1); // Monday

  return Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return {
      date: d.toISOString().split('T')[0],
      label: d.toLocaleDateString(undefined, {
        weekday: 'short',
        day: 'numeric',
      }),
    };
  });
};

const WeekPlanner = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  const weekDays = getWeekDays(selectedDate);

    useEffect(() => {
        const load = async () => {
            const startDate = weekDays[0].date;
            const endDate = weekDays[6].date;

            const res = await api.get(
            `/tasks?startDate=${startDate}&endDate=${endDate}`
            );
            setTasks(res.data);
        };

        load();
    }, [weekDays]);


  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="font-semibold text-lg">📅 Week Planner</h2>

        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="border rounded-lg px-3 py-1.5 text-sm text-black w-full sm:w-auto"
        />
      </div>

      {/* Week Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-7 gap-2">
        {weekDays.map(day => (
          <div
            key={day.date}
            className="border rounded-lg p-2 bg-white dark:bg-slate-800"
          >
            <h4 className="text-sm font-semibold mb-1">
              {day.label}
            </h4>

            {tasks
              .filter(
                t =>
                  t.dueDate &&
                  t.dueDate.split('T')[0] === day.date
              )
              .map(task => (
                <div
                  key={task._id}
                  className={`text-sm px-2 py-1 rounded mb-1 ${
                    task.isCompleted
                      ? 'line-through text-slate-400'
                      : 'bg-slate-100 dark:bg-slate-700'
                  }`}
                >
                  {task.text}
                </div>
              ))}

            {tasks.filter(
              t =>
                t.dueDate &&
                t.dueDate.split('T')[0] === day.date
            ).length === 0 && (
              <p className="text-xs text-slate-400">
                No tasks
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekPlanner;
