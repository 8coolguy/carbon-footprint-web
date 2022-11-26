import React, {useState,useEffect} from 'react';
import {Timestamp} from "firebase/firestore";
import Reccomender from "./Reccomendations"
import Col from 'react-bootstrap/Col';

import carIcon from "../images/car.png";
import forrestIcon from "../images/forrest.png";


const Totaler  = ({lastUpdate,total,soec})=>{
    

    return(
        <div>
            <h1>{Math.round(total.total,2)} pounds of C02 emissions</h1>
            <p>Last Update: {lastUpdate}</p>
            <img width="50" height="40" src={carIcon} alt=""></img>
            <h3 style={{color:"red"}}> is equivalent to {Math.round(total.total*(5/98))} gallons of gasoline or traveling {Math.round(total.total*(110/98))} miles in the average car</h3>
            <img width="50" height="40" src={forrestIcon} alt=""></img>
            <h3 style={{color:"green"}}> is equivalent to {Math.round(total.total*(.053/98))} acres of forest sequestering CO2 for one year</h3>
            <Reccomender soec={soec} total={total}/>
        </div>
    )
}
export default Totaler;