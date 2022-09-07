import React from "react";
import { Link } from 'react-router-dom';
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="container-landing-page">
      <Link to='/home'>
        <button className="btn-landing">INGRESAR</button>
      </Link>
    </div>
  )
};


export { LandingPage };