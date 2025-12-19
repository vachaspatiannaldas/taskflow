# ✅ TaskFlow – Task Management Application

TaskFlow is a full-stack task management (Todo) application built using the **MERN stack**.  
It focuses on **clean UI, real-world usability, and performance-optimized React patterns**.

This project demonstrates practical frontend and backend engineering skills such as authentication, state management, responsive design, and API integration.

---

## Features

### Authentication
- User registration & login
- Secure password hashing using **bcrypt**
- JWT authentication stored in **httpOnly cookies**
- Protected routes with middleware

### Task Management
- Create, edit, delete tasks
- Mark tasks as completed or pending
- Inline task editing (double-click to edit)
- Disable past dates when setting due date

### Priority & Status
- Task priority: **High / Medium / Low**
- Status filter: **All / Pending / Completed**
- Priority-based filtering

### Multiple Views
- **List View** – sortable task list
- **Week View** – weekly task planner
- **Month View** – calendar-style task overview
- Lazy-loaded planners for better performance

### Search & UX
- Search tasks by title
- Responsive UI (mobile & desktop)
- Dark mode support
- Clean, minimal design

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
- Cookie-based authentication
