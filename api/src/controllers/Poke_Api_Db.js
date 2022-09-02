const axios = require('axios');
const { Pokemon, Type } = require('../db');

/**
  Toma los primeros 40 pokemon de la API y devuelve una serie de objetos con la identificación del
  pokemon, nombre, hp, ataque, defensa, velocidad, altura, peso, tipos, imagen y un valor booleano de
  si el pokemon ha sido o no. creado en la base de datos
 */

// const getAllPokemon = async () => {

//   try {
//     const total = [];

//     const allPokemon = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
//     // console.log(allPokemon)
//     const info = await allPokemon.data.results.map(data => axios.get(data.url))
//     // console.log(info)

//     await axios.all(info).then(data => {
//       data.map(p => {
//         total.push({
//           id: p.data.id,
//           name: p.data.name,
//           hp: p.data.stats[0].base_stat,
//           attack: p.data.stats[1].base_stat,
//           defense: p.data.stats[2].base_stat,
//           speed: p.data.stats[5].base_stat,
//           height: p.data.height,
//           weight: p.data.weight,
//           types: p.data.types.map(el => el.type.name),
//           image: p.data.sprites.front_default,
//           createdInDb: false,
//         })
//       })
//     })

//     // console.log(total)
//     return total;

//   } catch (error) {
//     console.log(error)
//   }
// };

const getAllPokemon = async () => {

  try {
    // aca me traigo todos los 40 pokemones
    const apiResults = await axios.get(`https://pokeapi.co/api/v2/pokemon`);
    const apiNext = await axios.get(apiResults.data.next);
    const allPokemons = apiResults.data.results.concat(apiNext.data.results);
    for (let p of allPokemons) {
      let url = await axios.get(p.url);
      delete p.url;
      p.id = url.data.id;
      p.image = url.data.sprites.other.home.front_default;
      p.hp = url.data.stats[0].base_stat;
      p.attack = url.data.stats[1].base_stat;
      p.defense = url.data.stats[2].base_stat;
      p.speed = url.data.stats[5].base_stat;
      p.height = url.data.height;
      p.weight = url.data.weight;
      p.type = url.data.types.map((el) => el.type.name);
      p.createdInDb = false
    }
    return allPokemons;
  } catch (error) {
    console.log(error);
  }
};

/**
  Obtenga todos los Pokémon e incluya el Tipo asociado, pero solo devuelva el atributo de nombre del
  Tipo y no devuelva los atributos de la tabla.
  @returns Una matriz de objetos con el nombre, la identificación y los tipos de Pokémon.
 */

const getDbInfo = async () => {
  try {
    let dB = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ['name'],
        through: {
          attributes: []
        }
      }
    })

    /* Tomando los datos de la base de datos y mapeándolos a una nueva matriz. */
    dB = dB.map((e) => ({ ...e.dataValues, types: e.types.map((e) => e.name) }));
    return dB;
  } catch (error) {
    console.log(error);
  }
};


/**
  Toma los datos de la API y la base de datos y los fusiona en una matriz
  @returns Una matriz de objetos
 */
const mergeInfo = async () => {
  const apiInfo = await getAllPokemon();
  const dbinfo = await getDbInfo();
  const info = apiInfo.concat(dbinfo);
  return info
};



module.exports = {
  mergeInfo,
  getAllPokemon,
  getDbInfo
};