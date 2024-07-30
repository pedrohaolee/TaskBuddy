import React, { useContext } from "react";
import styles from "./NavBar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../context/user";

const NavBar = () => {
  const userCtx = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    userCtx.setUser(null);
    userCtx.setAccessToken(null);
    userCtx.setShowLogin(true);
    navigate("/");
  };

  return (
    <header className={styles.navbar}>
      <nav>
        <img
          src="/Logo2.webp"
          alt="TaskBuddy Logo"
          className={styles["nav-logo"]}
        />
        <ul>
          <li>
            <NavLink
              to="/createtask"
              className={(navData) => {
                return navData.isActive ? styles.active : "";
              }}
            >
              Create Task
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tasklist"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Task List
            </NavLink>
          </li>
          {userCtx.user && userCtx.role === "premium user" && (
            <li>
              <NavLink
                to="/calendar"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Calendar
              </NavLink>
            </li>
          )}
          {userCtx.user && userCtx.role === "premium user" && (
            <li>
              <NavLink
                to="/dashboard"
                className={(navData) => (navData.isActive ? styles.active : "")}
              >
                Dashboard
              </NavLink>
            </li>
          )}
          <li>
            <div className={styles.navbarItem}>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Log-out
              </button>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
