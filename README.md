# TaskBuddy

TaskBuddy is a full-stack, single-page application designed for managing personal tasks. It supports different user roles (Admin, Premium User, and Free User) and provides a Calendar View and Dashboard View for premium users.

## Screenshots

### Login Page

![Login Page](https://github.com/pedrohaolee/TaskBuddy/blob/main/login_screenshot.png)

### Registration Page

![Registration Page](https://github.com/pedrohaolee/TaskBuddy/blob/main/registration_screenshot.png)

### Main Page

![Create Task](https://github.com/pedrohaolee/TaskBuddy/blob/main/TaskBarFree.png)

![Task View By Priority](https://github.com/pedrohaolee/TaskBuddy/blob/main/TaskVIewByPriority.png)

![Task View By Category](https://github.com/pedrohaolee/TaskBuddy/blob/main/TaskVIewByCategory.png)

### Calendar For Premium Users

![Calendar View](https://github.com/pedrohaolee/TaskBuddy/blob/main/CalendarView.png)

### Dashboard For Premium Users

![Dashboard View](https://github.com/pedrohaolee/TaskBuddy/blob/main/Dashboard.png)

### Admin Dashboard

![Admin Dashboard](https://github.com/pedrohaolee/TaskBuddy/blob/main/AdminView.png)

### All Tasks View

![All Tasks View](https://github.com/pedrohaolee/TaskBuddy/blob/main/AllTasksView.png)

## Technologies Used

- Frontend: React
- Backend: Node.js with Express
- Database: PostgreSQL
- Authentication: JWT
- Styling: CSS Modules
- Calendar: react-big-calendar

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Installation

The backend environment variables:

```bash
 PORT
 DATABASE
 ACCESS_SECRET
 REFRESH_SECRET
```

The frontend environment variables:

```bash
VITE_SERVER
```

### Project Planning

Find the public board used for the project's planning [here](https://trello.com/b/q6joVUSp/taskbuddy).

## Next Steps

Planned future enhancements (icebox items):

- Implement email notifications for task reminders.
- Add a dark mode toggle for better user experience.
- Integrate a task prioritization algorithm.
- Add more customizable user settings.
- Implement a mobile app version of TaskBuddy.

## API Endpoints

### Authentication

- **POST** `/api/auth/login` - Login a user
- **POST** `/api/auth/register` - Register a new user

### Tasks

- **PUT** `/api/tasks` - Add a new task
- **POST** `/api/tasks` - Get all tasks for a user
- **PATCH** `/api/tasks/:id` - Update a task
- **PATCH** `/api/tasks/:id/status` - Update task status

### Admin

- **GET** `/api/users` - Get all premium and free users
- **PATCH** `/api/users/:email/status` - Update user status
- **GET** `/api/admin/tasks` - Get all tasks for admin
- **DELETE** `/api/admin/tasks/:id` - Delete a task

### Dashboard

- **POST** `/api/dashboard` - Get dashboard tasks (pending, completed, upcoming)
