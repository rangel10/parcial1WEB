import React, { Component } from 'react';
import PropTypes from 'prop-types';
import vegaEmbed from 'vega-embed';

export default class Viz extends Component {

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

    render() {
        return (
            <div>
                <div ref={(div) => this.divTarget=div}></div>
                
            </div>
        );
    }
}
/*
//<p key={this.props.municipio._id}>{this.props.municipio.departamento}</p>
VIZ.propTypes = {
    info: PropTypes
}
*/