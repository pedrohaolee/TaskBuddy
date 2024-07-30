import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound";
import NavBarAdmin from "./NavBarAdmin";
import AdminView from "./AdminView";
import AllTasksView from "./AllTasksView";

function MainPageAdmin() {
  return (
    <>
      <NavBarAdmin></NavBarAdmin>

      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route
            path="/"
            element={<Navigate replace to="/adminview" />}
          ></Route>
          <Route path="adminview" element={<AdminView />}></Route>
          <Route path="alltaskview" element={<AllTasksView />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default MainPageAdmin;
