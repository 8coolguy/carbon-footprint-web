import React,{useState} from 'react';
import {useNavigate,} from 'react-router-dom';
import {signOut} from 'firebase/auth';
import {auth} from '../firebase-auth';
import{NavContainer} from '../Styles/Nav.Style';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


const DashNavbar =({ isAuth,setIsAuth })=>{
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
        
        <div>
            {isAuth==="true" || isAuth===true?
            <Navbar bg="light"  expand="lg"> 
                <Container>
                    <Navbar.Brand href="/home">CAF</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/home">Home</Nav.Link>
                                <Nav.Link href="/update">Update Footprint</Nav.Link>
                                <Nav.Link onClick={logout}>Logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                </Container>
            </Navbar>
            :<></>}
        </div>
                
    )

}
export default DashNavbar;