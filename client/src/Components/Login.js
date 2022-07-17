//import styles
import React, {useState, useEffect} from 'react';
import {GoogleAuthProvider,signInWithPopup, signOut, onAuthStateChanged, signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase-auth';

const Login=()=> {
  const [user,setUser] = useState({});
  const [email, setEmail] = useState("");
  const [password,setPassword]= useState("");
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) =>{
      setUser(currentUser);
    })
  }, [user]);
  
  
  const googleLogin = async () =>{
    const provider = new GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    await signInWithPopup(auth, provider)
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
            alert(error)
            // ...
        });
  }
  const logout =  async () => {
     await signOut(auth);
  }
  const login = async (event)=>{
    event.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((res)=>console.log("Signup",res))
      .catch((err)=>alert(err));
  }
  return (
    <div>
      {user?<h1>Hello {user.displayName}<button onClick={logout}>Signout</button></h1>:<></>}
      <button onClick={googleLogin}>Login with Google</button>
      
      <form onSubmit={login}>
        <label>Email</label>
        <input value={email} onChange={(event) =>{setEmail(event.target.value);}}></input>
        <label>Password</label>
        <input value={password} type="password" onChange={(event) =>{setPassword(event.target.value);}}></input>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login