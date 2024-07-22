import React, { useState } from "react";
import useFetch from "../hooks/useFetch";
import { useMutation, useQuery } from "@tanstack/react-query";
import styles from "./Registration.module.css";

const Registration = (props) => {
  const usingFetch = useFetch();
  const [roles, setRoles] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [role, setRole] = useState("");

  const { isSuccess, isError, error, isFetching, data } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => await usingFetch("/roles"),
  });

  console.log(data);

  const { mutate } = useMutation({
    mutationFn: async () => {
      await usingFetch("/auth/register/", "PUT", { email, password, role });
    },
    onSuccess: () => props.setShowLogin(true),
  });

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordsMatch(e.target.value === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordsMatch(e.target.value === password);
  };

  return (
    <div className={styles["signup-body"]}>
      <br />
      <div className={styles["signup-container"]}>
        <div className={styles["form-control"]}></div>
        <input
          className="col-md-4"
          placeholder="email"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <div className="col-md-4"></div>
      </div>

      <div className={styles["signup-container"]}>
        <div className={styles["form-control"]}></div>
        <input
          className="col-md-4"
          placeholder="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        ></input>
        <div className="col-md-4"></div>
      </div>

      <div className={styles["signup-container"]}>
        <div className={styles["form-control"]}></div>
        <input
          className="col-md-4"
          placeholder="confirm password"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        ></input>
        <div className="col-md-4"></div>
      </div>

      {!passwordsMatch && (
        <div className={styles["error-message"]}>Passwords do not match</div>
      )}

      <div className="row">
        <div className="col-md-4"></div>
        <select
          name="roles"
          id="roles"
          className="col-md-4"
          value={role}
          onChange={(e) => {
            setRole(e.target.value);
          }}
        >
          <option value="none">select</option>
          {data &&
            data.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
        </select>
        <div className="col-md-4"></div>

        <div className="row">
          <div className="col-md-4"></div>
          <button
            className={styles["register-button"]}
            onClick={mutate}
            disabled={!passwordsMatch}
          >
            register
          </button>
          <div className="col-md-4"></div>
        </div>

        <div className="row">
          <div className="col-md-4"></div>
          <button
            className={styles["signup-footer"]}
            onClick={() => props.setShowLogin(true)}
          >
            go to login screen
          </button>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
