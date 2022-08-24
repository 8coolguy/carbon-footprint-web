import React, {useState,useEffect} from 'react';
import {Timestamp} from "firebase/firestore";



const Totaler  = ({user,span})=>{
    const [lastUpdate,setLastupdate]=useState("");
    const [total,setTotal]=useState({});


    const apiCall = async () => {
        console.log("Totaler",user,span);
        if(user){
            let res = await fetch(`/api/users/totaler?uid=${user.uid}&span=${span}`);
            res.json().then((data) =>{
                setTotal(data);
            });
            res =await fetch(`api/users/lastupdated?uid=${user.uid}`);
            res.json().then((data)=>{
                setLastupdate(new Timestamp(data["_seconds"],data["_nanoseconds"]).toDate().toString());
            })
        }
    };
    useEffect(() => {
        if(user != undefined && span){
            apiCall();
        }
    }, [span,user])




    return(
        <div>
            <h1>Last Update:{lastUpdate}</h1>
            <h2>{total.total} pounds of C02 emissions in total</h2>
        </div>


    )





}
export default Totaler;