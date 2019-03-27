import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Blogs from './components/Blogs';
import ThemeContext from './context/theme-context';

class App extends Component {
  state = {
    theme : 'linkedin'
  }

  changeTheme = (theme) => {
    console.log('Changing Theme...');
    const themes = ['blackey', 'linkedin'];    
    const newtheme = (this.state.theme === 'linkedin')?'blackey':'linkedin';
    this.setState({
      theme : newtheme
    })
  }

  render() {
    return (
      <ThemeContext.Provider value={{
        theme : this.state.theme, 
        changeTheme: this.changeTheme
      }}>
        <div className="App">
          <Blogs />
        </div>
      </ThemeContext.Provider>
    );
  }
}

export default App;
