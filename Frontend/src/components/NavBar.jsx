import React from "react";
import styles from "./NavBar.module.css";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
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
          <li>
            <NavLink
              to="/favorite"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Log-out
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
