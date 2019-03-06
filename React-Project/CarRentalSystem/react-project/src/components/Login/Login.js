import React, { Component } from 'react';
import '../App/App.css'

class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: null,
            password: null,
        }

        this.handleChange = props.handleChange.bind(this);
    }
    render() {
        return (
            <div className="Login">
                <form id="login-form" onSubmit={(e) => this.props.handleSubmit(e, this.state, false)}>
                    <label htmlFor="username">Username:</label>
                    <input onChange={this.handleChange} className="input-field" type="text" id="username" name="username" />
                    <label htmlFor="password">Password:</label>
                    <input onChange={this.handleChange} className="input-field" type="password" id="password" name="password" />
                    <input className="submit-btn" type="submit" value="Login" />
                </form>
            </div>
        );
    }
}

export default Login;
