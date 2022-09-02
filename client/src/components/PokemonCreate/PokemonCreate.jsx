import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getPokemonType } from "../../action";
import "./PokemonCreate.css";
import { FcPlus, FcCancel } from "react-icons/fc";
import { NavBar } from ".././NavBar/NavBar";

const PokemonCreate = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector(state => state.types)
  console.log(types)

  const [input, setInput] = useState({
    name: '',
    hp: 0,
    attack: 0,
    defense: 0,
    height: 0,
    speed: 0,
    weight: 0,
    type: [],
    image: ''
  })

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    })
    console.log(input)
  }

  const handleSelect = (e) => {
    setInput({
      ...input,
      type: [...input.type, e.target.value]
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(input)
    dispatch(postPokemon(input))
    alert('Pokemon Creado Correctamente')
    setInput({
      name: '',
      hp: 0,
      attack: 0,
      defense: 0,
      height: 0,
      speed: 0,
      weight: 0,
      type: [],
      image: ''
    })
    history.push('/home')
  };

  const handleDelete = (e) => {
    setInput(
      {
        ...input,
        type: input.type.filter(data => data !== e)
      }
    )
  };

  useEffect(() => {
    dispatch(getPokemonType())
    return
  }, [dispatch])



  return (

    <div>
      <NavBar />
      <form className="form" onSubmit={e => { handleSubmit(e) }}>


        <h1 className="title"> Crea Tu Pokemon</h1>

        <div>
          <label>Name</label>
          <input type="text"
            className="input"
            value={input.name}
            name='name'
            placeholder="Pikacu"
            onChange={e => { handleChange(e); }}
          />

          <label>Hp</label>
          <input type="number"
            className="input"
            value={input.hp}
            name='hp'
            placeholder="67"
            onChange={e => { handleChange(e); }}
          />

          <label>Attack</label>
          <input type="number"
            className="input"
            value={input.attack}
            name='attack'
            placeholder="90"
            onChange={e => { handleChange(e); }}
          />

          <label>Defense</label>
          <input type="number"
            className="input"
            value={input.defense}
            name='defense'
            placeholder="34"
            onChange={e => { handleChange(e); }}
          />

          <label>Height</label>
          <input type="number"
            className="input"
            value={input.height}
            name='height'
            placeholder="23"
            onChange={e => { handleChange(e); }}
          />

          <label>Speed</label>
          <input type="number"
            className="input"
            value={input.speed}
            name='speed'
            placeholder="100"
            onChange={e => { handleChange(e); }}
          />

          <label>Weight</label>
          <input type="number"
            className="input"
            value={input.weight}
            name='weight'
            placeholder="36"
            onChange={e => { handleChange(e); }}
          />

          <label>Image</label>
          <input type="text"
            className="input"
            value={input.image}
            name='image'
            placeholder="Url"
            onChange={e => { handleChange(e); }}
          />

          <label> Types</label>
          <select className="input" onChange={e => { handleSelect(e) }}>
            <option>Todos</option>
            {types.map((e) => (
              <option value={e.name}>{e.name}</option>
            ))}
          </select>

          {/* <ul>
            <li>{input.type.map((e) => e + " , ")}</li>
          </ul> */}

          {input.type.map(e =>
            <div>
              <p>{e}</p>
              <button className="cancelar" onClick={() => handleDelete(e)}><FcCancel /></button>
            </div>
          )}

          <div className="merge-button">
            <button className="botton" type="submit"><FcPlus /></button>
            <Link to='/home'> <button className="atras">Volver</button></Link>
          </div>
        </div>
      </form>
    </div>
  )
};


export { PokemonCreate } 