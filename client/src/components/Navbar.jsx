import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useDarkMode from '../hooks/useDarkMode';

const Navbar = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useDarkMode();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b dark:border-slate-700">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <span className="text-xl">✅</span>
          <h1 className="font-semibold text-lg text-slate-800 dark:text-slate-100">
            TaskFlow
          </h1>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <span className="text-sm text-slate-500 dark:text-slate-300">
            {user?.name || user?.email}
          </span>

          <button
            onClick={() => setDark(!dark)}
            className="w-9 h-9 flex items-center justify-center rounded-full border dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            title="Toggle theme"
          >
            {dark ? '☀️' : '🌙'}
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-sm rounded-lg text-white bg-rose-600 hover:bg-rose-700 transition"
          >
            Logout
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden text-2xl text-slate-700 dark:text-slate-200"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="sm:hidden bg-white dark:bg-slate-900 border-t dark:border-slate-700 px-4 py-4 space-y-3">
          <div className="text-sm text-slate-600 dark:text-slate-300">
            {user?.name}<br />
            <span className="text-xs">{user?.email}</span>
          </div>

          <button
            onClick={() => setDark(!dark)}
            className="w-full flex items-center justify-between px-3 py-2 border rounded-lg dark:border-slate-600"
          >
            <span>Theme</span>
            <span>{dark ? '☀️ Light' : '🌙 Dark'}</span>
          </button>

          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 rounded-lg text-left text-white bg-rose-600 hover:bg-rose-700"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Navbar;
