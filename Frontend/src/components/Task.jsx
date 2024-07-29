import React, { useContext, useEffect, useState } from "react";
import styles from "./Task.module.css";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";

const Task = ({ task, handleUpdate }) => {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);

  const truncateDescription = (description) => {
    const words = description.split(" ");
    return words.length > 10
      ? words.slice(0, 10).join(" ") + "..."
      : description;
  };

  const handleToggleStatus = async () => {
    try {
      const updatedTask = await usingFetch(
        `/api/tasks/${task.id}/status`,
        "PATCH",
        { completed: !isCompleted },
        userCtx.accessToken
      );
      setIsCompleted(!isCompleted);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div
      className={`${styles.taskItem} ${isCompleted ? styles.completed : ""}`}
    >
      <div className={styles.taskInfo}>
        <span>{task.title}&emsp;</span>
        <span>
          {new Date(task.due_date).toLocaleDateString()}
          &emsp;&emsp;
        </span>
        <span>
          {truncateDescription(task.description)}&emsp;&emsp;&emsp;&emsp;
        </span>
      </div>
      <div className={styles.taskActions}>
        <button onClick={handleToggleStatus}>
          {isCompleted ? "Mark as Undone" : "Mark as Done"}
        </button>
        <button onClick={() => handleUpdate(task)}>Update</button>
      </div>
      <br />
    </div>
  );
};

export default Task;
