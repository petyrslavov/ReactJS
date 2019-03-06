import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css'

class Header extends Component {
    render() {
        return (
            <header>
                <nav>
                    <ul>
                        <li className="align-left first">
                            <Link to="/">Home</Link>
                        </li>
                        <li className="align-left">
                            <Link to="/car/all">View Avaliable Cars</Link>
                        </li>
                        {
                            this.props.username ?
                                (<ul>
                                    <li className="align-left">
                                        <Link to="/user/rents">My Rented Cars</Link>
                                    </li>
                                    {
                                        this.props.isAdmin ?
                                            (<li className="align-left">
                                                <Link to="/create">Add Car</Link>
                                            </li>)
                                            :
                                            null
                                    }
                                    <li className="align-right">
                                        <form id="logout-form" action="/user/logout" method="POST">
                                            <a href="#">Logout</a>
                                        </form>
                                    </li>
                                    <li className="align-right">
                                        <span>Hello, {this.props.username}</span>
                                    </li>
                                </ul>)
                                :
                                (<ul>
                                    <li className="align-right">
                                        <Link to="/register">Register</Link>
                                    </li>
                                    <li className="align-right">
                                        <Link to="/login">Login</Link>
                                    </li>
                                </ul>)
                        }
                    </ul>
                </nav>
            </header>

        );
    }
}

export default Header;
