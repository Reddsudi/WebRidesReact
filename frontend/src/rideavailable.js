    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    

    export default function RideAvailable(){
        
        const [ridepost, setRidepost] = useState({
            PhoneNo: '',
            strength: '',
            from: '',
            to: '',
            time: '',
            date: ''
        });

        const[desrideav,setDesrideav]=useState(
            {desfromplace:'',
            destoplace:'',
            destime:'',
            desdate:''}
        );
        const[errors,setErrors] = useState({});
        const[deserrors,setDeserrors] = useState({});
        const[desrideavdata,setDesrideavdata]=useState([]);
        
        
        const [needridedata, setNeedridedata] = useState([]);
        useEffect(() => {
            const fetchdata = async () => {
                try {
                    const response = await axios.get("http://localhost:3001/needridedata");
                    setNeedridedata(response.data.result);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchdata();
        }, []);

        const handledesinput = async (event)=>{
            setDesrideav(prev=>({...prev,[event.target.name]: event.target.value}));
           
        }

        const handledesrideav = async (event) => {
            event.preventDefault();
            
            // Check for validation errors and display appropriate message
            if (desrideav.destime!=="" && desrideav.date!=="") {
                // If both desrideav.destime and desrideav.date have values, alert "if"
                const response = await axios.post("http://localhost:3001/desrideav", desrideav)
                 setDesrideavdata(response.data)
                 
            } else {
                // If either desrideav.destime or desrideav.date is empty or undefined, alert "else"
                if(desrideav.destime!==""){
                    setDeserrors({ message: "Please enter the date "});
                }
                else{
                    setDeserrors({ message: "Please enter the time " });
                }
            }
          };

          const handleinput = (event) => {
            setRidepost(prev => ({ ...prev, [event.target.name]: event.target.value }));
        };
    
        const handlerideav = async (event) => {
            event.preventDefault();
    
            
            if (ridepost.time!=="" && ridepost.date!=="") {
                
                
                try {
                    axios.post("http://localhost:3001/rideavailable", ridepost);
                    alert("Posted Successfully, Go back and open 'I need a ride' page to check the ride you have posted")
                   
                } catch (error) {
                    console.error("Error sending post request", error);
                    
                }
             
           
        }

        else{
            if(ridepost.time!==""){
                setErrors({ message: "Please enter the date of the available ride" });
            }
            else{
                setErrors({ message: "Please enter the time of your ride" });
            }
        }
        };

        

        return (
            <div className="container">
                <h1 className="Post">Post a Ride</h1>
                <div className='Border'>
                    <form className="Post" onSubmit={handlerideav}>
                        <div className="mb-3">
                            <label htmlFor="PhoneNo" className="form-label">Phone Number</label>
                            <input id="PhoneNo" placeholder="Enter your phone number" type="tel" onChange={handleinput} name="PhoneNo" className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="strength" className="form-label">Number of People</label>
                            <input id="strength" placeholder="Number of people" name="strength" onChange={handleinput} className="form-control" />
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
                        <div className="mb-3">
                            <label htmlFor="date" className="form-label">Date</label>
                            <input id="date" placeholder="date" onChange={handleinput} type="date" name="date" className="form-control" />
                            
                        </div>
                        
                        <div><button type="submit" className="btn btn-primary">POST</button></div>
                        
                    </form>
                    {errors && errors.message && <span className="text-danger">{errors.message}</span>}
                </div>
                <div className='Box mt-3'>
                    <h1>Hot Rides 🔥</h1>
                    <ul className="list-group">
                        {needridedata.map((ride, index) => (
                            <li className='list-group-item' key={index}>
                                Need Ride for {ride.strength} people from {ride['From place']} to {ride['To place']} at {ride.Time} on {ride['Date'] && ride['Date'].toString().substring(0, 10)}. Contact at {ride.PhoneNo} 
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='Box mt-3' style={{ padding: '24px' }}>
                    <form onSubmit={handledesrideav}>
                    <h2>Search for a desired ride</h2>
                    <p className="mb-0">Display rides needed from <input className="form-control" onChange={handledesinput} id="desfromplace" name="desfromplace" placeholder="From area"/>
                    to
                    <input id="destoplace" name="destoplace" onChange={handledesinput}  className="form-control" placeholder="To area"/>
                    at <input id="destime" name="destime" onChange={handledesinput} type="time"  
                    className="form-control" placeholder="Time"/> on <input id="desdate" name="desdate" onChange={handledesinput} type="date"
                    className="form-control" placeholder="Date"/>
                    <button type="submit" className="btn btn-primary">
                        Search</button></p>
                        {deserrors && deserrors.message && <span className="text-danger">{deserrors.message}</span>}
                    </form>
                </div>
                <div className='Box mt-3'>
                    <h1>Rides per your requirement</h1>
                    <ul className="list-group">
                        {desrideavdata.map((ride, index) => (
                            <li className='list-group-item' key={index}>
                                {/* Display details of searched rides */}
                                Need Ride for {ride.strength} people from {ride['From place']} to {ride['To place']} at {ride.Time} on {ride['Date'] && ride['Date'].toString().substring(0, 10)}. Contact at {ride.PhoneNo} 
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        
        );
        };