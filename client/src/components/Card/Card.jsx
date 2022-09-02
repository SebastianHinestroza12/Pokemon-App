import React from "react";
import './Card.css';

const Card = ({ name, img, type }) => {
  return (
    <div className="card-container">
      <div className="card">
        <img src={img} alt={name} className="pokemonimg" />
        <div className="cardGradient">
          <p className="pokemonName"> {name} </p>
          <div className="types">
            <h4 className="type"> {type} </h4>
          </div>
        </div>
      </div>
    </div>
  )
};

export { Card }


