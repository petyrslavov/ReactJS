import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect, Switch } from 'react-router-dom';
import './App.css';
import Home from '../Home/Home'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Create from '../Create/Create';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      isAdmin: false
    }
  }

  componentDidMount(){
    const isAdmin = localStorage.getItem('isAdmin');
    const username = localStorage.getItem('username');
    if (username) {
      this.setState({
        username: username,
        isAdmin: isAdmin
      })
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e, data, isSignup) {
    e.preventDefault();
    fetch('http://localhost:9999/auth/sign' + (isSignup ? 'up' : 'in'), {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then(rawData => rawData.json())
      .then(responseBody => {
        if (responseBody.username) {
          this.setState({
            username: responseBody.username,
            isAdmin: responseBody.isAdmin
          });
          localStorage.setItem('username', responseBody.username);
          localStorage.setItem('isAdmin', responseBody.isAdmin);
        }
      })
  }

  handleCreateSubmit(e, data) {
    e.preventDefault();
    fetch('http://localhost:9999/feed/car/create', {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then(rawData => rawData.json())
  }

  render() {
    return (
      <div className="App">
        <Header isAdmin={this.state.isAdmin} username={this.state.username} />
        <Switch>
          <Home exact path="/" component={Home}/>
          <Route render={
            () =>
              this.state.isAdmin ?
                <Create
                  handleCreateSubmit={this.handleCreateSubmit.bind(this)}
                  handleChange={this.handleChange}
                /> :
                <Redirect
                  to={{
                    pathname: "/login"
                  }}
                />
          }
            path="/create" />
          <Route render={() =>
            <Register
              handleSubmit={this.handleSubmit.bind(this)}
              handleChange={this.handleChange} />}
            path="/register" />
          <Route render={() =>
            <Login
              handleSubmit={this.handleSubmit.bind(this)}
              handleChange={this.handleChange} />}
            path="/login" />
          <Route render={() => <h1>Not found!</h1>} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default App;
