import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import styles from "./DashboardView.module.css";

const DashboardView = () => {
  const userCtx = useContext(UserContext);
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch("http://localhost:5002/api/dashboard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userCtx.accessToken}`,
        },
        body: JSON.stringify({ email: userCtx.user }),
      });
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  const renderTasks = (tasks) => {
    return tasks.map((task) => (
      <div key={task.id} className={styles.task}>
        <br></br>
        <h4>{task.title}</h4>
        <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>
        <p>Priority: {task.priority}</p>
        <p>Category: {task.category}</p>
        <br></br>
      </div>
    ));
  };

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <div className={styles.stat}>
        <h3>Pending Tasks ({stats.pending_tasks_count})</h3>
        <ul>{stats.pending_tasks && renderTasks(stats.pending_tasks)}</ul>
      </div>
      <div className={styles.stat}>
        <h3>Completed Tasks ({stats.completed_tasks_count})</h3>
        <ul>{stats.completed_tasks && renderTasks(stats.completed_tasks)}</ul>
      </div>
      <div className={styles.stat}>
        <h3>Upcoming Tasks ({stats.upcoming_tasks_count})</h3>
        <ul>{stats.upcoming_tasks && renderTasks(stats.upcoming_tasks)}</ul>
      </div>
    </div>
  );
};

export default DashboardView;
