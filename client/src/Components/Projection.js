import React,{useState,useEffect} from 'react';
import {Chart, registerables} from "chart.js";

import {colors} from "../Styles/Colors";
import {Line} from 'react-chartjs-2';
import {total_line_options} from "../Styles/Options";

import {line_options} from "../Styles/Options";


const Projection = ({user,span,years,total}) =>{
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
    const cumulativeSum = (sum => value => sum += value)(0);
    const cumSumArr =(a)=>{
        if (!Array.isArray(a)) {
            return []
        }else{
            return a.map(cumulativeSum);
        }
        
    }
    const strToDate = (a)=>{
        if (!Array.isArray(a)) {
            return []
        }else{
            return a.map((date)=>new Date(date));
        }
        
    }
    const arrToPoint =(dates,values,years) =>{
        let res=[];
        if(!dates || !values){
            return res
        }
        for(let i =0; i<dates.length;i++){
            let obj={};
            obj.x =dates[i].toUTCString();
            obj.y =values[i]
            res.push(obj);
            
        }
        let tenypred={};
        let tenyear =new Date();
        tenyear.setUTCFullYear(tenyear.getUTCFullYear()+years);
        tenypred.x=tenyear;
        if(span==="a"){
            tenypred.y=years*total.total;
        }else if(span==="y"){
            tenypred.y=years*total.total;
        }else if(span==="m"){
            tenypred.y=12*years*total.total;
        }else{
            tenypred.y=52*years*total.total;
        }
        
        res.push(tenypred);
        return res;

    }
    const line_data=React.useMemo(()=>({
        
        datasets:[{
                "label":"total",
                "fill":false,
                "borderColor":new_colors["total"],
                "data":arrToPoint(strToDate(total.labels),cumSumArr(total["total-date"]),years),
                trendlineLinear: {
                    style: "grey",
                    lineStyle: "line",
                    width: 1
                }
            }],
        plugins:{
        title:{
            display:true,
            text: `${years} Projections`
        }
    }
        
    }),[total,years]);
    
    

    return(
        <div>
            <Line options={total_line_options} data={line_data}></Line>
        </div>
    )   
}

export default Projection;