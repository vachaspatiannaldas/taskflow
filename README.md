# ✅ TaskFlow – Task Management Application

TaskFlow is a full-stack task management (Todo) application built using the **MERN stack**.  
It focuses on **clean UI, real-world usability, and performance-optimized React patterns**.

This project demonstrates practical frontend and backend engineering skills such as authentication, state management, responsive design, API integration, and deployment.

---

## Features

### Authentication
- User registration & login
- Secure password hashing using **bcrypt**
- JWT-based authentication using **Authorization Header (Bearer Token)**
- Protected API routes using middleware
- Stateless authentication (no server-side sessions)

### Task Management
- Create, edit, delete tasks
- Mark tasks as completed or pending
- Inline task editing (double-click to edit)
- Disable past dates when setting due dates

### Priority & Status
- Task priority: **High / Medium / Low**
- Status filters: **All / Pending / Completed**
- Priority-based filtering

### Multiple Views
- **List View** – sortable task list
- **Week View** – weekly task planner
- **Month View** – calendar-style task overview
- Lazy-loaded planners for better performance

### Search & UX
- Search tasks by title
- Fully responsive UI (mobile & desktop)
- Dark mode support
- Clean, minimal, user-friendly design

### Performance Optimizations
- `React.memo` for task items
- `useMemo` for filtering logic
- `React.lazy` + `Suspense` for code splitting
- Drag-and-drop using **@dnd-kit**

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- @dnd-kit (Drag & Drop)
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT (JSON Web Tokens)
- bcryptjs

---

## Security Practices Used
- Password hashing with **bcrypt**
- JWT authentication using **Bearer tokens**
- Authorization header-based route protection
- No sensitive data stored in cookies
- Stateless backend authentication
- Input validation on backend APIs

---

## What This Project Demonstrates
- Full-stack MERN application development
- RESTful API design & integration
- Secure authentication using JWT
- Responsive UI & UX-focused design
- Performance optimization with React hooks
- Clean, modular, maintainable codebase
- Real-world deployment considerations (Vercel + Render)
