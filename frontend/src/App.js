import Login from "./login";
import Signup from "./signup";
import {BrowserRouter, Routes, Route} from  "react-router-dom";
import Dialog from "./dialog.js";
import Needride from "./needride.js";
import RideAvailable from "./rideavailable.js";

export default function App(){

  return(

     <div>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/dialog" element={<Dialog/>}/>
          <Route path="/needride" element={<Needride/>}/>
          <Route path="/rideavailable" element={<RideAvailable/>}/>
          
        </Routes>
        </BrowserRouter>
      
     </div>
 )

  }

