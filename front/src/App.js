import React, { Component } from 'react';
import './App.css';
import FileData from './FileData' ;
import Viz from './Viz';
import vegaEmbed from 'vega-embed';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spec: {
        "data": {
          "name": "data"
        },
        "mark": "bar",
        "encoding": {
          "x": { "field": "a", "type": "ordinal" },
          "y": { "field": "b", "type": "quantitative" }
        }
      },
      data: [],
    }
  }

  changeData(data) {
    this.setState({data: data});
  }

  changeSpec(spec) {
    this.setState({spec: spec});
  }

  handleTextChange(e) {
    this.setState({spec: JSON.parse(e.target.value)});
  }


  render() {
    return (
      <div className="App">
        <h1>Parcial 1</h1>
        <FileData data={this.state.data} spec={this.state.spec} changeData={data => this.changeData(data)} 
          changeSpec={spec => this.changeSpec(spec)}/>
        <textarea cols="50" rows="30" value={JSON.stringify(this.state.spec, null, 2)}
                    onChange={this.handleTextChange}>
        </textarea>
        <Viz data={this.state.data} spec={this.state.spec} />
      </div>
    );
  }
}

export default App;
