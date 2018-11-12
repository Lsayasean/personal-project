import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './reset.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider>
        <HashRouter>
          <div>
            hello my name is the one who is here 
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
