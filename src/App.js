import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Nav from './components/nav/Nav'
import store from './ducks/store';
import routes from './routes';
import './reset.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className='app-main'>
            <div>
              <Nav />
            </div>
            <div>
              {routes}
            </div>
          </div>

        </HashRouter>
      </Provider>
    );
  }
}

export default App;
