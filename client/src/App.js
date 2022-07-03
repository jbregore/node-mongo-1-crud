import React, { useState, useEffect } from "react";
import SampleTable from "./components/SampleTable";
import {
  Routes,
  Route,
  Outlet,
  Navigate,
  useNavigate
} from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Test from "./components/Test";
import { useCookies } from "react-cookie";
import axios from "axios";


function App() {
  const navigate = useNavigate();
  // const [user, setUser] = useState(null);
  const user = localStorage.getItem("user");
  
  return (
    <Routes>
      {!user && (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </>
      )}

      {user && (
        <>
          <Route path="/pets" element={<SampleTable />} />
        </>
      )}

      {/* 404 routes */}
      <Route path="*" element={<Navigate to={user ? "/pets" : "/login"} />} />
      {/* <Route path="*" element={user ? <Test /> : <Login />} /> */}

    </Routes>
  );
}

export default App;
