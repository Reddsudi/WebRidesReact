import axios from "axios";
import './App.css';
import LoginValidation from './LoginValidation';
import { Link, useNavigate  } from 'react-router-dom';
import React, {  useState } from "react";
import backgroundImage from './icon.jpg';


export default function Login() {

     const[values, setValues] = useState({
        email: '',
        password: '',
     });
    
     const navigate = useNavigate();
      const [errors, setErrors] = useState({})
     const handleSubmit = async (event)=>{
        event.preventDefault();
        setErrors(LoginValidation(values));
    // Check for errors in the latest state
    if (!errors.email && !errors.password) {
      try {
        const response = await axios.post("http://localhost:3001/login", values)
        //.then(response => {
        //  alert(response.data.message)
        //})
        //alert(response.data.message);
        
        console.log("Done",response.data.message);
        console.log("submitting");
        console.log(values.password);
       // let len=response.data.message.length
        if(response.data.message==="emptyArray"){
          //let messageFromBackend = "signup cheyira batte";
          
          alert("Please register first");
          console.log("Please register firs");
          

        }
        else{
          let a=String(values.password)
          let z=String(response.data.message)
          if(a===z){
            alert("Succesful login");
            console.log("Succesful login");
            navigate('/dialog');
            
          }
        
          else{
            //let messageFromBackend = "Madda gudu";
            alert("Wrong password or email");
            return("Wrong password or email");
            
           
          }
          
        }
      } catch (err) {
        console.error(err);
      }
      
    }
     }
     const handleInput= (event)=>{
    
       setValues(prev=>({...prev, [event.target.name]: [event.target.value]}))
      
     }
  return (
    <div className="Black">
      <div className="Border container">
        <form className="Form" onSubmit={handleSubmit}>
          <img className='Image' alt="Fido Dido"  src={backgroundImage} style={{position:'absolute', top:'-20px'}} />
          <div className="text-center">
            <h1 className="text">RIDE OR DIE!</h1>
          </div>
          <div className="form-group" style={{ padding: '10px', borderRadius: '5px' }} >
            <input className="form-control" type='email' id="email" placeholder='Email Id' onChange={handleInput} name="email"  />
            {errors.email && <span className="text-danger">{errors.email}</span>}
          </div>
          <div>
          <div className="form-group" style={{ padding: '10px', borderRadius: '5px' }} >
            <input className="form-control" type='password' id="password" placeholder='Password' onChange={handleInput} name="password" />
            {errors.password && <span className="text-danger">{errors.password}</span>}
          </div>
          </div>
          <button className="btn btn-primary"  type="submit">Sign in</button>
          <Link className="btn btn-link" to="/signup">Sign up</Link>
        </form>
      </div>
    </div>
  );

  
}


