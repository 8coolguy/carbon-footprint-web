import React, {useEffect,useState} from 'react';
import {HomeContainer} from '../Styles/Home.Style';
import {app} from '../firebase-auth';
import {getAuth,onAuthStateChanged} from 'firebase/auth';
import {Timestamp} from 'firebase/firestore';
import {Pie,Line} from 'react-chartjs-2';
import {useNavigate} from "react-router-dom";
import 'chartjs-adapter-moment';
import {
    Chart as ChartJS,
    registerables,
    
  } from 'chart.js';


export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Daily Carbon Footprint Distrubution',
        },
    },
  };
export const line_options= {
    scales: {
        x: {
            type: 'time'
        }
    }
}


const Home =({isAuth})=>{
    const [info, setData] =useState({});
    const navigate =useNavigate();
    const [user,setUser]=useState({});
    const [total,setTotal]=useState("");
    const [docs,setDocs]=useState({});
    const [lastupdate,setLastupdate] =useState("");

    ChartJS.register(...registerables);
    
    const apiCall = async (span) => {
        console.log(user);
        if(user){
            console.log(`/api/users/total?uid=${user.uid}&span=${span}`);
            let res = await fetch(`/api/users/total?uid=${user.uid}&span=${span}`);
            res.text().then((data) =>{
                let obj =JSON.parse(data);
                let t = obj.total;
                setTotal(t);
                delete obj.total;
                setData(obj);
            });
            res = await fetch(`/api/users/all?uid=${user.uid}&span=${span}`);
            res.text().then((data)=>{
                setDocs(JSON.parse(data));
            })
            res =await fetch(`api/users/lastupdated?uid=${user.uid}`);
            res.text().then((data)=>{
                let time =JSON.parse(data);
                setLastupdate(new Timestamp(time["_seconds"],time["_nanoseconds"]).toDate().toString());
            })
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
    const colors ={
        transportation:'rgba(255, 99, 132, 0.5)',
        food:'rgba(54, 162, 235, 0.5)',
        energy:'rgba(255, 206, 86, 0.5)',
    }
    const pie_data=React.useMemo(()=>({
        labels:Object.keys(info),
        datasets: [{
            label: "C02 Emission",
            data:Object.keys(info).map((key)=> info[key]),
            backgroundColor: Object.keys(info).map(key=>colors[key])
        }]
    }),[info]);
    const line_data=React.useMemo(()=>({
        type:'line',
        datasets: Object.keys(docs).map((key)=>{
            return {
                "label":key,
                "fill":false,
                "borderColor":colors[key],
                "data":Object.keys(docs[key]).map((doc)=>{
                    return {
                        "x":new Timestamp(docs[key][doc]["date"]["_seconds"],docs[key][doc]["date"]["_nanoseconds"]).toDate().toUTCString(), 
                        "y":docs[key][doc]['carbon-emission']
                    }
                })

            }
            
        
        
        })
    }),[docs]);
    
    return(
        <HomeContainer>
            <h1>Total CO2 Emissions</h1>
            <h2>{total} pounds of emissions</h2>
            <h3>Last Updated: {lastupdate}</h3>
            <button onClick={lastWeek}>Last Week</button>
            <button onClick={lastMonth}>Last Month</button>
            <button onClick={lastYear}>Last Year</button>
            <button onClick={allTime}> All Data </button>
            <Pie options={options} data={pie_data}></Pie>
            <Line options={line_options} data={line_data}></Line>
            
        </HomeContainer>
    );
}
export default Home;