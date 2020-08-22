import React, { Component } from 'react';

class RentedCars extends Component {
    render() {
        return (
            <table>
            <thead>
                <tr>
                    <th>Model</th>
                    <th>Price Per Day</th>
                    <th>Rent Expires</th>
                </tr>
            </thead>
            <tbody>
                {this.props.rents.map(rent => 
                <tr key={rent._id}>
                    <td>Model: {rent.car.model}</td>
                    <td>Price per day: {rent.car.pricePerDay} &euro;</td>
                     <td>Expires in: {rent.days} days</td>
                </tr>
                    )}
            </tbody>
        </table>
        );
    }
}

export default RentedCars;
