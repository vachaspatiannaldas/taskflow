import { useEffect, useState } from 'react';
import api from '../api/axios';

const getMonthDays = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const days = [];

  for (let i = 0; i < firstDay.getDay(); i++) {
    days.push(null);
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    const day = new Date(year, month, d);
    days.push({
      date: day.toISOString().split('T')[0],
      label: d,
    });
  }

  return days;
};

const MonthPlanner = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  const days = getMonthDays(selectedDate);

  useEffect(() => {
    const load = async () => {
      const start = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
      ).toISOString();

      const end = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        0
      ).toISOString();

      const res = await api.get(
        `/tasks?startDate=${start}&endDate=${end}`
      );
      setTasks(res.data);
    };

    load();
  }, [selectedDate]);

  return (
    <div className="mb-8">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h2 className="font-semibold text-lg">📅 Month Planner</h2>

        <input
          type="month"
          value={`${selectedDate.getFullYear()}-${String(
            selectedDate.getMonth() + 1
          ).padStart(2, '0')}`}
          onChange={(e) =>
            setSelectedDate(new Date(`${e.target.value}-01`))
          }
          className="border rounded-lg px-3 py-1.5 text-sm text-black w-full sm:w-auto"
        />
      </div>

      <div className="grid grid-cols-7 text-center text-xs font-semibold mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day}>{day}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => (
          <div
            key={index}
            className="min-h-[90px] border rounded-lg p-1 bg-white dark:bg-slate-800"
          >
            {day && (
              <>
                <div className="text-xs font-semibold mb-1">
                  {day.label}
                </div>

                {tasks
                  .filter(
                    t =>
                      t.dueDate &&
                      t.dueDate.split('T')[0] === day.date
                  )
                  .map(task => (
                    <div
                      key={task._id}
                      className={`text-xs px-1 py-0.5 rounded mb-0.5 truncate ${
                        task.isCompleted
                          ? 'line-through text-slate-400'
                          : 'bg-slate-100 dark:bg-slate-700'
                      }`}
                      title={task.text}
                    >
                      {task.text}
                    </div>
                  ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthPlanner;
