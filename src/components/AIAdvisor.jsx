import {
 useEffect,
 useState
} from "react";

import axios from "axios";

export default function AIAdvisor({
 userId
}){

 const [msg,setMsg]
 = useState("");

 useEffect(()=>{

 axios.get(
 `http://localhost:5000/ai-suggestion/${userId}`
 )

 .then(res=>
  setMsg(
   res.data.suggestion
  ));

 },[userId]);

 return(

 <div className="card">

 <h3>
  AI Budget Advisor
 </h3>

 <p>{msg}</p>

 </div>

 );
}