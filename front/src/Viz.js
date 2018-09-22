import React, { Component } from 'react';
import vegaEmbed from 'vega-embed';

export default class Viz extends Component {

    constructor(props) {
        super(props);

    }

    renderViz(props) {
        let vizData;
        if (props.data && props.data.length) {
            vizData = props.data;
        } else {
            vizData = [
                {"a": "A","b": 30}, {"a": "B","b": 30}, {"a": "C","b": 30},
                {"a": "D","b": 30}, {"a": "E","b": 30}, {"a": "F","b": 30},
                {"a": "G","b": 30}, {"a": "H","b": 30}, {"a": "I","b": 30}
              ];
        }
        
        const embed_opt = { "mode": "vega-lite" };
        const el = this.divTarget;
        //console.log(vizData);
        //console.log(props.spec)
        const view = vegaEmbed(el, props.spec, embed_opt)
            .catch(error => console.log(el, error))
            .then((res) => res.view.insert(props.spec.data.name, vizData).run());

    }

    componentDidMount() {
        this.renderViz(this.props);
    }

    componentDidUpdate() {
        this.renderViz(this.props);
    }

    render() {
        return (
            <div>
                <div ref={(div) => this.divTarget = div}></div>

            </div>
        );
    }
}
