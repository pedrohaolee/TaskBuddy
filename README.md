# TaskBuddy

TaskBuddy is a full-stack, single-page application designed for managing personal tasks. It supports different user roles (Admin, Premium User, and Free User) and provides a Calendar View and Dashboard View for premium users.

## Screenshots

### Login Page

The login page allows users to securely sign in to their TaskBuddy account. It features a clean and straightforward interface to ensure easy access.

![Login Page](https://github.com/pedrohaolee/TaskBuddy/blob/main/login_screenshot.png)

### Registration Page

New users can register for a TaskBuddy account on this page. The form captures essential information and includes validation to ensure data integrity.

![Registration Page](https://github.com/pedrohaolee/TaskBuddy/blob/main/registration_screenshot.png)

### Main Page

The main page is where users manage their tasks. They can create new tasks and view existing ones. Tasks can be viewed by priority or category, making it easy to stay organized.

![Create Task](https://github.com/pedrohaolee/TaskBuddy/blob/main/TaskBarFree.png)

#### Task View By Priority

Tasks are displayed grouped by their priority, helping users focus on what matters most.

![Task View By Priority](https://github.com/pedrohaolee/TaskBuddy/blob/main/TaskVIewByPriority.png)

#### Task View By Category

Tasks can also be grouped by category, allowing users to see related tasks together.

![Task View By Category](https://github.com/pedrohaolee/TaskBuddy/blob/main/TaskVIewByCategory.png)

### Calendar For Premium Users

Premium users have access to a calendar view where tasks are displayed according to their due dates. This feature provides a visual overview of upcoming tasks.

![Calendar View](https://github.com/pedrohaolee/TaskBuddy/blob/main/CalendarView.png)

### Dashboard For Premium Users

The dashboard for premium users provides insights into their tasks, including pending, completed, and upcoming tasks. This helps users stay on top of their to-do lists.

![Dashboard View](https://github.com/pedrohaolee/TaskBuddy/blob/main/Dashboard.png)

### Admin Dashboard

The admin dashboard allows administrators to manage users and their tasks. Admins can view user details, update their status, and ensure the smooth operation of the application.

![Admin Dashboard](https://github.com/pedrohaolee/TaskBuddy/blob/main/AdminView.png)

### All Tasks View

Admins can view all tasks in the system, making it easy to monitor and manage task entries across all users.

![All Tasks View](https://github.com/pedrohaolee/TaskBuddy/blob/main/AllTasksView.png)

## Technologies Used

- Frontend: React
- Backend: Node.js with Express
- Database: PostgreSQL
- Authentication: JWT
- Styling: CSS Modules
- Calendar: react-big-calendar

## Getting Started

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

## Project Planning

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
