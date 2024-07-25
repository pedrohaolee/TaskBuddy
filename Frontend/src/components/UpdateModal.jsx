import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";

const UpdateTaskModal = ({ task, closeModal }) => {
  const [title, setTitle] = useState(task.title);
  const [category, setCategory] = useState(task.category);
  const [priority, setPriority] = useState(task.priority);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.due_date);

  useEffect(() => {
    const formattedDate = new Date(task.due_date).toISOString().split("T")[0];
    setDueDate(formattedDate);
  }, [task.due_date]);

  const handleUpdate = async () => {
    const updatedTask = {
      title,
      category,
      priority,
      description,
      due_date: dueDate,
    };

    try {
      const response = await fetch(
        `http://localhost:5002/api/tasks/${task.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (response.ok) {
        closeModal();
      } else {
        console.error("Failed to update task");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className={styles["modal"]}>
      <div className={styles["modal-content"]}>
        <h3>Update Task</h3>
        <form>
          <div className={styles["form-control"]}>
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={styles["form-control"]}>
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="Work">Work</option>
              <option value="Family">Family</option>
              <option value="Misc">Misc</option>
            </select>
          </div>
          <div className={styles["form-control"]}>
            <label>Priority</label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              required
            >
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div className={styles["form-control"]}>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className={styles["form-control"]}>
            <label>Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
        </form>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={closeModal}>Close</button>
      </div>
    </div>
  );
};

export default UpdateTaskModal;
