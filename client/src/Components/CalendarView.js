import React,{useState,useEffect} from "react";
import {Chart, registerables} from "chart.js";

import {colors} from "../Styles/Colors";
import {Pie} from 'react-chartjs-2';
import {small_pie_options} from "../Styles/Options";
import {pie_options} from "../Styles/Options";
import Calendar from 'react-calendar';

import "../Styles/Calendar.css";

const CalendarView =({user})=>{
    const [cal_data,setData]=useState([]);
    Chart.register(...registerables);
    useEffect(() => {
        if(user){
            apiCall();
        }
    }, [user])

    const apiCall = async () => {
        console.log("Calendar View",user);
        if(user){
            let res = await fetch(`/api/users/totaler?uid=${user.uid}&span=y`);
            res.json().then((data) =>{
                var arr =[];
                for(var i = 0; i < data.labels.length; i++){
                    let obj={};
                    
                    
                    obj.date =new Date(data.labels[i]);
                    obj.transportation = data["transportation-date"][i];
                    obj.food = data["food-date"][i];
                    obj.energy = data["energy-date"][i];
                    arr.push(obj)
                }
                setData(arr);
            });
        }
    };
    const createPies = (date) =>{
        const findDate =
            
            cal_data.find((x) => {
                
                
                if(date.getDay() === new Date(x.date).getDay() &&
                date.getMonth() === new Date(x.date).getMonth() &&
                date.getDate() === new Date(x.date).getDate()){
                    console.log(pie_data(x));
                    return x;
                    
                }else{
                    return null;
                }
                ;
            });
        
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
    
    return(
        <div>
            <Calendar className="react-calendar" tileContent={({ activeStartDate, date, view }) => createPies(date)} maxDate={new Date()}/> 
        </div>


    )






}
export default CalendarView;