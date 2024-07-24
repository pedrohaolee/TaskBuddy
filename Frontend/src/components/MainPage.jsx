import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound";
import NavBar from "./NavBar";
import Intro from "../pages/Intro";
import CreateTask from "./CreateTask";
import TaskList from "./TaskList";
import CalendarView from "./CalendarView";
import DashboardView from "./DashboardView";

function MainPage() {
  return (
    <>
      <NavBar></NavBar>

      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/intro" />}></Route>
          <Route path="createtask" element={<CreateTask />}></Route>
          <Route path="tasklist" element={<TaskList />}></Route>
          <Route path="calendar" element={<CalendarView />}></Route>
          <Route path="dashboard" element={<DashboardView />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default MainPage;
