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
                <tr>
                    <td>model</td>
                    <td>pricePerDay &euro;</td>
                    <td>expiresOn</td>
                </tr>
            </tbody>
        </table>
        );
    }
}

export default RentedCars;
