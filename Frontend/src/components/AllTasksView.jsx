// AllTasksView.jsx
import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import styles from "./AllTasksView.module.css";

const AllTasksView = () => {
  const userCtx = useContext(UserContext);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5002/api/admin/tasks", {
        headers: {
          Authorization: `Bearer ${userCtx.accessToken}`,
        },
      });
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const response = await fetch(
          `http://localhost:5002/api/admin/tasks/${id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${userCtx.accessToken}`,
            },
          }
        );
        const result = await response.json();
        if (result.status === "success") {
          setTasks(tasks.filter((task) => task.id !== id));
        } else {
          alert("Error deleting task");
        }
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Error deleting task");
      }
    }
  };

  return (
    <div className={styles.allTasks}>
      <h2>All Tasks</h2>
      {tasks.map((task) => (
        <div key={task.id} className={styles.task}>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Due: {new Date(task.due_date).toLocaleDateString()}</p>
          <p>Priority: {task.priority}</p>
          <p>Category: {task.category}</p>
          <p>Status: {task.completed ? "Completed" : "Pending"}</p>
          <button
            onClick={() => handleDelete(task.id)}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllTasksView;
