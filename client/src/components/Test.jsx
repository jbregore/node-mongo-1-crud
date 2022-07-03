import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const Test = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  // useEffect(() => {
  //   const verifyUser = async () => {
  //     if(!cookies.jwt){
  //       navigate("/login");
  //     }else{
  //       const {data} = await axios.post("http://localhost:5000",
  //       {

  //       }, {withCredentials: true});
  //       if(!data.status){
  //         removeCookie("jwt");
  //         navigate("/login");
  //       }else{
  //         alert(`Hi ${data.user}`);
  //       }
  //     }
  //   }
  //   verifyUser();
  // }, [cookies, navigate, removeCookie]);

  const logout = () => {
    removeCookie("jwt");
    localStorage.clear();
    navigate("/");
  };

  return (
    <div>
      <p>Test</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Test;
