import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import UserContext from "./context/user";
import Login from "./components/Login";
import Registration from "./components/Registration";
import MainPage from "./components/MainPage";
import MainPageAdmin from "./components/MainPageAdmin";

const queryClient = new QueryClient();

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [role, setRole] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [user, setUser] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider
        value={{
          accessToken,
          setAccessToken,
          role,
          setRole,
          user,
          setUser,
          showLogin,
          setShowLogin,
        }}
      >
        <BrowserRouter>
          {!accessToken && showLogin && <Login setShowLogin={setShowLogin} />}
          {!accessToken && !showLogin && (
            <Registration setShowLogin={setShowLogin}></Registration>
          )}
          {user &&
            accessToken &&
            (role === "admin" ? <MainPageAdmin /> : <MainPage />)}
        </BrowserRouter>
      </UserContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
