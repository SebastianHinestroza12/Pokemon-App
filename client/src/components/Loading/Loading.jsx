import React from "react";
import "./Loading.css";


const Loading = () => {
  return (
    <div className="lds-grid">
      <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
    </div>
  )
};


export { Loading };