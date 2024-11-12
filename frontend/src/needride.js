import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Needride(){
  
  
  const[needride,setNeedride]= useState({
    PhoneNo: '',
    strength:'',
    from:'',
    to:'',
    time:'',
    date:''
    
})

  //details of the desired ride
  const[desneedride,setDesneedride]= useState({
    desfromplace:'',
    destoplace:'',
    destime:'',
    desdate:''
  })
  const[errors,setErrors] = useState({});
  const[deserrors,setDeserrors] = useState({});
  const [ridedata,setRidedata] = useState([]);
  const[desneedridedata,setDesneedridedata]=useState([]);

    useEffect(()=>{
        const fetchdata = async ()=>{
        
        try{    
            const response=await axios.get("http://localhost:3001/rideavdata")
                  
            
            
            setRidedata(response.data.result)
        }
        catch(error){
            console.error("Error fetching data:", error)
        }
        }
        fetchdata();
    },[]);


    const handleinput = (event) =>{
  
      setNeedride(prev=>({...prev, [event.target.name]: event.target.value }))
      console.log(needride)
    }  

  
  //To validate and post the ride details to the database

  const handleneedride = (event)=>{
    event.preventDefault();
    console.log("after submit");
    console.log(needride)
    
    
    
  if(needride.time!=="" && needride.date!=="")  
     {try{
     axios.post("http://localhost:3001/needride", needride)
     alert("Posted Successfully, Go back and open 'ride available' page to check the ride you have posted")
     
     
 }
   catch(error){
  console.error("Error sending post request",error);
}}
else{
  if(needride.time!==""){
    setErrors({ message: "Please enter the date of the available ride" });
}
else{
    setErrors({ message: "Please enter the time of your ride" });
}
} 


}


//to enter the input details into the const needride dictionary



//to enter the input details into the const desired needride dictionary
const handledesinput = async (event)=>{
  setDesneedride(prev => ({ ...prev, [event.target.name]: event.target.value }));
}

//to enter the input details into the const needride dictionary

const handledesneedride = async (event) =>{
  event.preventDefault();
  if (desneedride.destime !== "" && desneedride.desdate !== "") {
    // If both desrideav.destime and desrideav.date have values, alert "if"
    const response = await axios.post("http://localhost:3001/desneedride", desneedride)
    
    setDesneedridedata(response.data)
} else {
    // If either desrideav.destime or desrideav.date is empty or undefined, alert "else"
    
    if(desneedride.destime!==""){
      setDeserrors({ message: "Please enter the date "});
      
  }
  else{
      setDeserrors({ message: "Please enter the time " });
      
  }
}
};

// Use useEffect to perform actions after deserrors state has been updated

  return (
    <div className="container">
  <h1 className="Post">Ask for a ride</h1>
  <div className='Border'>
    <form className="Post" onSubmit={handleneedride}>
      <div className="mb-3">
        <label htmlFor="PhoneNo" className="form-label">Phone Number</label>
        <input id="PhoneNo" placeholder='Enter your phone number' type="tel" onChange={handleinput} name='PhoneNo' className="form-control" />
        
      </div>
      <div className="mb-3">
        <label htmlFor="strength" className="form-label">Number of People</label>
        <input id="strength" placeholder="Number of people" name='strength' onChange={handleinput} className="form-control" />
       
      </div>
      <div className="mb-3">
        <label htmlFor="from" className="form-label">From Address</label>
        <input id="from" placeholder="From address" onChange={handleinput} name="from" className="form-control" />
        
      </div>
      <div className="mb-3">
        <label htmlFor="to" className="form-label">To Address</label>
        <input id="to" placeholder="To address" onChange={handleinput} name="to" className="form-control" />
        
      </div>
      <div className="mb-3">
        <label htmlFor="time" className="form-label">Time</label>
        <input id="time" placeholder="Time" onChange={handleinput} type="time" name="time" className="form-control" />
        
      </div>  

      <div>
      <label htmlFor="date" className="form-label">Date</label>
        <input id="date" placeholder="date" onChange={handleinput} type="date" name="date" className="form-control"  />
        
      </div>
      <div><button type="submit" className="btn btn-primary">POST</button></div>
      
    </form>
    {errors && errors.message && <span className="text-danger">{errors.message}</span>}
  </div>
  <div className='Box mt-3'>
    {/*Displaying the rides that are required */}
    <h1>Hot Rides 🔥</h1>
    <ul className="list-group">
      {ridedata.map((ride, index) => (
        <li className='list-group-item' key={ride._id}>
          Ride available for {ride.strength} people from {ride['From place']} to {ride['To place']} at {ride.Time} on {ride['Date'] && ride['Date'].toString().substring(0, 10)}. Contact at {ride.PhoneNo}
        </li>
      ))}
    </ul>
  </div>
  <div className='Box mt-3'>

    {/*Form for desired ride search*/}
    <form onSubmit={handledesneedride}>
                <h2>Search for a desired ride</h2>
                <p className="mb-0">Display rides available from <input className="form-control" onChange={handledesinput} id="desfromplace" name="desfromplace" placeholder="From area"/>
                 to
                 <input id="destoplace" name="destoplace" onChange={handledesinput}  className="form-control" placeholder="To area"/>
                 at <input id="destime" name="destime" onChange={handledesinput} type="time"  
                  className="form-control" placeholder="Time"/> on <input id="desdate" name="desdate" onChange={handledesinput} type="date"
                   className="form-control" placeholder="Date"/>
                   <button type="submit" className="btn btn-primary">
                    Search</button></p>
                    {deserrors &&  <span className="text-danger">{deserrors.message}</span>}
                  </form>
            </div>
            <div className='Box mt-3'>
                    <h1>Rides per your requirement</h1>
                    <ul className="list-group">
                        {desneedridedata.map((ride, index) => (
                            <li className='list-group-item' key={index}>
                                {/* Display details of searched rides */}
                                Ride available for {ride.strength} people from {ride['From place']} to {ride['To place']} at {ride.Time} on {ride['Date'] && ride['Date'].toString().substring(0, 10)}. Contact at {ride.PhoneNo} 
                            </li>
                        ))}
                    </ul>
                </div>
</div>
  );
};
 
