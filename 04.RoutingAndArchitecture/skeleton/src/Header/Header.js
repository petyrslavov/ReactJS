import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <header><Link to="/" className="logo">Interactive IMDB</Link>
                <div className="header-right">
                    <Link to="/">Home</Link>
                    {
                        this.props.username ?
                            (<span>
                                <a href="#">Welcome {this.props.username}!</a>
                                {
                                    this.props.isAdmin ?
                                        (<Link to="/create">Create</Link>)
                                        :
                                        null
                                }
                                <Link to="/" onClick={this.props.logout}>Logout</Link>
                            </span>)
                            :
                            <span>
                                <Link to="/register">Register</Link>
                                <Link to="/login">Login</Link>
                            </span>
                    }
                </div>
            </header>
        );
    }
}

export default Header;
