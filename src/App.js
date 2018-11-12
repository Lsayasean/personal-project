import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './routes'
import './reset.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider>
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
