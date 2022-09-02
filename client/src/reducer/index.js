const initialState = {
  pokemons: [],
  allPokemons: [],
  types: [],
  detail: [],
};


function rootReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_POKEMON':
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload,
        // detail: action.payload
      }
    case 'FILTER_POKEMON_TYPE':
      const allPokemon2 = state.allPokemons;
      const filterType = allPokemon2.filter((t) =>
        t.type
          ? t.type[0] === action.payload || t.type[1] === action.payload
          : t.types && t.types.length === 1
            ? t.types[0] === action.payload
            : t.types && t.types.length > 1
              ? t.types[0] === action.payload || t.types[1] === action.payload
              : null
      );
      return {
        ...state,
        pokemons: filterType,
      };

    case 'FILTER_CREATE':
      const all = state.allPokemons;
      const filtered = () => {
        if (action.payload === 'existentes') {
          return all.filter(data => data.createdInDb === false || data.createdInDb === true);
        }
        else if (action.payload === 'creados') {
          return all.filter(data => data.createdInDb === true)
        }
      }

      return {
        ...state,
        pokemons: filtered()
      };

    case 'FILTER_POKEMON_FUERZA':
      const filter = state.allPokemons
      const filterFuerza =
        action.payload === "fasc"
          ? filter.sort(function (a, b) {
            if (a.attack > b.attack) {
              return 1;
            }
            if (b.attack > a.attack) {
              return -1;
            }
            return 0;
          })
          : filter.sort(function (a, b) {
            if (a.attack > b.attack) {
              return -1;
            }
            if (b.attack > a.attack) {
              return 1;
            }
            return 0;
          });
      return {
        ...state,
        pokemons: filterFuerza
      };


    case 'FILTER_POKEMON_NAME':
      const forName =
        action.payload === "asc"
          ? state.allPokemons.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            return 0;
          })
          : state.allPokemons.sort(function (a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return -1;
            }
            if (b.name > a.name) {
              return 1;
            }
            return 0;
          });
      return {
        ...state,
        pokemons: forName,
      };
    case 'GET_POKEMON_NAME':
      return {
        ...state,
        pokemons: action.payload
      }
    case 'POST_POKEMON_CREATE':
      return {
        ...state
      }
    case 'GET_POKEMON_TYPES':
      return {
        ...state,
        types: action.payload
      }
    case 'GET_POKEMON_DETAIL':
      return {
        ...state,
        detail: action.payload
      }
    default: return state;
  }
};


export { rootReducer };