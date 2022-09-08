import React from 'react';
import {HomeContainer} from '../Styles/Home.Style'; 
import {Timestamp} from 'firebase/firestore';
import {auth} from '../firebase-auth';
import 'chartjs-adapter-moment';
import Projection from "./Projection";
import LineChart from "./LineChart";
import Totaler from "./Totaler";
import PieChart from "./PieChart";
//Bootstrap Components
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Card from 'react-bootstrap/Card' ;

import CalendarView from "./CalendarView";
import 'react-calendar/dist/Calendar.css';


class Home extends React.Component{
    constructor(){
        super();
        this.state={
            user:{},
            span:"a",
            total:{},
            lastUpdate:""

        }
        
    }
    componentDidMount(){
        auth.onAuthStateChanged((currentUser)=>{
            if(currentUser){
                this.setState({
                    user:currentUser||{}
                },()=>this.apiCall());
            }
        })
    }
    apiCall = async () => {
        //calls totaler to make some changes
        if(this.state.user){
            let res = await fetch(`/api/users/totaler?span=${this.state.span}`);
            res.json().then((data) =>{
                this.setState({total:data})
                //setTotal(data);
            });
            res=await fetch('/api/users/lastupdated');
            res.json().then((data)=>this.setState({lastUpdate:new Timestamp(data["_seconds"],data["_nanoseconds"]).toDate().toString()}));
        }
    };
    

    
    
    render(){
        
        const layout =(
            <HomeContainer>
                <Container>
                <Row className="justify-content-md-center">
                    <Col md={6}>
                    <h1>Carbon Footprint Dashboard</h1>
                                       
                    <ButtonGroup>
                        <Button onClick={()=>this.setState({span:"w"},()=>this.apiCall())}>Last Week</Button>
                        <Button onClick={()=>this.setState({span:"m"},()=>this.apiCall())}>Last Month</Button>
                        <Button onClick={()=>this.setState({span:"y"},()=>this.apiCall())}>Last Year</Button>
                        <Button onClick={()=>this.setState({span:"a"},()=>this.apiCall())}> All Data </Button>
                    </ButtonGroup>
                    </Col>
                </Row>

                <Card className="justify-content-md-center">
                    <Totaler lastUpdate={this.state.lastUpdate} total={this.state.total}/>
                </Card>
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <Card>
                            <LineChart  total={this.state.total}/>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card>
                            <PieChart  total={this.state.total}/>
                        </Card>
                    </Col>
                <Row>
                    <Col md={8}>
                        <Card>
                            <Projection years={5} total={this.state.total}/> 
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card >
                            <CalendarView  setDate={this.props.setDate} total={this.state.total}/>
                        </Card>
                    </Col>
                </Row>
                    
                </Row>
                </Container>
            </HomeContainer>
        );
        return layout;
        //<h2>{this.state.user.displayName} pounds of emissions</h2>
        // <h3>Last Updated: {this.state.user}</h3>
        //<Pie options={options} data={pie_data}></Pie>
        //<Line options={line_options} data={line_data}></Line>

        //<Col md={4}>
        //<Projection user={this.state.user} span={this.state.span}/>
        //</Col>

    }

}
export default Home;