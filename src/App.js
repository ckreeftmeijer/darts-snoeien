import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider } from 'react-redux'

import { store } from './store'
import Home from './containers/Home';
import Game from './containers/Game';
import Title from './components/Title';

import './App.scss';
import './theme/master.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header>
          <Title />
        </header>
        <Provider store={store}>
          <Router>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/game/:name">
                <Game />
              </Route>
            </Switch>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;
