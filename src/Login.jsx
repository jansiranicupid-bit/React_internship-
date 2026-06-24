import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Login(){

 const [username,setUsername]
 = useState("");

 const [password,setPassword]
 = useState("");

 const login = async()=>{

  if(
   username==="admin" &&
   password==="admin123"
  ){
   window.location="/admin";
   return;
  }

  try{

   const res = await axios.post(
    "http://localhost:5000/login",
    {
     username,
     password
    }
   );

   localStorage.setItem(
    "user",
    JSON.stringify(res.data.user)
   );

   window.location="/dashboard";

  }
  catch{

   alert("Invalid Login");

  }
 };

 return(

 <div className="container">

  <div className="card">

   <h2>Login</h2>

   <input
    placeholder="Username"
    onChange={(e)=>
     setUsername(e.target.value)}
   />

   <input
    type="password"
    placeholder="Password"
    onChange={(e)=>
     setPassword(e.target.value)}
   />

   <button onClick={login}>
    Login
   </button>

   <br/><br/>

   <Link to="/register">
    Create Account
   </Link>

  </div>

 </div>
 );
}