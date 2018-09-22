import React, { Component } from 'react';
import Papa from 'papaparse';


export default class FileData extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        let csv = this.file.files[0];
        console.log('value:', csv);
        if(csv === undefined) {
            alert('Seleccione un archivo')
            return;
        }
        let config = {
            dynamicTyping: true,
            header: true,
            complete: (f) => {
                this.props.changeData(f.data);
            }
        }
        Papa.parse(this.file.files[0], config);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="fileData">Seleccionar archivo</label><br></br>
                <input id="fileData" type="file" ref={(f)=>this.file=f}></input><br></br>
                <input type="submit" value="Graficar" ></input>
            </form>
        );
    }

}