import React from "react";
import styles from "./Task.module.css";

const Task = ({ task, onDetail, onUpdate }) => {
  const truncateDescription = (description) => {
    const words = description.split(" ");
    return words.length > 10
      ? words.slice(0, 10).join(" ") + "..."
      : description;
  };

  return (
    <div className={styles["task-item"]}>
      <div className={styles["task-info"]}>
        <span>{task.title}</span>
        <span>{new Date(task.due_date).toLocaleDateString()}</span>
        <span>{truncateDescription(task.description)}</span>
        <div className={styles["task-actions"]}>
          <button onClick={() => onDetail(task)}>View detail</button>
          <button onClick={() => onUpdate(task)}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default Task;
