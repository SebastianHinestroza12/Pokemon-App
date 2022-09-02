import React, { Fragment } from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemon,
  filterPokemonsType,
  filterCreate,
  filterPokemonsFuerza,
  filterPokemonsName
} from "../../action";
import { Link } from 'react-router-dom';
import { Card } from '../Card/Card';
import { Paginado } from "../Paginado/Paginado.jsx";
import { NavBar } from "../NavBar/NavBar";
import "./Home.css";
import { Loading } from ".././Loading/Loading";



const Home = () => {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons)

  const [order, setOrder] = useState("")
  const [charge, setCharge] = useState(false)


  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPage, setPokemonsPage] = useState(12);
  const indexOfLastPokemons = currentPage * pokemonsPage;
  const indexOfFistPokemons = indexOfLastPokemons - pokemonsPage;
  const currrentPokemons = allPokemons.slice(indexOfFistPokemons, indexOfLastPokemons);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  useEffect(() => {
    dispatch(getPokemon());
  }, [dispatch])

  // const setOrderSearch = () => {
  //   setCurrentPage(1)
  // };

  const handleFilterType = (e) => {
    e.preventDefault();
    setCharge(true)
    dispatch(filterPokemonsType(e.target.value));
    setCurrentPage(1);
    setOrder(`filtered ${e.target.value}`);

  }

  const handleFilterCreate = (e) => {
    e.preventDefault();
    setCharge(true)
    dispatch(filterCreate(e.target.value));
    setCurrentPage(1);
    setOrder(`filtered ${e.target.value}`);

  };

  /*
    Filtra los pokemons por su fuerza, y luego establece la página actual en 1, el orden en filtrado +
    la fuerza, y luego establece la carga en falso después de 1 segundo.
   */
  const handleFilterFuerza = (e) => {
    e.preventDefault();
    dispatch(filterPokemonsFuerza(e.target.value));
    setCurrentPage(1);
    setOrder(`filtered ${e.target.value}`);

  };

  const handleFilterName = (e) => {
    e.preventDefault();
    dispatch(filterPokemonsName(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`); // Es un estado local que se esta utilizando paara que despues de setear a la  pagina 1  me modifique el estado local y renderizarlo

  };

  const resetPokemon = (e) => {
    e.preventDefault();
    dispatch(getPokemon());
  };

  return (
    <Fragment>

      <div>

        <NavBar />

        <button className="btn-primary" onClick={e => resetPokemon(e)}>Resetear</button>

        <select className="select-css" onChange={e => { handleFilterName(e) }}>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>

        <select className="select-css" onChange={e => handleFilterFuerza(e)}>
          <option value="fasc">Fuerza arriba</option>
          <option value="fdesc">Fuerza abajo</option>
        </select>

        <select className="select-css" onChange={e => handleFilterType(e)}>
          {/* <option value="all"> Tipo </option> */}
          <option value="flying">Flying</option>
          <option value="normal">Normal</option>
          <option value="poison">Poison</option>
          <option value="fighting">Fighting</option>
          <option value="ground">Ground</option>
          <option value="rock">Rock</option>
          <option value="bug">Bug</option>
          <option value="ghost">Ghost</option>
          <option value="steel">Steel</option>
          <option value="fire">Fire</option>
          <option value="water">Water</option>
          <option value="grass">Grass</option>
          <option value="electric">Electric</option>
          <option value="psychic">Psychic</option>
          <option value="ice">Ice</option>
          <option value="dragon">Dragon</option>
          <option value="dark">Dark</option>
          <option value="fairy">Fairy</option>
          <option value="unknown">Unknown</option>
          <option value="shadow">Shadow</option>

        </select>

        <select className="select-css" onChange={e => handleFilterCreate(e)}>
          {/* <option value="todos">Todos</option> */}
          <option value="existentes">Existentes</option>
          <option value="creados">Creados</option>
        </select>

        <Paginado
          pokemonsPage={pokemonsPage}
          allPokemons={allPokemons.length}
          paginado={paginado}
        />

        {
          currrentPokemons.length > 0 ? currrentPokemons.map(data => {
            return (
              <Link className="linkto" to={"/pokemon/" + data.id} key={data.id}>
                <Card
                  name={data.name}
                  img={data.image ? data.image : data.img}
                  type={data.type ? data.type : data.types}
                />
              </Link>
            )
          })
            : <Loading />
        }
      </div>
    </Fragment>
  )
};

export { Home };