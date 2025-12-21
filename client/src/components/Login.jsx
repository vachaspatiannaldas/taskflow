import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow p-6">

        <div className="flex justify-center mb-4">
          <img
            src="/logo-dark.png"
            alt="TaskFlow logo"
            className="h-10 object-contain"
          />
        </div>

        <h2 className="text-xl font-semibold text-center mb-4">
          Welcome back
        </h2>

        {error && <p className="text-sm text-rose-500 mb-3">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-slate-500"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-900">
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-slate-500">
          No account? <a href="/register" className="underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
