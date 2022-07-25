import React, {useEffect,useState} from 'react';
import {app} from '../firebase-auth';
import {onAuthStateChanged, signOut, getAuth} from 'firebase/auth';
import { Bar } from 'react-chartjs-2';
import {useNavigate} from "react-router-dom";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

const auth =getAuth(app);
export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Carbon  Footprint',
        },
    },
  };


const Home =({isAuth})=>{
    const navigate =useNavigate();

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
      );
    const [info, setData] =useState({});
    const apiCall = async (span) => {
        console.log(auth.currentUser.uid);
        if(isAuth && auth){
            let res = await fetch(`/api/users/total?uid=${auth.currentUser.uid}&span=${span}`);
            res.text().then((data) =>{
                setData(JSON.parse(data));
            });

            
        }
                
    };
    const lastMonth =()=> {
        apiCall("m");
    }
    const lastYear =()=> {
        apiCall("y");
    }
    const lastWeek =()=> {
        apiCall("w");
    }
    const allTime =() => {
        apiCall('a');
    }
    
    useEffect(() => {
        if(isAuth===false){
            console.log("switch page")
            navigate("/login");
        }
        apiCall('a')
    }, []);


    //for logging purpose only
    useEffect(() => {
        console.log("Home",data);
    }, [info]);

    const data=React.useMemo(()=>({
        labels:Object.keys(info),
        datasets: [{
            label: "C02 Emisson",
            data:Object.keys(info).map((key)=> info[key]),
        }]
    }),[info]);

    
    //

    return(
        <div>
            <h1>Home Page</h1>
            <button onClick={lastWeek}>Last Week</button>
            <button onClick={lastMonth}>Last Month</button>
            <button onClick={lastYear}>Last Year</button>
            <button onClick={allTime}> All Data </button>
            <Bar options={options} data={data}></Bar>
        </div>
    );
    

}
export default Home;