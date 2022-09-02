const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { mergeInfo, getAllPokemon, getDbInfo } = require('./Poke_Api_Db');

const getDb = async (req, res) => {
  const db = await Pokemon.findAll({
    where: {
      createdInDb: true
    }
  })
  return res.status(201).json(db)
};

const getPokemon = async (req, res) => {
  try {
    const { name } = req.query
    let pokemonsTotal = await mergeInfo();
    // console.log(pokemonsTotal);
    if (name) {
      let pokemonsName = pokemonsTotal.filter(data => data.name.toLowerCase().includes(name.toLocaleLowerCase()));
      pokemonsName.length ? res.status(200).json(pokemonsName) : res.status(404).json(`no se encontro el pokemon con nombre ${name}`);
    }
    else return res.status(200).json(pokemonsTotal);
  } catch (error) {
    console.log(error);
  }
};


const getTypes = async (req, res) => {
  try {
    const typesApi = await axios.get('https://pokeapi.co/api/v2/type');
    const types = await typesApi.data.results;
    // console.log(types);
    types.forEach(async element => {
      await Type.findOrCreate({
        where: { name: element.name }
      })
    });
    const allTypes = await Type.findAll();
    res.json(allTypes);
  } catch (error) {
    console.log(error);
  }
};


const getPokemonId = async (req, res) => {
  try {
    const { id } = req.params;
    const allPokemon = await mergeInfo();
    if (id) {
      let idPokemon = allPokemon.filter(data => data.id === parseInt(id));
      if (idPokemon.length) return res.status(200).json(idPokemon)
      else return res.status(404).send(`No Se Encontro el pokemon con id ${id}`);
    }
  } catch (error) {
    console.log(error);
  }
};


const postPokemon = async (req, res) => {
  try {
    const {
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      img,
      createdInDb,
      type
    } = req.body;

    let pokemonCreated = await Pokemon.create({
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      img,
      createdInDb,
    })

    let typesDB = await Type.findAll({
      where: {
        name: type
      }
    })

    await pokemonCreated.addType(typesDB)

    return res.status(201).json(`El pokemon ${name} fue creado con exito🚦`)
  } catch (error) {
    console.log(error)
  }
};


module.exports = {
  getPokemon,
  getTypes,
  getPokemonId,
  postPokemon,
  getDb
};

