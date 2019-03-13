import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App/App.css';

class Cars extends Component {
    render() {
        return (
            <div id="container">
                {this.props.cars.map(car =>
                    <div key={car._id} className="car">
                        <h2>{car.model}</h2>
                        <img src={car.image} alt="car" />
                        <h2 className="price">Price per day: {car.pricePerDay} &euro;</h2>
                        <Link className="rent-btn" to={"/rent/" + car._id}>Rent</Link>
                        {
                            localStorage.getItem("username") === "Admin" ?
                                <Link className="edit-btn" to="/car/edit/{{_id}}">Edit</Link>
                                :
                                null
                        }
                    </div>
                )}
            </div>
        );
    }
}

export default Cars;
