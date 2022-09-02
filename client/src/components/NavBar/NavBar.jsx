import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { SearchBar } from "../SearchBar/SearchBar";
import image from "../.././img/pokemon.png";


const NavBar = () => {
  return (
    <nav className="nav">
      <Link to="/">
        <span className="landinglink">
          <img src={image} width="150" height=" 50" alt="pokemon" />
        </span>
      </Link>
      <SearchBar />
      <Link to="/pokemonCreado"><button className="create">CREAR POKEMON</button></Link>
    </nav>
  )
}

export { NavBar }
// 