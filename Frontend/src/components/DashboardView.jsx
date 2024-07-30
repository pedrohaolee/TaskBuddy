import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import styles from "./DashboardView.module.css";
import useFetch from "../hooks/useFetch";

const DashboardView = () => {
  const [stats, setStats] = useState({});
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await usingFetch(
        "/api/dashboard",
        "POST",
        { email: userCtx.user },
        userCtx.accessToken
      );
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
