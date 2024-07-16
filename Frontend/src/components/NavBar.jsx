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
              to="/intro"
              className={(navData) => {
                return navData.isActive ? styles.active : "";
              }}
            >
              Intro
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/topmemes"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              TopMemes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/favorite"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              Favorite
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
