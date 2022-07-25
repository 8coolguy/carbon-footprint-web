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
            .then((result) => {
                /*
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
                */
            }).catch((error) => {
                // Handle Errors here.
                console.log("Signup", error);
                // ...
            });
    }
    const register = async (event) =>{
        event.preventDefault();
        if(password === verify){
            await createUserWithEmailAndPassword(auth, email, password)
                .then((res) =>{
                    console.log("Signup", res);
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