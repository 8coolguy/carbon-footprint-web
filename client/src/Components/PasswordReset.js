import React, {useState} from 'react';
import {sendPasswordResetEmail} from 'firebase/auth';
import {auth,provider} from '../firebase-auth';
import {useNavigate} from 'react-router-dom';
import {Link} from "react-router-dom";
import {FormContainer} from '../Styles/Form.Style';



const PasswordReset =()=>{
    const [email,setEmail]=useState("");



    const frogotPassword =(event)=>{
        event.preventDefault();
        sendPasswordResetEmail(auth,email)
            .then(()=>console.log("Email Snet"))
            .catch((err)=>alert(err))

    }


    return (
        <FormContainer>
            <form onSubmit={frogotPassword}>
                <label>Email</label>
                <input value={email} onChange={(event) =>{setEmail(event.target.value);}}></input>
                <button type="submit">Frogot Password</button>
            </form>
            <Link to="/login">Login</Link>
        </FormContainer>


    )

}
export default PasswordReset;