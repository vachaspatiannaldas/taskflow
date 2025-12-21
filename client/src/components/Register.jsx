import { useState } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      return alert('Passwords do not match');
    }

    try {
      await api.post('/auth/register', form);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
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
          Create account
        </h2>

        <form onSubmit={handleRegister} className="space-y-3">
          <input
            name="name"
            placeholder="Full name"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            onChange={handleChange}
            required
          />

          <select
            name="gender"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            onChange={handleChange}
            required
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            onChange={handleChange}
            required
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            className="w-full border rounded-lg px-3 py-2 text-sm"
            onChange={handleChange}
            required
          />

          <button className="w-full bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-900">
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-slate-500">
          Already have an account?{' '}
          <a href="/login" className="underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
