import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import styles from "./AllTasksView.module.css";
import useFetch from "../hooks/useFetch";

const AllTasksView = () => {
  const userCtx = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const usingFetch = useFetch();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      //   const response = await fetch("http://localhost:5002/api/admin/tasks", {
      //     headers: {
      //       Authorization: `Bearer ${userCtx.accessToken}`,
      //     },
      //   });
      //   const data = await response.json();
      const response = await usingFetch(
        "/api/admin/tasks",
        "GET",
        undefined,
        userCtx.accessToken
      );
      setTasks(response);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "TaskBuddy Alert: \n\n Are you sure you want to delete this task?"
      )
    ) {
      try {
        const result = await usingFetch(
          `/api/admin/tasks/${id}`,
          "DELETE",
          undefined,
          userCtx.accessToken
        );
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

  const truncateDescription = (description) => {
    const words = description.split(" ");
    return words.length > 10
      ? words.slice(0, 10).join(" ") + "..."
      : description;
  };

  return (
    <div className={styles.allTasks}>
      <h2>All Tasks</h2>
      {tasks.map((task) => (
        <div key={task.id} className={styles.task}>
          <h4>{task.title}</h4>
          <p>{truncateDescription(task.description)}</p>
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
