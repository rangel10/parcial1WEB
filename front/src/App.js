import React, { Component } from 'react';
import './App.css';
import Info from './Info';
import Viz from './Viz';
import vegaEmbed from 'vega-embed';
import embed from 'vega-embed';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vizJson: {'$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
            'description': 'A scatterplot showing horsepower and miles per gallons for various cars.',
            'data': {'url': 'data/cars.json'},
            'mark': 'point',
            'encoding': {
              'x': {'field': 'Horsepower','type': 'quantitative'},
              'y': {'field': 'Miles_per_Gallon','type': 'quantitative'}
            }
          }
    }
  }

  componentDidMount() {
    
  }
  
  renderViz(viz) {
    this.state.infos.map((info) => {
      //<Info info={inf}/>
      <div key={info.id}>info.property</div>
    });
    vegaEmbed(viz);
  }
  
  render() {
    return (
      <div className="App">
        <h1>Parcial 1</h1>
        <form>
          Seleccionar archivo:
          <input type="file"></input>
          <input type="submit"></input>
          

          <textarea cols="50" rows="30" value="{'$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
      'description': 'A scatterplot showing horsepower and miles per gallons for various cars.',
      'data': {'url': 'data/cars.json'},
      'mark': 'point',
      'encoding': {
        'x': {'field': 'Horsepower','type': 'quantitative'},
        'y': {'field': 'Miles_per_Gallon','type': 'quantitative'}
      }
    }" ref={(textarea) => this.divTarget=textarea} onChange={this.divTarget.value=JSON.stringify(this.state.vizJson,null,2)}>
          </textarea>
          <div>{vegaEmbed(this.divTarget,this.divTarget.value,{'mode':'vega-lite'})}</div>
        </form>
        <Viz/>
      </div>
    );
  }
}

export default App;
