import React, { Component } from 'react';
import Papa from 'papaparse';


export default class FileData extends Component {

    constructor(props) {
        super(props);
        this.handleGraficar = this.handleGraficar.bind(this);
    }

    handleGraficar(e) {
        e.preventDefault();
        let csv = this.file.files[0];
        console.log('value:', csv);
        if (csv === undefined) {
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

    handleGuardar(e) {
        e.preventDefault();
        if (!this.inputName.value && !this.inputTitle.value) {
            alert('Debe escribir un nombre de autor y titulo de la grafica')
            return;
        }
        let g = {
            name: this.inputName,
            title: this.inputTitle,
            spec: this.props.spec,
            data: this.props.data
        }
        fetch('/postGraficas', {
            method: 'POST',
            body: g
        })
            .then((res) => {
                console.log(res);
                alert('Guardado con éxito');
            })
            .catch(err => console.log(err));
    }

    handleBuscar(e) {
        e.preventDefault();
        if (!this.inputSearch.value) {
            alert('Escriba un un titulo para buscar');
            return;
        }
        fetch('/getGrafica', {
            method: 'POST',
            body: { name: this.inputSearch.value }
        })
            .then((res) => {
                console.log(res);
                if (res) {
                    this.props.changeSpec(res.spec);
                    this.props.changeData(res.data);
                    this.inputName.value = res.name;
                    this.inputTitle = res.title;
                }
            })
            .catch(err => console.log(err));
    }

    handleRating(e) {
        e.preventDefault();
        if(!this.inputNameRating) {
            alert('Escriba un nombre de calificador');
            return;
        }
        
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleGraficar}>
                    <label htmlFor={this.file}>Seleccionar archivo</label><br></br>
                    <input type="file" ref={(f) => this.file = f}></input>
                    <input type="submit" value="Graficar" ></input>
                </form>
                <form onSubmit={(e) => this.handleGuardar(e)}>
                    <label htmlFor={this.inputName}>Nombre del autor</label>
                    <input ref={(a) => this.inputName = a} type="text"></input>
                    <label htmlFor={this.inputTitle}>Titulo de la grafica</label>
                    <input ref={(c) => this.inputTitle = c} type="text"></input>
                    <input type="submit" value="Guardar"></input>
                </form>
                <form onSubmit={(e) => this.handleBuscar(e)}>
                    <label htmlFor={this.inputSearch}>Buscar</label>
                    <input ref={(x) => this.inputSearch = x} type="text"></input>
                    <input type="submit" value="Buscar"></input>
                </form>
                <form onSubmit={(e)=>this.handleRating(e)}>
                <label htmlFor={this.rating}>Calificar</label>
                    <select ref={(y)=>this.rating=y}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <label htmlFor={this.inputNameRating}>Nombre de calificador</label>
                    <input ref={(u)=>this.inputNameRating=u} type="text"></input>
                    <input type="submit" value="Enviar calificación"></input>
                </form>
            </div>
        );
    }

}