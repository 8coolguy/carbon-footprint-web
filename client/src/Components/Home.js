import React, {useEffect,useState} from 'react';
import {app} from '../firebase-auth';
import {getAuth,onAuthStateChanged} from 'firebase/auth';
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
    const [info, setData] =useState({});
    const navigate =useNavigate();
    const [user,setUser]=useState({});
    ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
    const apiCall = async (span) => {
        console.log(user);
        if(user){
            console.log(`/api/users/total?uid=${user.uid}&span=${span}`);
            let res = await fetch(`/api/users/total?uid=${user.uid}&span=${span}`);
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
        const auth =getAuth();
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                console.log("Statechange",currentUser);
            }
            else{
                navigate('/login');
            }
        });
        
    }, []);

    const data=React.useMemo(()=>({
        labels:Object.keys(info),
        datasets: [{
            label: "C02 Emisson",
            data:Object.keys(info).map((key)=> info[key]),
        }]
    }),[info]);
    return(
        <div>
            <h1>{user.displayName}</h1>
            <button onClick={lastWeek}>Last Week</button>
            <button onClick={lastMonth}>Last Month</button>
            <button onClick={lastYear}>Last Year</button>
            <button onClick={allTime}> All Data </button>
            <Bar options={options} data={data}></Bar>
        </div>
    );
}
export default Home;