import React from 'react';
import './App.css';
import { useNavigate  } from 'react-router-dom';
import './index.css';

export default function Dialog(){
    const navigate = useNavigate();
    const navigateneedride = (e) =>{navigate('/needride')};
    const navigaterideavailable = (e) =>{navigate('/rideavailable')};
    return(
<div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
    <div className="border p-4">
        <div className="row mb-3">
            <div className="col-md-12">
                <button className="btn btn-primary btn-lg btn-block" onClick={navigateneedride}>I Need A Ride</button>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12">
                <button className="btn btn-secondary btn-lg btn-block" onClick={navigaterideavailable}>Ride Available (I Have Empty Space(s) In My Ride)</button>
            </div>
        </div>
    </div>
</div>
    );
}