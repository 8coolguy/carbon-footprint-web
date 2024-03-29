import React,{useState,useEffect} from 'react';
import {GoogleAuthProvider,signInWithPopup,createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase-auth';
import {useNavigate} from 'react-router-dom';
import {FormContainer,GoogleButton} from '../Styles/Form.Style';
import {Link} from "react-router-dom";



const Signup =({isAuth,setIsAuth})=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [verify,setVerify]=useState("");
    const navigate =useNavigate("");

    useEffect(() => {
        if(isAuth==="true" || isAuth===true){
            navigate("/home");
          }
    }, [isAuth])
    
    const googleSignUp =async () =>{
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        await signInWithPopup(auth, provider)
            .then(async (result) => {
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
                    .then(result => {
                        console.log(result)
                        localStorage.setItem("isAuth", true);
                        setIsAuth(true);
                        navigate("/home");
                    })
                    .catch(error => alert(error));
                

            }).catch((error) => {
                // Handle Errors here.
                console.log("Signup", error);
                alert(error)
                // ...
            });
    }
    const register =async (event) =>{
        event.preventDefault();
        if(password === verify){
            await createUserWithEmailAndPassword(auth, email, password)
                .then(async(res) =>{
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
                         .then(result => {
                            console.log(result)
                            localStorage.setItem("isAuth", true);
                            setIsAuth(true);
                            navigate("/home");
                         })
                         .catch(error => console.log('error', error));
                    
                    
                })
                .catch((err)=>{
                    console.error("Signup Register", err);
                    alert(err);
                })
        }else{
            alert("Password must match.")
        }


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


    return(
        <div className="Home">
        <FormContainer>
            <form onSubmit={register}>
                
                <label>Email</label>
                <input value={email} onChange={(event) =>setEmail(event.target.value)}></input>
                <label>Password</label>
                <input value={password} type="password" onChange={(event) =>setPassword(event.target.value)}></input>
                <label>Retype Password</label>
                <input value={verify} type="password" onChange={(event) =>setVerify(event.target.value)}></input>
                <button type="submit">Signup</button>
            </form>
            <button onClick={googleSignUp} type="button" className="login-with-google-btn" >Sign in with Google</button>
            <Link to="/login">Already have an account?</Link>
        </FormContainer>
        </div>
    )

}
export default Signup;