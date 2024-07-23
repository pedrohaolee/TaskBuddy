import React, { Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound";
import NavBar from "./NavBar";
import Intro from "../pages/Intro";
import CreateTask from "./CreateTask";

function MainPage() {
  return (
    <>
      <NavBar></NavBar>

      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Navigate replace to="/intro" />}></Route>
          <Route path="intro" element={<CreateTask />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default MainPage;
