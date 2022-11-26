import React,{useState,useEffect} from 'react';
import {Link} from "react-router-dom";
import landing1 from "../images/landing1.png";
import landing2 from "../images/landing2.png"


const Landing =()=>{


    return(
        <div className="Home">
            <h1>Carbon Footprint Tracker</h1>
            <p>This website helps you keep track of your carbon footprint through out everyday activites. Built with React and Firebase, formulas from EPA.</p>
            <img src={landing1} alt=""></img>

            <Link to="/signup">New User?</Link>
            <Link to="/login">Login</Link>
        </div>
    )

}
export default Landing;