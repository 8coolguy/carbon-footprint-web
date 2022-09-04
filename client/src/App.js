import './App.css';
import Login from './Components/Login';
import Profile from './Components/Profile';
import Signup from './Components/Signup';
import Home from './Components/new_Home';
import DashNavbar from './Components/Navbar';
import VehicleForm from "./Components/VehicleForm";
import React,{useState} from 'react';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
function App() {
  const [isAuth,setIsAuth]=useState(localStorage.getItem("isAuth"));
  const [date,setDate]=useState(localStorage.getItem("date"));
  return (
  <Router >
    
    <DashNavbar isAuth={isAuth} setIsAuth={setIsAuth}/>
    <Routes>
      <Route path="/login" element={<Login isAuth={isAuth} setIsAuth={setIsAuth}/>}></Route>
      <Route path="/signup" element={<Signup isAuth={isAuth} setIsAuth={setIsAuth}/>}></Route>
      <Route path="/home" element={<Home setDate={setDate} isAuth={isAuth}/>}></Route>
      <Route path="/update" element={<VehicleForm isAuth={isAuth}/>}></Route>
      <Route path="/profile" element={<Profile isAuth={isAuth}/>}></Route>
      <Route path="/edit" element={<VehicleForm date={date} isAuth={isAuth}/>}></Route>
    </Routes>

  </Router>
  );
}

export default App;
