import { Link } from "react-router-dom"
import SignupValidation from "./signupvalidation"
import React, {  useState } from "react";
import axios from "axios";
import backgroundImage from './icon.jpg';



export default function Signup(){
  const[values, setValues] = useState({
    Username : "",
    email : "",
    password:""

  })
  const[errors,setErrors] = useState({

  })

  const handleInput = event => {
    setValues (prev=>({...prev, [event.target.name]: [event.target.value] }))
    
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(values);
  
    // Use the state updater function form to get the latest state
    setErrors((prevErrors) => {
      const validationErrors = SignupValidation(values);
      return { ...prevErrors, ...validationErrors };
    });
  
    // Check for errors in the latest state
    if (!errors.Username && !errors.email && !errors.password) {
      try { 
        const response = await axios.post("http://localhost:3001/signup", values);
        console.log("Done", response.data);
        console.log("submitting");
      } catch (err) {
        console.error(err);
      }
    }
  };
  return(  
    
    <div className="container">
      <form className="SignupForm" onSubmit={handleSubmit}>
        <img className="Image" alt="Fido Dido" src={backgroundImage} style={{ position: 'absolute', top: '-20px' }}></img>
        <h1 className="text">RIDE OR DIE!</h1>
        <div className="form-group" style={{ padding: '10px', borderRadius: '5px' }}>
          <input type="text" className="form-control" id="username" placeholder="Username" name="Username"
            onChange={handleInput}></input>
          {errors.Username && <span className="text-danger">{errors.Username}</span>}
        </div>
        <div className="form-group" style={{ padding: '10px', borderRadius: '5px' }}>
          <input type="email" className="form-control" id="Email" placeholder="Email ID" name="email"
            onChange={handleInput}></input>
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </div>
        <div className="form-group" style={{ padding: '10px', borderRadius: '5px' }}>
          <input type="password" className="form-control" id="password" placeholder="Password" name="password"
            onChange={handleInput}></input>
          {errors.password && <span className="text-danger">{errors.password}</span>}
        </div>
        <div className="form-group" style={{ padding: '10px', borderRadius: '5px' }}>
          <button type="submit" className="btn btn-primary">Signup</button>
        </div>
        <p><Link to="/">Log in</Link></p>
      </form>
    </div>
  )





}