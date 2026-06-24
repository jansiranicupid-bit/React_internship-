import { useState } from "react";
import axios from "axios";

export default function ExpenseForm({
 userId,
 refresh
}){

 const [amount,setAmount]
 = useState("");

 const [category,setCategory]
 = useState("");

 const [type,setType]
 = useState("expense");

 const [note,setNote]
 = useState("");

 const addExpense = async()=>{

  if(!amount || !category)
  {
   alert("Fill all fields");
   return;
  }

  await axios.post(
   "http://localhost:5000/expense",
   {
    userId,
    amount,
    category,
    type,
    note
   }
  );

  setAmount("");
  setCategory("");
  setNote("");

  refresh();
 };

 return(

 <div className="card">

  <h3>Add Transaction</h3>

  <input
   value={amount}
   placeholder="Amount"
   onChange={(e)=>
    setAmount(e.target.value)}
  />

  <input
   value={category}
   placeholder="Category"
   onChange={(e)=>
    setCategory(e.target.value)}
  />

  <input
   value={note}
   placeholder="Note"
   onChange={(e)=>
    setNote(e.target.value)}
  />

  <select
   value={type}
   onChange={(e)=>
    setType(e.target.value)}
  >

   <option value="income">
    Income
   </option>

   <option value="expense">
    Expense
   </option>

  </select>

  <button onClick={addExpense}>
   Save
  </button>

 </div>

 );
}