import React,{useState} from 'react';
import {GoogleAuthProvider,signInWithPopup,createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase-auth';
import {FormContainer} from '../Styles/Form.Style';



const Signup =()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [verify,setVerify]=useState("");
    
    const googleSignUp =() =>{
        const provider = new GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
        signInWithPopup(auth, provider)
            .then(async(result) => {
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
                    .then(result => console.log(result))
                    .catch(error => console.log('error', error));


            }).catch((error) => {
                // Handle Errors here.
                console.log("Signup", error);
                // ...
            });
    }
    const register = (event) =>{
        event.preventDefault();
        if(password === verify){
            createUserWithEmailAndPassword(auth, email, password)
                .then((res) =>{
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
                     fetch("/api/users/createUser", requestOptions)
                         .then(response => response.text())
                         .then(result => console.log(result))
                         .catch(error => console.log('error', error));
                })
                .catch((err)=>{
                    console.error("Signup", err);
                    alert(err);
                })
        }else{
            alert("Password must match.")
        }


    }


    return(
        <FormContainer>
            <form onSubmit={register}>
                <button onClick={googleSignUp}>Google Sign in</button>
                <label>Email</label>
                <input value={email} onChange={(event) =>setEmail(event.target.value)}></input>
                <label>Password</label>
                <input value={password} type="password" onChange={(event) =>setPassword(event.target.value)}></input>
                <label>Retype Password</label>
                <input value={verify} type="password" onChange={(event) =>setVerify(event.target.value)}></input>
                <button type="submit">Signup</button>
            </form>
        </FormContainer>
    )

}
export default Signup;