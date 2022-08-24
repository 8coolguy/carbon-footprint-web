import React,{useEffect} from 'react';
import {HomeContainer} from '../Styles/Home.Style'; 

import {auth} from '../firebase-auth';

import LineChart from "./LineChart";
import Totaler from "./Totaler";
import PieChart from "./PieChart";

class Home extends React.Component{
    constructor(){
        super();
        this.state={
            user:{},
            span:"a",





        }

        
    }
    componentDidMount(){
        auth.onAuthStateChanged((currentUser)=>{
            console.log(currentUser);
            this.setState({
                user:currentUser||{}
            })
        })
    }
    
    

    
    
    render(){
        
        const layout =(
            <HomeContainer>
                <h1>Total CO2 Emissions</h1>
                
                <button onClick={()=>console.log(this.state)}>State</button>
                <button onClick={()=>this.setState({span:"w"})}>Last Week</button>
                <button onClick={()=>this.setState({span:"m"})}>Last Month</button>
                <button onClick={()=>this.setState({span:"y"})}>Last Year</button>
                <button onClick={()=>this.setState({span:"a"})}> All Data </button>
                
                <Totaler user={this.state.user} span={this.state.span} />
                <LineChart user={this.state.user} span={this.state.span}/>
                <PieChart user={this.state.user} span={this.state.span}/>
                
            </HomeContainer>
        );
        return layout;
        //<h2>{this.state.user.displayName} pounds of emissions</h2>
        // <h3>Last Updated: {this.state.user}</h3>
        //<Pie options={options} data={pie_data}></Pie>
        //<Line options={line_options} data={line_data}></Line>






    }


}
export default Home;