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
               const uid =result.user.uid;

               let headers =new Headers();
               headers.append("Content-Type", "application/json");

               var raw = JSON.stringify({
                "uid":uid,
                });
                var requestOptions = {
                    method: 'POST',
                    headers: headers,
                    body: raw,
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
                    const uid =res.user.uid;
                    let headers =new Headers();
                    headers.append("Content-Type", "application/json");
     
                    var raw = JSON.stringify({
                     "uid":uid,
                     });
                     var requestOptions = {
                         method: 'POST',
                         headers: headers,
                         body: raw,
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


    return(
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
    )

}
export default Signup;