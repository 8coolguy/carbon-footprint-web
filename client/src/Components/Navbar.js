import React,{useState} from 'react';
import {Link, useNavigate,} from 'react-router-dom';
import {signOut} from 'firebase/auth';
import {auth} from '../firebase-auth';

const Navbar =({ isAuth,setIsAuth })=>{
    console.log(typeof isAuth);
    console.log(isAuth);
    //const [name,setName] = useState("");
    const navigate =useNavigate();
    const logout =  async () => {
        await signOut(auth).then(()=>{
            setIsAuth(false);
            localStorage.setItem("isAuth",false);
            navigate("/login")
            
        });
    }
    const logUser =()=>{
        console.log(auth.currentUser.displayName);
        //setName(auth.currentUser.displayName);
        console.log(isAuth);
        console.log(auth.currentUser)
    }
    //{isAuth==="true" || isAuth===true ?<Link to='/home'>Home</Link><Link to='/login'>Login</Link>}
    return (
        <nav>  
            <div>
                
            </div>
            <div>
                {isAuth==="true" || isAuth===true?<div><button onClick={logout}>Logout</button><button onClick={logUser}>User Info</button></div>:<Link to='/signup'>Signup</Link>}
                
            </div>

        </nav>
    )

}
export default Navbar;