import React from "react";
import './Paginado.css';

const Paginado = ({ pokemonsPage, allPokemons, paginado }) => {

  const pageNumber = [];

  for (let i = 0; i <= Math.ceil(allPokemons / pokemonsPage) - 1; i++) {
    pageNumber.push(i + 1)
  }

  return (
    <nav className="paginado">
      <ul>
        {
          pageNumber && pageNumber.map(num => (
            <li className="number" key={num}>
              <button className="btn" onClick={() => paginado(num)}>{num}</button>
            </li>
          )
          )
        }
      </ul>
    </nav>
  )
};



export { Paginado } 