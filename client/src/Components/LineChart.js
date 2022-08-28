import React,{useState,useEffect} from 'react';
import {Chart, registerables} from "chart.js";

import {colors} from "../Styles/Colors";
import {Line} from 'react-chartjs-2';
import {line_options} from "../Styles/Options";

const LineChart = ({user,span,total}) =>{
    //const [total,setTotal] =useState({});
    Chart.register(...registerables);

    // const apiCall = async () => {
    //     //calls totaler to make some changes
    //     if(user){
    //         let res = await fetch(`/api/users/totaler?uid=${user.uid}&span=${span}`);
    //         res.json().then((data) =>{
    //             setTotal(data);
    //         });
    //     }
    // };
    
    // useEffect(() => {
    //     if(user !== undefined && span){
    //         apiCall();
    //     }
    // }, [span,user])

    let new_colors={
        ...colors
    };
    new_colors.total="grey";
    const line_data=React.useMemo(()=>({
        
        labels:total.labels,
        datasets: Object.keys(new_colors).map((key)=>{
            return {
                "label":key,
                "fill":false,
                "borderColor":new_colors[key],
                "data":total[key+"-date"]
            }
        })
    }),[total]);
    

    return(
        <div>
            <Line options={line_options} data={line_data}></Line>
        </div>

    )   
}

export default LineChart