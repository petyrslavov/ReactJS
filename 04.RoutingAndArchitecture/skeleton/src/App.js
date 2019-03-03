import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './Home/Home';
import Register from './Register/Register';
import Login from './Login/Login';
import Create from './Create/Create';
import Header from './Header/Header';
import Details from './Details/Details';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      isAdmin: false,
      movies: [],
      selectedMovieId: 0
    }

    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    const isAdmin = localStorage.getItem('isAdmin') === true;
    if (localStorage.getItem('username')) {
      this.setState({
        username: localStorage.getItem('username'),
        isAdmin: isAdmin
      })
    }
    fetch('http://localhost:9999/feed/movies')
      .then(rawData => rawData.json())
      .then(body => {
        this.setState({
          movies: body.movies
        });
        toast.success(body.message, {
          closeButton: false
        });
      })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleCreateSubmit(e, data) {
    e.preventDefault();
    fetch('http://localhost:9999/feed/movie/create', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then(rawData => rawData.json())
      .then(responseBody => {
        if (!responseBody.errors) {
          toast.success(responseBody.message, {
            closeButton: false
          })
        } else {
          toast.error(responseBody.message, {
            closeButton: false
          })
        }
      })
  }


  handleSubmit(e, data, isSignup) {
    e.preventDefault();
    fetch('http://localhost:9999/auth/sign' + (isSignup ? 'up' : 'in'), {
      method: 'POST',
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
          toast.success(`Welcome, ${responseBody.username}`, {
            closeButton: false
          })
        } else {
          toast.error(responseBody.message, {
            closeButton: false
          })
        }

      })
  }

  logout() {
    this.setState({
      isAdmin: false,
      user: null,
      userId: null,
      isFetched: false,
      message: 'Logged Out!'
    })
    localStorage.clear()
    toast.success('Logged Out!');
  }


  render() {
    return (
      <div className="App">
        { /* TODO */}
        <ToastContainer />
        <Header {...this.state} logout={this.logout} isAdmin={this.state.isAdmin} username={this.state.username} />
        <Route render={(props) =>
          <Details {...props} movie={this.state.movies[this.state.selectedMovieId]} />} 
          path="/movies/:id" 
          />
        <Route exact render={(props) =>
          <Home {...props} movies={this.state.movies} />} path="/" />
        <Route render={(props) =>
          this.state.isAdmin ?
            <Create
              {...props}
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
        <Route render={(props) =>
          <Register {...props} handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange} />} path="/register" />
        <Route render={() =>
          <Login handleSubmit={this.handleSubmit.bind(this)} handleChange={this.handleChange} />} path="/login" />
      </div>
    );
  }
}

export default App;
