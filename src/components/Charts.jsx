import {
 Pie
}
from "react-chartjs-2";

import {
 Chart as ChartJS,
 ArcElement,
 Tooltip,
 Legend
}
from "chart.js";

ChartJS.register(
 ArcElement,
 Tooltip,
 Legend
);

export default function Charts({
 analytics
}){

 const labels =
 Object.keys(
 analytics.categories
 );

 const values =
 Object.values(
 analytics.categories
 );

 const data = {

 labels,

 datasets:[
 {
  data:values
 }
 ]

 };

 return(

 <div
 className="card"
 >

 <h3>
 Category Analysis
 </h3>

 <Pie data={data}/>

 </div>

 );
}