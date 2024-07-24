import React, { useState, useEffect } from "react";
import styles from "./AdminView.module.css";

const AdminView = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5002/api/users");
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const toggleUserStatus = async (email, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      const response = await fetch(
        `http://localhost:5002/api/users/${email}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (response.ok) {
        setUsers(
          users.map((user) =>
            user.email === email ? { ...user, status: newStatus } : user
          )
        );
      } else {
        console.error("Failed to update user status");
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const groupedUsers = users.reduce((acc, user) => {
    const key = user.role;
    if (!acc[key]) acc[key] = [];
    acc[key].push(user);
    return acc;
  }, {});

  return (
    <div className={styles["admin-view-container"]}>
      <h2>Admin View</h2>
      {["premium user", "free user"].map((role) => (
        <div key={role}>
          <h3 className={styles["group-title"]}>
            {role === "premium user" ? "Premium User" : "Free User"}
          </h3>
          {groupedUsers[role] &&
            groupedUsers[role].map((user) => (
              <div key={user.email} className={styles["user-item"]}>
                <div className={styles["user-info"]}>
                  <span>Email: {user.email}</span>
                  <span>
                    Created at: {new Date(user.created_at).toLocaleDateString()}
                  </span>
                  <span>Status: {user.status ? "Active" : "Inactive"}</span>
                </div>
                <div className={styles["user-actions"]}>
                  <button
                    onClick={() => toggleUserStatus(user.email, user.status)}
                  >
                    {user.status ? "Deactivate" : "Activate"}
                  </button>
                </div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default AdminView;
