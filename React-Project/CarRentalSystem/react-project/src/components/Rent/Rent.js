import React, { Component } from 'react';

class Rent extends Component {
    constructor(props) {
        super(props);
      
        const carId = this.props.match.params.id
        const car = this.props.cars.find(p => p._id === carId)
        this.state = {
           days: null,
           car: car,
           user: localStorage.getItem('username')
        }

        this.handleChange = props.handleChange.bind(this);
    }
    render() {
        const carId = this.props.match.params.id
        const car = this.props.cars.find(p => p._id === carId)
        return (
            <div id="details">
                <div className="car-details">
                    <h2>{car.model}</h2>
                    <img src={car.image} alt="car" />
                </div>
                <form id="rent-form" onClick={(e) => this.props.handleRentCreateSubmit(e, this.state)}>
                    <label htmlFor="days">Rent days:</label>
                    <input type="number" onChange={this.handleChange} name="days" id="days" step="1" defaultValue="1" />
                    <input className="submit-btn" type="submit" value="Rent" />
                </form>
            </div>
        );
    }
}

export default Rent;
