import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Blogs from './components/Blogs';

class App extends Component {
  

  render() {
    return (
      <div className="App">
        <Blogs />
      </div>
    );
  }
}

export default App;
