import './App.css';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import React,{useState} from 'react';
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
function App() {
  const [isAuth,setIsAuth]=useState(localStorage.getItem("isAuth"));
  return (
  <Router>
    
    <Navbar isAuth={isAuth} setIsAuth={setIsAuth}/>
    <Routes>
      <Route path="/login" element={<Login isAuth={isAuth} setIsAuth={setIsAuth}/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/home" element={<Home isAuth={isAuth}/>}></Route>
    </Routes>

  </Router>
  );
}

export default App;
