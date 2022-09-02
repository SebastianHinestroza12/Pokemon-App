import axios from 'axios';

function getPokemonDb() {
  return async function (dispatch) {
    let json = await axios.get('http://localhost:3001/pokemonsdb');
    return dispatch({
      type: 'GET_POKEMON_DB',
      payload: json.data
    });
  }
};


function getPokemon() {
  return async function (dispatch) {
    let json = await axios.get('http://localhost:3001/pokemons');
    return dispatch({
      type: 'GET_POKEMON',
      payload: json.data
    });
  }
};


function getNamePokemon(name) {
  return async function (dispatch) {
    try {
      let json = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
      return dispatch({
        type: 'GET_POKEMON_NAME',
        payload: json.data
      })
    } catch (error) {
      alert('No se encontro el pokemon')
    }
  }
};

function postPokemon(payload) {
  return async function (dispatch) {
    let json = await axios.post('http://localhost:3001/pokemons', payload);
    return dispatch({
      type: 'POST_POKEMON_CREATE',
      payload: json.data
    })
  };
};


function getPokemonType() {
  return async function (dispatch) {
    let json = await axios.get('http://localhost:3001/types');
    return dispatch({
      type: 'GET_POKEMON_TYPES',
      payload: json.data
    })
  };
};

function getPokemonDetail(id) {
  return async function (dispatch) {
    let info = await axios.get(`http://localhost:3001/pokemons/${id}`)
    return dispatch({
      type: 'GET_POKEMON_DETAIL',
      payload: info.data
    })
  }
}

function filterPokemonsType(payload) {
  console.log(payload)
  return {
    type: 'FILTER_POKEMON_TYPE',
    payload: payload
  }
}

function filterCreate(payload) {
  return {
    type: 'FILTER_CREATE',
    payload: payload
  }
};

function filterPokemonsFuerza(payload) {
  return {
    type: 'FILTER_POKEMON_FUERZA',
    payload: payload
  }
};

function filterPokemonsName(payload) {
  return {
    type: 'FILTER_POKEMON_NAME',
    payload: payload
  }
};


export {
  getPokemon,
  filterPokemonsType,
  filterCreate,
  getPokemonDb,
  filterPokemonsFuerza,
  filterPokemonsName,
  getNamePokemon,
  postPokemon,
  getPokemonType,
  getPokemonDetail
};

