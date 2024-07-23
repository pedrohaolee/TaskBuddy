import React, { useContext, useState } from "react";
import styles from "./CreateTask.module.css";
import UserContext from "../context/user";

const CreateTask = () => {
  const userCtx = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formattedDueDate = new Date(dueDate).toISOString().split("T")[0];

    const taskData = {
      title,
      category,
      priority,
      description,
      due_date: formattedDueDate,
      username: userCtx.user,
      completed,
    };

    try {
      const response = await fetch("http://localhost:5002/api/tasks", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (response.ok) {
        setSuccess("Task created successfully");
        setTitle("");
        setCategory("");
        setPriority("");
        setDescription("");
        setDueDate("");
        setCompleted(false);
      } else {
        const errorData = await response.json();
        setError(errorData.msg || "Failed to create task");
      }
    } catch (err) {
      setError("Error connecting to the server");
    }
  };

  return (
    <div className={styles["create-task-container"]}>
      <h2>Create Task</h2>

      <form onSubmit={handleSubmit}>
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
            <option value="" disabled>
              Select category
            </option>
            <option value="work">Work</option>
            <option value="family">Family</option>
            <option value="misc">Misc</option>
          </select>
        </div>
        <div className={styles["form-control"]}>
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            required
          >
            <option value="" disabled>
              Select priority
            </option>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="low">Low</option>
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
        <button type="submit" className={styles["submit-button"]}>
          Submit
        </button>
      </form>
      {error && <div className={styles["error-message"]}>{error}</div>}
      {success && <div className={styles["success-message"]}>{success}</div>}
    </div>
  );
};

export default CreateTask;
