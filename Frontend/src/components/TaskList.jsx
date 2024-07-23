import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import styles from "./TaskList.module.css";

const TaskList = () => {
  const { user } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [viewBy, setViewBy] = useState("priority"); // 'priority' or 'category'
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [user]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5002/api/tasks");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleViewDetail = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleUpdate = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const truncateDescription = (description) => {
    const words = description.split(" ");
    return words.length > 10
      ? words.slice(0, 10).join(" ") + "..."
      : description;
  };

  const groupedTasks = tasks.reduce((acc, task) => {
    const key = viewBy === "priority" ? task.priority : task.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(task);
    return acc;
  }, {});

  return (
    <div className={styles["task-list-container"]}>
      <div className={styles["view-options"]}>
        <button
          onClick={() => setViewBy("priority")}
          className={viewBy === "priority" ? styles["active"] : ""}
        >
          View by priority
        </button>
        <button
          onClick={() => setViewBy("category")}
          className={viewBy === "category" ? styles["active"] : ""}
        >
          View by category
        </button>
      </div>

      {Object.keys(groupedTasks).map((group) => (
        <div key={group}>
          <h3 className={styles["group-title"]}>{group}</h3>
          <div className={styles["header-row"]}>
            <span>Title</span>
            <span>Due Date</span>
            <span>Description</span>
            <span>Actions</span>
          </div>
          {groupedTasks[group].map((task) => (
            <div key={task.id} className={styles["task-item"]}>
              <div className={styles["task-info"]}>
                <span>{task.title}</span>
                <span>{new Date(task.due_date).toLocaleDateString()}</span>
                <span>{truncateDescription(task.description)}</span>
                <div className={styles["task-actions"]}>
                  <button onClick={() => handleViewDetail(task)}>
                    View detail
                  </button>
                  <button onClick={() => handleUpdate(task)}>Update</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      {showModal && selectedTask && (
        <div className={styles["modal"]}>
          <div className={styles["modal-content"]}>
            <h3>{selectedTask.title}</h3>
            <p>Category: {selectedTask.category}</p>
            <p>Priority: {selectedTask.priority}</p>
            <p>
              Due Date: {new Date(selectedTask.due_date).toLocaleDateString()}
            </p>
            <p>Description: {selectedTask.description}</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList;
