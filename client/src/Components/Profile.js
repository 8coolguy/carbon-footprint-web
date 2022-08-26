import React from "react";
import {auth} from '../firebase-auth';

import Calendar from 'react-calendar';
import CalendarView from "./CalendarView";
import 'react-calendar/dist/Calendar.css';

//bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";   
import { Pencil } from 'react-bootstrap-icons';

class Profile extends React.Component{
    
    constructor(){
        super();
        this.state={
            user:{},
            calendar_data:[]
        }
    }
    componentDidMount(){
        auth.onAuthStateChanged((currentUser)=>{
            if(currentUser){
                this.setState({
                    user:currentUser||{}
                },);
            }
        })
    }
    render(){
        return(
            <Row className="justify-content-md-center">
            <Col  md={4}>
                {this.state.user.photoURL?<img src={this.state.user.photoURL} referrerpolicy="no-referrer" alt="" width="120" height="120" class="rounded-circle me-2"></img>:<img src="https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png" referrerpolicy="no-referrer" alt="" width="120" height="120" class="rounded-circle me-2"></img>}
                {this.state.user.displayName?<h3>{this.state.user.displayName}</h3>:<h3>{this.state.user.email}</h3>}
            </Col>
            <Col md={8}>
                <h1>Profile</h1>
                <p>Edit entries:</p>
                <CalendarView user={this.state.user}/>
            </Col>
            </Row>

        )

    }


}
export default Profile;