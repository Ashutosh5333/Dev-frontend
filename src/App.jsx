import React, { useState, useEffect, useRef } from "react";
import AllRoutes from "./AllRoutes/AllRoutes";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./redux/AuthSlice/authSlice";

const App = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);

  //  console.log("user---->",user ,token)
  
  useEffect(() => {
     if(token){
      dispatch(fetchUserProfile());
     }
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <AllRoutes />
    </>
  );
};

export default App;
