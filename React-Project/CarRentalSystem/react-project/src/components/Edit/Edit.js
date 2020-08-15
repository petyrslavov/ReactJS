import React, { Component } from 'react';

class Edit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            model: '',
            image: '',
            pricePerDay: '',
        }

        this.handleChange = props.handleChange.bind(this);
    }

    componentWillMount() {
        const carId = this.props.match.params.id
        let car = this.props.cars.find(c => c._id === carId)
        if (car) {
            this.setState({
                model: car.model,
                image: car.image,
                pricePerDay: car.pricePerDay,
            })
        }
    }

    render() {
        let carId = this.props.match.params.id
        let car = this.props.cars.find(c => c._id === carId)
        return (
            <form className="car-form" onSubmit={(e) => this.props.handleEditSubmit(e, this.state, carId)}>
                <label htmlFor="carModel">Model:</label>
                <input className="input-field" onChange={this.handleChange} type="text" id="carModel" name="model" defaultValue={car.model} />
                <label htmlFor="image">Image:</label>
                <input className="input-field" onChange={this.handleChange} type="url" name="image" id="image" defaultValue={car.image} />
                <label htmlFor="pricePerDay">Price per Day:</label>
                <input className="input-field" onChange={this.handleChange} type="number" name="pricePerDay" id="pricePerDay" defaultValue={car.pricePerDay}/>
                <input className="submit-btn" type="submit" value="Edit" />
            </form>
        );
    }
}

export default Edit;
