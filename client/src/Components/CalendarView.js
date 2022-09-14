import React,{useState,useEffect} from "react";
import {Chart, registerables} from "chart.js";

import { useNavigate } from 'react-router-dom';

import {colors} from "../Styles/Colors";
import {Pie} from 'react-chartjs-2';
import {small_pie_options} from "../Styles/Options";
import Calendar from 'react-calendar';

import "../Styles/Calendar.css";

const CalendarView =({user,setDate,total})=>{
    const [cal_data,setData]=useState([]);
    const navigate =useNavigate();
    Chart.register(...registerables);
    useEffect(() => {
        if(total){
            apiCall();
        }
    }, [total])

    const apiCall = async () => {
        if(total.labels){
            
            var arr =[];
            for(var i = 0; i < total.labels.length; i++){
                let obj={};
                
                
                obj.date =new Date(total.labels[i]);
                obj.transportation = total["transportation-date"][i];
                obj.food = total["food-date"][i];
                obj.energy = total["energy-date"][i];
                arr.push(obj)
            }
            
            setData(arr);
            
        }
    };
    const createPies = (date,view) =>{
        const findDate =
            
            cal_data.find((x) => {
                
                
                if(date.getUTCFullYear() === new Date(x.date).getUTCFullYear() &&
                date.getMonth() === new Date(x.date).getMonth() &&
                date.getDate() === new Date(x.date).getDate()){
                   
                    return x;
                    
                }else{
                    return null;
                }
                ;
            });
        if(view!=="month")
            return (<></>)
        return findDate?
            (
                <div>
                    <Pie options={small_pie_options} data={pie_data(findDate)}></Pie>
                </div>
            )
            :<></>;

    }   
    const pie_data =(x)=>{
        return {
            labels:Object.keys(colors),
            datasets: [{
                data:Object.keys(colors).map((key)=> x[key]),
                backgroundColor: Object.keys(colors).map(key=>colors[key])
            }]
        }

    }
    const onDayClick=(value,event)=>{
        setDate(value.toJSON())
        if(value.getDay() === new Date().getDay() && value.getMonth() === new Date().getMonth() && value.getDate() === new Date().getDate()){
            navigate("/update");
        }else{
            navigate("/edit");
        }
        



    }
    
    return(
        <div>
            <h2>Edit entries:</h2>
            <Calendar className="react-calendar justify-content-md-center" tileContent={({ activeStartDate, date, view }) =>createPies(date,view)} maxDate={new Date()} onClickDay={(value, event) => onDayClick(value,event)}/> 
        </div>


    )






}
export default CalendarView;