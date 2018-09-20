import React, { Component } from 'react';
import './App.css';
import Info from './Info.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infos: []
    }
  }

  componentDidMount() {
    fetch('/getData')
      .then((res) => res.json())
      .then((json) => this.setState({infos:json}))
      .catch((err) => console.log(err));
  }
  
  renderInfo() {
    return this.state.infos.map((info) => {
      //<Info info={inf}/>
      <div key={info.id}>info.property</div>
    });
  }
  
  render() {
    return (
      <div className="App">
        <h1>Parcial 1</h1>
        {this.renderInfo()}
      </div>
    );
  }
}

export default App;
