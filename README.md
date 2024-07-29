# TaskBuddy

TaskBuddy is a full-stack, single-page application designed for managing personal tasks. It supports different user roles (Admin, Premium User, and Free User) and provides a Calendar View and Dashboard View for premium users.

## Screenshots

### Login Page

![Login Page](path/to/login_screenshot.png)

### Registration Page

![Registration Page](path/to/registration_screenshot.png)

### Main Page

![Main Page](path/to/main_screenshot.png)

### Calendar View

![Calendar View](path/to/calendar_screenshot.png)

### Admin Dashboard

![Admin Dashboard](path/to/admin_dashboard_screenshot.png)

### All Tasks View

![All Tasks View](path/to/all_tasks_view_screenshot.png)

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

1. The environment variables:

   ```bash
   DATABASE_URL=postgres://db_user:example@localhost:5432/taskbuddy
   ACCESS_SECRET=your_access_secret
   ```

### Project Planning

Find the public board used for the project's planning [here](http://your-planning-board-url).

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

## Unit and Integration Tests

To run the tests, use the following command:

```

```
