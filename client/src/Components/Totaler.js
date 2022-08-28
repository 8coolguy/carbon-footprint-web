import React, {useState,useEffect} from 'react';
import {Timestamp} from "firebase/firestore";



const Totaler  = ({user,span,total})=>{
    const [lastUpdate,setLastupdate]=useState("");
    //const [total,setTotal]=useState({});

    //98pounds of c02 is 5gallons of gasoline or .053 acres of forest for one year
    // const apiCall = async () => {
    //     //console.log("Totaler",user,span);
    //     if(user){
    //         let res = await fetch(`/api/users/totaler?uid=${user.uid}&span=${span}`);
    //         res.json().then((data) =>{
    //             setTotal(data);
    //         });
    //         res =await fetch(`api/users/lastupdated?uid=${user.uid}`);
    //         res.json().then((data)=>{
    //             setLastupdate(new Timestamp(data["_seconds"],data["_nanoseconds"]).toDate().toString());
    //         })
    //     }
    // };
    // useEffect(() => {
    //     if(user !== undefined && span){
    //         apiCall();
    //     }
    // }, [span,user])




    return(
        <div>
            <h1>{Math.round(total.total,2)} pounds of C02 emissions</h1>
            <p>Last Update: {lastUpdate}</p>
            <h3 style={{color:"red"}}> is equivalent to {Math.round(total.total*(5/98))} gallons of gasoline or traveling {Math.round(total.total*(110/98))} miles in the average car</h3>
            <h3 style={{color:"green"}}> is equivalent to {Math.round(total.total*(.053/98))} acres of forest sequestering CO2 for one year</h3>
        </div>
    )
}
export default Totaler;