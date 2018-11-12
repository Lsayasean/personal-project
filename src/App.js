import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './ducks/store';
import routes from './routes';
import './reset.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div>
          <div>
            <nav>

            </nav>
          </div>
          {routes}
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
