export default function Sidebar({ logout }) {

 return (

 <div
  style={{
   width:"220px",
   background:"#1e293b",
   minHeight:"100vh",
   padding:"20px"
  }}
 >

 <h2>Expense Tracker</h2>

 <hr />

 <br />

 <button onClick={logout}>
  Logout
 </button>

 </div>

 );
}