import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import footpic from './footpriint.ico'

class VehicleForm extends React.Component {
    constructor() {
        super();
        
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {electric: '',
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

    calculateCarbon() {
        const totalDailyCarbon = (5 * this.state.electric / 30) + (10 * this.state.gas / 30) + (0.8 * this.state.carMileage) + (0.43 * this.state.airMileage / 365) + (1.5 * this.state.nonveg / 7) + (0.3 * this.state.veg / 7);
        const totalMonthlyCarbon = (5 * this.state.electric) + (10 * this.state.gas) + (0.8 * this.state.carMileage * 30) + (0.43 * this.state.airMileage / 52) + (1.5 * this.state.nonveg * 4) + (0.3 * this.state.veg * 4);
        const totalYearlyCarbon = (5 * this.state.electric * 12) + (10 * this.state.gas * 12) + (0.8 * this.state.carMileage * 350) + (0.43 * this.state.airMileage) + (1.5 * this.state.nonveg * 52) + (0.3 * this.state.veg * 52);
        this.setState({
            carbonDaily: totalDailyCarbon,
            carbonMonthly: totalMonthlyCarbon,
            carbonYearly: totalYearlyCarbon
        });
    }

    render(){
        const form = (
            <div>
                
                <Form>
                    <Form.Group className="mb-3" controlId="form">
                    <Form.Label>Electricity Bill</Form.Label>
                    <Form.Control type="text" name="electric" value={this.state.electric} placeholder="Enter this month's electricity bill payment in dollars" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="form">
                    <Form.Label>Gas Bill</Form.Label>
                    <Form.Control type="number" name="gas" value={this.state.gas} placeholder="Enter this month's gas bill payment in dollars" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="form">
                    <Form.Label>Number of Miles driven per day by non electric vehicles</Form.Label>
                    <Form.Control type="number" name="carMileage" value={this.state.carMileage} placeholder="Enter number of miles driven per day" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="form">
                    <Form.Label>Air Travel: Miles traveled</Form.Label>
                    <Form.Control type="number" name="airMileage" value={this.state.airMileage} placeholder="Enter number of miles traveled this year by airplane" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="form">
                    <Form.Label>Non-veg servings per week</Form.Label>
                    <Form.Control type="number" name="nonveg" value={this.state.nonveg} placeholder="Enter the number of non-veg servings you consume per week" onChange={this.handleChange}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="form">
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

                {/* <header1>electric = {(this.state.electric).toString()}</header1>
                <header1>gas = {(this.state.gas).toString()}</header1>
                <header1>carMileage = {(this.state.carMileage).toString()}</header1>
                <header1>airMileage = {(this.state.airMileage).toString()}</header1>
                <header1>nonveg = {(this.state.nonveg).toString()}</header1>
                <header1>veg = {(this.state.veg).toString()}</header1> */}

                {/* <header> Your total carbon footprint is: {parseInt(this.state.carbonDaily).toString()} lbs of CO2 per day, {parseInt(this.state.carbonMonthly).toString()} lbs of CO2 per month, and {parseInt(this.state.carbonYearly).toString()} lbs of CO2 per year.</header> */}
            </div>
        )
        return (this.state.submitted ? footprint : form);
    }
}
export default VehicleForm;