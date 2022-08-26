import React,{useState,useEffect} from 'react';
import {useNavigate,} from 'react-router-dom';
import {signOut} from 'firebase/auth';
import {auth} from '../firebase-auth';
import{NavContainer} from '../Styles/Nav.Style';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';


const DashNavbar =({ isAuth,setIsAuth })=>{
    const navigate =useNavigate();
    const [user,setUser]=useState({});
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
    useEffect(() => {
        auth.onAuthStateChanged((currentUser)=>{
            if(currentUser){
                setUser(currentUser);
                console.log("Nav", currentUser);
            }
        })
    }, [])
    
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
                            </Nav>
                            <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                    {user.photoURL?<img src={user.photoURL} referrerpolicy="no-referrer" alt="" width="32" height="32" class="rounded-circle me-2"></img>:<img src="https://www.nicepng.com/png/detail/73-730154_open-default-profile-picture-png.png" referrerpolicy="no-referrer" alt="" width="32" height="32" class="rounded-circle me-2"></img>}
                                </Dropdown.Toggle>
                            <Dropdown.Menu>
                            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                            <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
                            
                            
                        </Dropdown.Menu>
                        </Dropdown>
                        </Navbar.Collapse>
                        
                        
                </Container>
            </Navbar>
            :<></>}
        </div>
                
    )

}
export default DashNavbar;