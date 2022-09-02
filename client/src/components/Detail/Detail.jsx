import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonDetail } from "../../action";
import { NavBar } from ".././NavBar/NavBar";
import { Loading } from "../Loading/Loading";
import "./Detail.css";


const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPokemonDetail(id));

  }, [dispatch, id])

  const pokemon = useSelector(state => state.detail);

  return (
    <div >
      <NavBar />

      {
        pokemon.length > 0 ?
          <div className="container-detail">
            <h1 className="name">{pokemon[0].name}</h1>
            <h2>#{pokemon[0].id}</h2>
            <img
              className="img-detail" src={pokemon[0].image ? pokemon[0].image : pokemon[0].img} alt={pokemon[0].name}
            />
            <p>Hp: {pokemon[0].hp}</p>
            <p>Attack: {pokemon[0].attack}</p>
            <p>Defense: {pokemon[0].defense}</p>
            <p>Speed: {pokemon[0].speed}</p>
            <p>height: {pokemon[0].height}</p>
            <p>weight: {pokemon[0].weight}</p>
            <h2>Type : {!pokemon[0].createdInDb ? pokemon[0].type + ' ' : pokemon[0].types.map(data => data.name + (''))}</h2>

            <Link to="/home" >
              <button>Volver</button>
            </Link>
          </div>
          : <Loading />
      }
    </div>
  )
}

export { Detail }