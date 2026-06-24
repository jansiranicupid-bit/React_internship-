import {
 useEffect,
 useState
}
from "react";

import axios from "axios";

export default function AdminPanel(){

 const [users,setUsers]
 = useState([]);

 const load = ()=>{

 axios.get(
 "http://localhost:5000/users"
 )

 .then(res=>
 setUsers(res.data));
 };

 useEffect(()=>{
 load();
 },[]);

 const deleteUser =
 async(id)=>{

 if(
 !window.confirm(
 "Delete User?"
 )
 ) return;

 await axios.delete(
 `http://localhost:5000/users/${id}`
 );

 load();
 };

 const logout = ()=>{

 window.location="/";
 };

 return(

 <div
 style={{
 padding:"20px"
 }}
 >

 <h1>
 Admin Dashboard
 </h1>

 <button
 onClick={logout}
 >
 Logout
 </button>

 <br />
 <br />

 <table>

 <thead>

 <tr>

 <th>ID</th>
 <th>Username</th>
 <th>Created</th>
 <th>Delete</th>

 </tr>

 </thead>

 <tbody>

 {
 users.map(user=>

 <tr key={user.id}>

 <td>{user.id}</td>

 <td>
 {user.username}
 </td>

 <td>
 {user.createdAt}
 </td>

 <td>

 <button
 onClick={()=>
 deleteUser(user.id)}
 >
 Delete
 </button>

 </td>

 </tr>

 )
 }

 </tbody>

 </table>

 </div>

 );
}