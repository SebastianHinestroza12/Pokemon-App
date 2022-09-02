const { Router } = require('express');
const {
  getPokemon,
  getTypes,
  getPokemonId,
  postPokemon,
  getDb
} = require('../controllers/PokeRutas');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();


router.get('/pokemons', getPokemon)
router.get('/types', getTypes);
router.get('/pokemons/:id', getPokemonId);
router.post('/pokemons', postPokemon)

router.get('/pokemonsdb', getDb)

module.exports = router;

