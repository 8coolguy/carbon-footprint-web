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
    
    constructor(props){
        super(props);
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
                },()=>this.apiCall());
            }
        })
    }
    apiCall = async () => {
        //calls totaler to make some changes
        if(this.state.user){
            let res = await fetch(`/api/users/totaler?uid=${this.state.user.uid}&span=y`);
            res.json().then((data) =>{
                this.setState({total:data})
                //setTotal(data);
            });
        }
    };
    render(){
        return(
            <Row className="justify-content-md-center">
            <Col md={4}>
                {this.state.user.photoURL?<img src={this.state.user.photoURL} referrerpolicy="no-referrer" alt="" width="120" height="120" class="rounded-circle me-2"></img>:<img src="https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png" referrerpolicy="no-referrer" alt="" width="120" height="120" class="rounded-circle me-2"></img>}
                {this.state.user.displayName?<h3>{this.state.user.displayName}</h3>:<h3>{this.state.user.email}</h3>}
            </Col>
            <Col md={8}>
                <h1>Profile</h1>
                <p>Edit entries:</p>
                <CalendarView setDate={this.props.setDate} total={this.state.total}/>
            </Col>
            </Row>

        )

    }


}
export default Profile;