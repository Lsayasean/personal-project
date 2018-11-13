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
    console.log('location',this.props.location)
    return (
      <Provider store={store}>
        <HashRouter>
          <div>
            <Nav />
          </div>
          <div>
          {routes}
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
