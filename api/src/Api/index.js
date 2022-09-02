const axios = require('axios');
const { Pokemon } = require('../db');

const totalApi = async () => {
  try {
    const allPokemon = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
    // console.log(allPokemon)
    const info = await allPokemon.data.results.map(data => axios.get(data.url))
    // console.log(info)

    let pokemon = await axios.all(info).then(data => {
      data.map(p => {
        return {
          id: p.data.id,
          name: p.data.name,
          hp: p.data.stats[0].base_stat,
          attack: p.data.stats[1].base_stat,
          defense: p.data.stats[2].base_stat,
          speed: p.data.stats[5].base_stat,
          height: p.data.height,
          weight: p.data.weight,
          // types: p.data.types.map(el => el.type.name),
          image: p.data.sprites.front_default,
          createdInDb: false,

        }
      })
    })

    await Pokemon.bulkCreate(pokemon)
    console.log('pokemons agregados')
  } catch (error) {
    console.log(error)
  }
}
// console.log(total)

module.exports = {
  totalApi
}


// Configurar los routers

// router.get('/pokemons', async (req, res, next) => {
//   const { name } = req.query

//   try {
//     if (name) {
//       let pokemonByName = await Pokemon.findOne({
//         where: { name: name },
//       })

//       res.json(pokemonByName)
//     }
//     else {
//       let allPokemon = await Pokemon.findAll()
//       res.status(200).json(allPokemon);
//     }
//   } catch (error) {
//     next(error);
//   }
// })
