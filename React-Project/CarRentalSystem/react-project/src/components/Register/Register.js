import React, { Component } from 'react';
import './Register.css'

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: null,
            password: null,
            repeatPassword: null,
            firstName: null,
            lastName: null,
        }

        this.handleChange = props.handleChange.bind(this);
    }
    render() {
        return (
            <div className="Register">
                <form id="register-form" onSubmit={(e) => this.props.handleSubmit(e, this.state, true)}>
                    <label htmlFor="username">Username:</label>
                    <input onChange={this.handleChange} className="input-field" type="text" id="username" name="username" />
                    <label htmlFor="password">Password:</label>
                    <input onChange={this.handleChange} className="input-field" type="password" id="password" name="password" />
                    <label htmlFor="repeatPassword">Repeat Password:</label>
                    <input onChange={this.handleChange} className="input-field" type="password" id="repeatPassword" name="repeatPassword" />
                    <label htmlFor="firstName">First Name:</label>
                    <input onChange={this.handleChange} className="input-field" type="text" id="firstName" name="firstName" />
                    <label htmlFor="lastName">Last Name:</label>
                    <input onChange={this.handleChange} className="input-field" type="text" id="lastName" name="lastName" />
                    <input className="submit-btn" type="submit" value="Register" />
                </form>
            </div>
        );
    }
}

export default Register;
