import React, { useState } from "react";
import styles from "./CreateTask.module.css";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your create task logic here
    console.log({ title, category, priority, description, dueDate });
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
    </div>
  );
};

export default CreateTask;
