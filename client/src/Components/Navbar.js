import React,{useState} from 'react';
import {Link, useNavigate,} from 'react-router-dom';
import {signOut} from 'firebase/auth';
import {auth} from '../firebase-auth';
import{NavContainer} from '../Styles/Nav.Style';

const Navbar =({ isAuth,setIsAuth })=>{
    const navigate =useNavigate();
    const logout =  async () => {
        await signOut(auth).then(()=>{
            setIsAuth(false);
            localStorage.setItem("isAuth",false);
            navigate("/login")
            
        });
    }
    const updateForm=()=>{
        navigate('/update')
    }
    //{isAuth==="true" || isAuth===true ?<Link to='/home'>Home</Link><Link to='/login'>Login</Link>}
    return (
        <NavContainer>  
            <div>
                
            </div>
            <div>
                {isAuth==="true" || isAuth===true?<div><button onClick={logout}>Logout</button><button onClick={updateForm}>Update</button></div>:<Link to='/signup'>Signup</Link>}
            </div>

        </NavContainer>
    )

}
export default Navbar;