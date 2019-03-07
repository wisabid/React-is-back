import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Parent from './components/parent';

class App extends Component {
  constructor() {
    super();
    console.log('Constructor...')
    this.state = {
      title : "Propagate Me Alfie!"
    }
  }
  componentWillMount() {
    console.log('componentWillMount...')
  }

  componentDidMount() {
    console.log('component Did Mount...')
  }

  componentWillReceiveProps() {
    console.log('component Will receive props...')
  }

  shouldComponentUpdate(nextState, nextProps) {
    console.log('component Will receive props...')
    return true
  }

  componentWillUpdate() {
    
    console.log('component Will Update...YOU SHOULD NEVER SET STATE')
    // this.setState({
    //   title : 'tht'
    // })
  }

  componentDidUpdate() {
    console.log('component Did Update...YOU SHOULD NEVER SET STATE')
  }

  changemyname = (newtitle) => {
    this.setState({
      title : newtitle
    })
  }

  dothis = (ths) => {
    this.setState({
      title : ths
    })
  }


  dothat = (tht) => {
    this.setState({
      title : tht
    })
  }
  render() {
    console.log('RENDERRRRRRRRRRRR')
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Parent dothis={this.dothis.bind(this, 'DO THIS MANN')} dothat={this.dothat.bind(this, 'PLEASE DO THAT BOY')} changeme={this.changemyname.bind(this, 'Alfie! you Are Awesome!')}>{this.state.title}</Parent>
        </header>
      </div>
    );
  }
}

export default App;
