//import styles
import React, {useState, useEffect} from 'react';
import {signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import {auth,app,provider} from '../firebase-auth';
import { useNavigate } from 'react-router-dom';
import {FormContainer} from '../Styles/Form.Style';

const Login=({isAuth,setIsAuth})=> {
  const navigate = useNavigate("")
  const [email, setEmail] = useState("");
  const [password,setPassword]= useState("");

  useEffect(() => {
    if(isAuth==="true" || isAuth===true){
      navigate("/home");
    }
  }, [])
  
  
  const googleLogin = async () =>{
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    await signInWithPopup(auth, provider)
        .then((result) => {
          console.log("Logged In");
          localStorage.setItem("isAuth", true);
          setIsAuth(true);
          navigate("/home");
        }).catch((error) => {
            // Handle Errors here.
            alert(error)
            // ...
        });
  }
  
  const login = async (event)=>{
    event.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((res)=>{
        console.log("Logged In");
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/home");
      })
      .catch((err)=>alert(err));
  }
  return (
    <FormContainer>
      
      <form onSubmit={login}>
        <button class ="submit" onClick={googleLogin}>Login with Google</button>
        <label>Email</label>
        <input value={email} onChange={(event) =>{setEmail(event.target.value);}}></input>
        <label>Password</label>
        <input value={password} type="password" onChange={(event) =>{setPassword(event.target.value);}}></input>
        <button type="submit">Login</button>

      </form>
    </FormContainer>
  )
}

export default Login