import React from "react";
import { Link } from 'react-router-dom';
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="container">
      <Link to='/home'>
        <button className="btn">INGRESAR</button>
      </Link>
    </div>
  )
};


export { LandingPage };