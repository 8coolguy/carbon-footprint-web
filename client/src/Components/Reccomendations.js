import React from 'react';

const Reccomender =({soec,total})=>{
    const ifSolar = " Try Solar" ;
    const red ="Reduce Energy Usage. Your energy usage is above the state's average.";
    const ele ="Look into electric cars";
    const plane="Reduce Flying or look for alternatives.";
    const meat = "Reduce non veg consumption.";
    
    return(<div>
        <h1> What can you do to reduce your carbon emissions?</h1>
        <ul style ={{listStyle: "none"}}>
            {total.energy > total.transportation && total.energy> total.food ?<h4> Your largest category is Energy</h4>:<></>}
            {total.transportation > total.energy && total.transportation > total.food ?<h4> Your largest category is Transportation</h4>:<></>}
            {total.food > total.energy && total.food > total.transportation ?<h4> Your largest category is Food</h4>:<></>}
            {total.food > total.energy && total.food > total.transportation ?<p>{meat}</p>:<></>}
            {total.transportation > total.energy && total.transportation > total.food ?<li>{plane}</li>:<></>}
            {soec.solar?<li>{red}</li>:<li>{ifSolar}</li>}
            {soec.electricCar?<></>:<li>{ele+" or Look into Public Transport"}</li>}
            
        </ul>






    </div>)




}
export default Reccomender;