import {
 useEffect,
 useState
}
from "react";

import axios from "axios";

import Sidebar
from "./components/Sidebar";

import ExpenseForm
from "./components/ExpenseForm";

import ExpenseTable
from "./components/ExpenseTable";

import AIAdvisor
from "./components/AIAdvisor";

import Charts
from "./components/Charts";

export default function Dashboard(){

 const user =
 JSON.parse(
 localStorage.getItem("user")
 );

 const [expenses,setExpenses]
 = useState([]);

 const [analytics,
 setAnalytics]
 = useState(null);

 const load = async()=>{

 const expenseRes =
 await axios.get(
 `http://localhost:5000/expense/${user.id}`
 );

 const analyticsRes =
 await axios.get(
 `http://localhost:5000/analytics/${user.id}`
 );

 setExpenses(
 expenseRes.data
 );

 setAnalytics(
 analyticsRes.data
 );
 };

 useEffect(()=>{
 load();
 },[]);

 const logout = ()=>{

 localStorage.clear();

 window.location="/";
 };

 if(!analytics)
 return <h1>Loading...</h1>;

 return(

 <div
 style={{
 display:"flex"
 }}
 >

 <Sidebar
 logout={logout}
 />

 <div
 style={{
 flex:1,
 padding:"20px"
 }}
 >

 <h1>
 Welcome {user.username}
 </h1>

 <div className="summary">

 <div className="box">

 <h3>Income</h3>

 <h2>
 ₹{analytics.income}
 </h2>

 </div>

 <div className="box">

 <h3>Expense</h3>

 <h2>
 ₹{analytics.expense}
 </h2>

 </div>

 <div className="box">

 <h3>Balance</h3>

 <h2>
 ₹{analytics.balance}
 </h2>

 </div>

 </div>

 <ExpenseForm
 userId={user.id}
 refresh={load}
 />

 <br />

 <Charts
 analytics={analytics}
 />

 <br />

 <AIAdvisor
 userId={user.id}
 />

 <br />

 <ExpenseTable
 data={expenses}
 refresh={load}
 />

 </div>

 </div>

 );
}