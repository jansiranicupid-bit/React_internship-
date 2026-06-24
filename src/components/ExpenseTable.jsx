import axios from "axios";

export default function ExpenseTable({
 data,
 refresh
}){

 const deleteExpense =
 async(id)=>{

  await axios.delete(
   `http://localhost:5000/expense/${id}`
  );

  refresh();
 };

 return(

 <div className="card">

 <h3>Transactions</h3>

 <table>

 <thead>

 <tr>

 <th>Amount</th>
 <th>Category</th>
 <th>Type</th>
 <th>Delete</th>

 </tr>

 </thead>

 <tbody>

 {
 data.map(item=>

 <tr key={item.id}>

 <td>₹{item.amount}</td>

 <td>
  {item.category}
 </td>

 <td>
  {item.type}
 </td>

 <td>

 <button
  onClick={()=>
  deleteExpense(item.id)}
 >
  X
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