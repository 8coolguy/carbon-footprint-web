import React,{useState,useEffect} from 'react';
import {Chart, registerables} from "chart.js";

import {colors} from "../Styles/Colors";
import {Pie} from 'react-chartjs-2';
import {pie_options} from "../Styles/Options";
//import 'chartjs-adapter-moment';

const PieChart = ({user,span}) =>{
    const [total,setTotal]=useState({});
    Chart.register(...registerables);

    const apiCall = async () => {
        console.log("Pie Chart",user,span);
        if(user){
            let res = await fetch(`/api/users/totaler?uid=${user.uid}&span=${span}`);
            res.json().then((data) =>{
                setTotal(data);
            });
        }
    };
    useEffect(() => {
        if(user != undefined && span){
            apiCall();
        }
    }, [span,user]);
    const pie_data=React.useMemo(()=>({
        labels:Object.keys(colors),
        datasets: [{
            label: "C02 Emission",
            data:Object.keys(colors).map((key)=> total[key]),
            backgroundColor: Object.keys(colors).map(key=>colors[key])
        }]
    }),[total]);
    return(
        <div>
            <Pie options={pie_options} data={pie_data}></Pie>
        </div>

    )   
}

export default PieChart