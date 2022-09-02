import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { LandingPage } from './components/LandingPage/LandingPage';
import { Home } from './components/Home/Home';
import { PokemonCreate } from './components/PokemonCreate/PokemonCreate';
import { Detail } from './components/Detail/Detail.jsx';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/home' component={Home} />
          <Route path='/pokemonCreado' component={PokemonCreate} />
          <Route path='/pokemon/:id' component={Detail} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
