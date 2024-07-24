// DashboardView.jsx
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

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <div className={styles.stat}>
        <h3>Pending Tasks</h3>
        <p>{stats.pending_tasks}</p>
      </div>
      <div className={styles.stat}>
        <h3>Completed Tasks</h3>
        <p>{stats.completed_tasks}</p>
      </div>
      <div className={styles.stat}>
        <h3>Upcoming Tasks</h3>
        <p>{stats.upcoming_tasks}</p>
      </div>
    </div>
  );
};

export default DashboardView;
