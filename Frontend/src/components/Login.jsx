import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";
import { useQuery } from "@tanstack/react-query";
import styles from "./Login.module.css";

const Login = (props) => {
  const usingFetch = useFetch();
  const userCtx = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isError, error, data, refetch } = useQuery({
    queryKey: ["login"],
    queryFn: async () => {
      try {
        return await usingFetch("/auth/login", "POST", { email, password });
      } catch (error) {
        throw error.message;
      }
    },
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      userCtx.setAccessToken(data.access);
      const decoded = jwtDecode(data.access);
      userCtx.setRole(decoded.role);
    }
  }, [data]);

  //   const handleLogin = async () => {
  //     const res = await usingFetch("/auth/login", "POST", { email, password });

  //     userCtx.setAccessToken(res.access);
  //     const decoded = jwtDecode(res.access);
  //     userCtx.setRole(decoded.role);
  //   };

  return (
    <div className={styles["login-body"]}>
      {isError && JSON.stringify(error)}
      <div className={styles.container}>
        <div className={styles["login-container"]}>
          <img
            src="/Logo2.webp"
            alt="User icon"
            className={styles["login-logo"]}
          />

          <div className={styles["form-control"]}>
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>

          <div className={styles["form-control"]}>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
        </div>
      </div>

      <button className={styles["form-control"]} onClick={refetch}>
        Login
      </button>

      <button
        className={styles["form-control"]}
        onClick={() => props.setShowLogin(false)}
      >
        Register
      </button>
    </div>
  );
};

export default Login;
