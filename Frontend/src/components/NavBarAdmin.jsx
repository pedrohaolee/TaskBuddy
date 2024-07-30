import React, { useContext } from "react";
import styles from "./NavBar.module.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserContext from "../context/user";

const NavBarAdmin = () => {
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
        <h2>Admin Portal</h2>
        <ul>
          <li>
            <NavLink
              to="/adminview"
              className={(navData) => {
                return navData.isActive ? styles.active : "";
              }}
            >
              Admin View
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/alltaskview"
              className={(navData) => (navData.isActive ? styles.active : "")}
            >
              All Tasks
            </NavLink>
          </li>
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

export default NavBarAdmin;
