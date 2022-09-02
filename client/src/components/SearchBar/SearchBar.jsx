import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemon } from "../../action";
import "./SearchBar.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleInputName = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  }

  const handleButtonSubmit = (e) => {
    e.preventDefault();
    dispatch(getNamePokemon(name));
    setName('');
  }
  return (
    <div>
      <input
        className="search"
        onChange={e => handleInputName(e)}
        type="text"
        placeholder="Buscar Pokemon..."
      />
      <button className="boton" onClick={e => handleButtonSubmit(e)} type="submit">Buscar</button>
    </div>
  )
}

export { SearchBar }