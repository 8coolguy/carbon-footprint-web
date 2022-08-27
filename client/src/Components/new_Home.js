import React from 'react';
import {HomeContainer} from '../Styles/Home.Style'; 

import {auth} from '../firebase-auth';

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
            if(currentUser){
                this.setState({
                    user:currentUser||{}
                });
            }
        })
    }
    
    

    
    
    render(){
        
        const layout =(
            <HomeContainer>
                <Container>
                <Row className="justify-content-md-center">
                    <Col md={6}>
                    <h1>Carbon Footprint Dashboard</h1>
                    
                   
                    <ButtonGroup>
                        <Button onClick={()=>this.setState({span:"w"})}>Last Week</Button>
                        <Button onClick={()=>this.setState({span:"m"})}>Last Month</Button>
                        <Button onClick={()=>this.setState({span:"y"})}>Last Year</Button>
                        <Button onClick={()=>this.setState({span:"a"})}> All Data </Button>
                    </ButtonGroup>
                    </Col>
                </Row>
                
                <Totaler user={this.state.user} span={this.state.span} />
                <Row>
                <Col md={8}>
                    <LineChart user={this.state.user} span={this.state.span}/>
                </Col>
                <Col md={4}>
                    <PieChart user={this.state.user} span={this.state.span}/>
                </Col>
                    <Col md={4}>
                        
                    </Col>
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