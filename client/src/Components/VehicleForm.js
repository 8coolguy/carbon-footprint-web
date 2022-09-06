import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
//import footpic from './footpriint.ico'
import {auth} from '../firebase-auth';
import electricIcon from "../images/electric.png";
import gasIcon from "../images/gas.png";
import vegIcon from "../images/veg.png";
import nonvegIcon from "../images/nonveg.png";
import airMileageIcon from "../images/airMileage.png";


class VehicleForm extends React.Component {
    constructor(props) {
        super(props);
        
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.categories =["electric","gas","carMileage","airMileage","nonveg","veg"]
        
        this.state = {
                      user:{},
                      data:{},
                      electric: '',
                      gas: '',
                      carMileage: '',
                      airMileage: '',
                      nonveg: '',
                      veg: '',
                      submitted: false,
                      carbonDaily: 0,
                      carbonMonthly: 0,
                      carbonYearly: 0};
    }
    componentDidMount(){
        auth.onAuthStateChanged((currentUser)=>{
            this.setState({
                user:currentUser||{}
            },()=>{
                    
                    this.getLastEntry();
                })
                
            
            
        })
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });

    }
    
    handleSubmit(event) {
        
        
        event.preventDefault();
        this.setState({
            submitted: true
        });
        this.calculateCarbon();
    }

    electric(){
        let total = (5 * this.state.electric / 30); 
        return total;
        
    }
    gas(){
        let total =(10 * this.state.gas / 30);
        return total;
        
    }
    carMileage(){
        let total = (0.8 * this.state.carMileage);
        return total;
        
    }
    airMileage(){
        let total =(0.43 * this.state.airMileage / 365);
        return total;
        
    }
    nonveg(){
        let total=(1.5 * this.state.nonveg / 7);
        return total;
        
    }
    veg(){
        let total= (0.3 * this.state.veg / 7);
        return total;
        
    }
    updateDataState(veg,nonveg,electric,gas,airMileage,carMileage){
        this.setState(prevState => ({
            data: {                   // object that we want to update
                ...prevState.data,    // keep all other key-value pairs
                "veg": veg,            // update the value of specific key
                "veg-input":this.state.veg,
                "nonveg":nonveg,
                "nonveg-input":this.state.nonveg,
                "electric":electric,
                "electric-input":this.state.electric,
                "gas":gas,
                "gas-input":this.state.gas,
                "airMileage":airMileage,
                "airMileage-input":this.state.airMileage,
                "carMileage":carMileage,
                "carMileage-input":this.state.carMileage
            }
        }),()=>{this.createDoc()})
    }
    calculateCarbon() {
        let electric = this.electric();
        let gas =this.gas();
        let carMileage=this.carMileage();
        let airMileage=this.airMileage();
        let nonveg =this.nonveg();
        let  veg =this.veg();
        this.updateDataState(veg,nonveg,electric,gas,airMileage,carMileage);
        

        const totalDailyCarbon = electric
             + gas
             + carMileage
             + airMileage
             + nonveg
             + veg;
        const totalMonthlyCarbon = electric*30
            + gas*30
            + carMileage*30
            + airMileage*(365 / 52)
            + nonveg*4*7 
            + veg*4*7;
        const totalYearlyCarbon = electric*30*12
            + gas*30*12
            + carMileage*350
            + airMileage*365
            + nonveg*52*7 
            + veg*52*7;

        this.setState({
            carbonDaily: totalDailyCarbon,
            carbonMonthly: totalMonthlyCarbon,
            carbonYearly: totalYearlyCarbon
        });
    }
    createDoc(){
            console.log("Update",this.state.data);
            if(Object.keys(this.state.data).length ===12){
                let headers =new Headers();
                headers.append("Content-Type", "application/json");
                var raw = JSON.stringify({
                    "uid":this.state.user.uid,
                    "data":this.state.data
                });
                if(this.props.date){
                    raw = JSON.stringify({
                        "uid":this.state.user.uid,
                        "date":this.props.date,
                        "data":this.state.data
                    });
                }
                var requestOptions = {
                    method: 'POST',
                    headers: headers,
                    body: raw,
                    redirect: 'follow'
                };
                fetch("/api/users/createdoc", requestOptions)
                    .then(response => response.text())
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));
            }
        
    }
    async getLastEntry(){
        let res = await fetch(`/api/users/lastdoc?uid=${this.state.user.uid}`);
            res.json()
                .then(data=> {
                    this.categories.forEach((key)=>{
                        let datakey = key+"-input";
                        this.setState({[key]:data[datakey]});
                    })
                })
            return;
    }

    render(){
        const form = (
            <div className="App-header">
                <p>Editing: {this.props.date?new Date(this.props.date).toString():"Today"}</p>
                
                <Form>
                    <Form.Group className="mb-3" controlId="form">
                    <img width="40" height="40" src={electricIcon} alt="h"></img>
                    <Form.Label>Electricity Bill</Form.Label>
                    <Form.Control type="text" name="electric" value={this.state.electric} placeholder="Enter this month's electricity bill payment in dollars" onChange={this.handleChange}/>
                    <input type="checkbox" id="solar" value="Solar"></input>
                    <label htmlFor="solar"> Solar </label>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="form">
                    <img width="40" height="40" src={gasIcon} alt=""></img>
                    <Form.Label>Gas Bill</Form.Label>
                    <Form.Control type="number" name="gas" value={this.state.gas} placeholder="Enter this month's gas bill payment in dollars" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="form">
                    <img width="40" height="40" src="" alt=""></img>
                    <Form.Label>Number of Miles driven per day by non electric vehicles</Form.Label>
                    <Form.Control type="number" name="carMileage" value={this.state.carMileage} placeholder="Enter number of miles driven per day" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="form">
                    <img width="40" height="40" src={airMileageIcon} alt=""></img>
                    <Form.Label>Air Travel: Miles traveled</Form.Label>
                    <Form.Control type="number" name="airMileage" value={this.state.airMileage} placeholder="Enter number of miles traveled this year by airplane" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="form">
                    <img width="40" height="40" src={nonvegIcon} alt=""></img>
                    <Form.Label>Non-veg servings per week</Form.Label>
                    <Form.Control type="number" name="nonveg" value={this.state.nonveg} placeholder="Enter the number of non-veg servings you consume per week" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="form">
                    <img width="40" height="40" src={vegIcon} alt=""></img>
                    <Form.Label>Veg servings per week</Form.Label>
                    <Form.Control type="number" name="veg" value={this.state.veg} placeholder="Enter the number of veg servings you consume per week" onChange={this.handleChange}/>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={this.handleSubmit}>
                    Submit
                    </Button>
                </Form>
                
            </div>
        );

        const footprint = (
            <div>

                {/* <Image>variant="top" src="https://www.nicepng.com/png/detail/104-1048345_eco-footprint-we-can-make-a-change-carbon.png" fluid='true' roundedCircle</Image> */}

                <Card>
                    <Card.Img variant="top" src="https://www.nicepng.com/png/detail/104-1048345_eco-footprint-we-can-make-a-change-carbon.png" fluid='true' roundedCircle/>
                    <Card.Title>Your total Carbon Footprint:</Card.Title>
                    <Card.Body><b>{parseInt(this.state.carbonDaily).toString()}</b> lbs of CO2 per day, <b>{parseInt(this.state.carbonMonthly).toString()}</b> lbs of CO2 per month, and <b>{parseInt(this.state.carbonYearly).toString()}</b> lbs of CO2 per year.</Card.Body>
                </Card>

                {/* 
                    <header1>electric = {(this.state.electric).toString()}</header1>
                    <header1>gas = {(this.state.gas).toString()}</header1>
                    <header1>carMileage = {(this.state.carMileage).toString()}</header1>
                    <header1>airMileage = {(this.state.airMileage).toString()}</header1>
                    <header1>nonveg = {(this.state.nonveg).toString()}</header1>
                    <header1>veg = {(this.state.veg).toString()}</header1> 
                */}

                {/* <header> Your total carbon footprint is: {parseInt(this.state.carbonDaily).toString()} lbs of CO2 per day, {parseInt(this.state.carbonMonthly).toString()} lbs of CO2 per month, and {parseInt(this.state.carbonYearly).toString()} lbs of CO2 per year.</header> */}
            </div>
        )
        return (this.state.submitted ? footprint : form);
    }
}
export default VehicleForm;