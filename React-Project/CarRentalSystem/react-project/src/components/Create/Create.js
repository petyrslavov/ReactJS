import React, { Component } from 'react';
import '../App/App.css'

class Create extends Component {
    constructor(props){
        super(props);
        this.state = {
            model: null,
            image: null,
            pricePerDay: null
        }

        this.handleChange = props.handleChange.bind(this);
    }

    render() {
        return (
            <form className="car-form" onSubmit={(e) => this.props.handleCreateSubmit(e, this.state)}>
            <label htmlFor="carModel">Model:</label>
            <input className="input-field" onChange={this.handleChange} type="text" id="carModel" name="model"/>
            <label htmlFor="image">Image:</label>
            <input className="input-field"  onChange={this.handleChange} type="url" name="image" id="image"/>
            <label htmlFor="pricePerDay">Price per Day:</label>
            <input className="input-field"  onChange={this.handleChange} type="number" name="pricePerDay" id="pricePerDay"/>
            <input className="submit-btn" type="submit" value="Add Car" />
        </form>
        );
    }
}

export default Create;
