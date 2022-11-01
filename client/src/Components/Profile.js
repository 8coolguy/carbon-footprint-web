import React from "react";
import {auth} from '../firebase-auth';

import Editable from "./Editable";

//bootstrap
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";  
import Card from 'react-bootstrap/Card' 
//import { Pencil } from 'react-bootstrap-icons';

class Profile extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            householdSize:"",
            zipcode:"",
            user:{},
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
            let res = await fetch(`/api/users/profile`);
            res.json().then((profile) =>{
                console.log("Profile",profile)
                this.setState({householdSize:profile.householdSize,zipcode:profile.zipcode})
                //setTotal(data);
            });
        }
    };
    updateProfile = async (category)=>{
        console.log("Update Prof",this.state);
        if(this.state.user && ((this.state.householdSize!==undefined && category==="householdSize" && this.state.householdSize.length >= 1) || (this.state.zipcode!== undefined && category==="zipcode" && this.state.zipcode.length >=5))){
            let headers =new Headers();
            headers.append("Content-Type", "application/json");
            let data={};
            data[category]=this.state[category];
            console.log("Data",data)
            var raw = JSON.stringify({
                "data":data
            });
            console.log(this.state.data);
            var requestOptions = {
                method: 'POST',
                headers: headers,
                body: raw,
                redirect: 'follow'
            };
            let res = await fetch(`/api/users/profile`,requestOptions);
            res.json().then((data) =>{
                console.log(data)
                
                //setTotal(data);
            });
        }
    }
    
    render(){
        return(
            <div className="profile">
                
                <Card className="profile-container">
                    {this.state.user.photoURL?<img src={this.state.user.photoURL} referrerPolicy="no-referrer" alt="" width="120" height="120" className="justify-content-md-center rounded-circle me-2"></img>:<img src="https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png" referrerPolicy="no-referrer" alt="" width="120" height="120" className="rounded-circle me-2"></img>}
                    {this.state.user.displayName?<h3>{this.state.user.displayName}</h3>:<h3>{this.state.user.email}</h3>}
                    <p>Household Size:</p>
                        <Editable text={this.state.householdSize} placeholder="Put in your household Size" type="input">
                            <input
                                type="text"
                                name="householdSize"
                                placeholder="Household Size"
                                value={this.state.householdSize}
                                onChange={e => this.setState({householdSize:e.target.value},()=>this.updateProfile(e.target.name))}
                            />  
                        </Editable>
                    
                    <p>Zipcode: </p>
                        <Editable text={this.state.zipcode} placeholder="Put in your zipcode." type="input">
                            <input
                                type="text"
                                name="zipcode"
                                placeholder="Zipcode"
                                value={this.state.zipcode}
                                onChange={e => this.setState({zipcode:e.target.value},()=>this.updateProfile(e.target.name))}
                            />
                        </Editable>
                    

                </Card>
                
            </div>

        )

    }


}
export default Profile;