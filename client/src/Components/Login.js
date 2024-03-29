//import styles
import React, {useState, useEffect} from 'react';
import {signInWithPopup, signInWithEmailAndPassword} from 'firebase/auth';
import {auth,provider} from '../firebase-auth';
import { useNavigate } from 'react-router-dom';
import {Link} from "react-router-dom";
import {FormContainer} from '../Styles/Form.Style';

const Login=({isAuth,setIsAuth})=> {
  const navigate = useNavigate("")
  const [email, setEmail] = useState("");
  const [password,setPassword]= useState("");

  useEffect(() => {
    if(isAuth==="true" || isAuth===true){
      navigate("/home");
    }
  }, [isAuth,navigate])
  
  
  const googleLogin = async () =>{
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    await signInWithPopup(auth, provider)
        .then(async (result) => {
          console.log(result);
          const uid =result.user.uid;
          await createSessCookie(result);
          let headers =new Headers();
          headers.append("Content-Type", "application/json");

          
            var requestOptions = {
              method: 'POST',
              headers: headers,
              redirect: 'follow'
            };
            await fetch("/api/users/createUser", requestOptions)
              .then(response => response.text())
              .then(result =>{
                console.log(result)
                localStorage.setItem("isAuth", true);
                setIsAuth(true);
                navigate("/home");
              })
              .catch(error => console.log('error', error));
            
        }).catch((error) => {
            // Handle Errors here.
            alert(error)
            // ...
        });
  }
  const createSessCookie= async(result)=>{
    await result.user.getIdToken(true)
            .then(async (token)=>{
              let new_headers=new Headers();
              new_headers.append("x-access-token",token)
              var options = {
                method: 'GET',
                headers: new_headers,
                redirect: 'follow'
              };
              await fetch("/api/users/login", options)
              .then(response => response.json())
              .then(result =>console.log(result));

            })
            .catch((err)=>console.log(err))
  }
  
  const login = async (event)=>{
    event.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (res)=>{
        console.log("Logged In");
        const uid =res.user.uid;
        await createSessCookie(res);


        let headers =new Headers();
        headers.append("Content-Type", "application/json");

        var requestOptions = {
          method: 'POST',
          headers: headers,
          redirect: 'follow'
        };
        await fetch("/api/users/createUser", requestOptions)
          .then(response => response.text())
          .then(result =>{
            console.log(result);
            localStorage.setItem("isAuth", true);
            setIsAuth(true);
            navigate("/home");
          })
          .catch(error => console.log('error', error));
        
      })
      .catch((err)=>alert(err));
  }
  return (
    <div className="Home">
    <FormContainer>
      
      <form onSubmit={login}>
        
        <label>Email</label>
        <input value={email} onChange={(event) =>{setEmail(event.target.value);}}></input>
        <label>Password</label>
        <input value={password} type="password" onChange={(event) =>{setPassword(event.target.value);}}></input>
        <button type="submit">Login</button>

      </form>
      <button type="button" className="login-with-google-btn"  onClick={googleLogin}>Login with Google</button>
      <Link to="/signup">New User?</Link>
      <Link to="/frogot">Frogot Password</Link>
      <Link to="/">Landing</Link>
    </FormContainer>
    </div>
  )
}

export default Login