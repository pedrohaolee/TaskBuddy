import React, { useState, useEffect, useContext } from "react";
import UserContext from "../context/user";
import Task from "./Task";
import UpdateModal from "./UpdateModal";
import styles from "./TaskList.module.css";
import useFetch from "../hooks/useFetch";

const TaskList = () => {
  const userCtx = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [viewBy, setViewBy] = useState("priority");
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const usingFetch = useFetch();

  useEffect(() => {
    fetchTasks();
  }, [userCtx.user]);

  const fetchTasks = async () => {
    try {
      const response = await usingFetch(
        "/api/tasks",
        "POST",
        { email: userCtx.user },
        userCtx.accessToken
      );
      setTasks(response);
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

  const closeModal = () => {
    setShowModal(false);
    setSelectedTask(null);
    fetchTasks();
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
            <Task
              key={task.id}
              task={task}
              onDetail={handleViewDetail}
              handleUpdate={handleUpdate}
            />
          ))}
        </div>
      ))}

      {showModal && selectedTask && (
        <UpdateModal task={selectedTask} closeModal={closeModal} />
      )}
    </div>
  );
};

export default TaskList;
