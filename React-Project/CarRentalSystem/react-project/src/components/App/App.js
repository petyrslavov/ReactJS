import React, { Component } from 'react';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import '../Rent/Rent.css'
import Home from '../Home/Home'
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Create from '../Create/Create';
import Cars from '../Cars/Cars'
import Rent from '../Rent/Rent'
import RentedCars from '../Rent/RentedCars';
import Edit from '../Edit/Edit';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      isAdmin: false,
      cars: [],
    }
  }

  componentDidMount() {
    const isAdmin = localStorage.getItem('isAdmin') === "true";
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('id');
    if (username) {
      this.setState({
        username: username,
        isAdmin: isAdmin,
        userId: userId
      })
    }

    fetch('http://localhost:9999/feed/cars')
      .then(rawData => rawData.json())
      .then(body => {
        this.setState({
          cars: body.cars
        });
      })

      fetch(`http://localhost:9999/feed/my-rents/${userId}`)
      .then(rawData => rawData.json())
      .then(body => {
        this.setState({
          rents: body.rents
        });
      })
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
        if (responseBody.userId) {
          this.setState({
            id: responseBody.userId,
            username: responseBody.username,
            isAdmin: responseBody.isAdmin
          });
          toast.success(`Welcome, ${responseBody.username}`, {
            closeButton: false
          })
          localStorage.setItem('id', responseBody.userId);
          localStorage.setItem('username', responseBody.username);
          localStorage.setItem('isAdmin', responseBody.isAdmin);
          this.props.history.push("/");
        }
        else {
          toast.error(responseBody.message, {
            closeButton: false
          })
        }
      })
  }

  handleCreateSubmit(e, data) {
    fetch('http://localhost:9999/feed/car/create', {
      method: 'post',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then(rawData => rawData.json())
      .then(() => {
        this.props.history.push("/cars");
      })

  }

  handleDelete(e, id) {
    e.preventDefault();
    fetch(`http://localhost:9999/feed/delete/${id}`, {
      method: 'post',
    })
      .then(() => {
        this.props.history.push("/cars");
      })

  }

  handleEditSubmit(e, data, id) {
    e.preventDefault();
    fetch(`http://localhost:9999/feed/edit/${id}`, {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(rawData => rawData.json())
    .then(responseBody => {
        this.setState({
          model: responseBody.data.model,
          image: responseBody.data.image,
          pricePerDay: responseBody.data.pricePerDay
        });
        this.props.history.push("/cars");
        toast.success(`Car edited successfuly`, {
          closeButton: false
        })
      })
  }

  handleRentCreateSubmit(e, data) {
    e.preventDefault();
    fetch('http://localhost:9999/feed/rent/create', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(rawData => rawData.json())
      .then(responseBody => {
        if (responseBody.data.car) {
          this.setState({
            car: responseBody.data.car,
            user: responseBody.data.user,
            days: responseBody.data.days
          });
          this.props.history.push("/rented");
          toast.success(`Rent created successfuly`, {
            closeButton: false
          })
        }
        else {
          toast.error(responseBody.message, {
            closeButton: false
          })
        }
      })
  }

  render() {
    return (
      <div className="App">
        <ToastContainer />
        <Header isAdmin={this.state.isAdmin} username={this.state.username} />
        <Switch>
          <Home exact path="/" component={Home} />
          <Route render={
            (props) =>
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
          <Route render={
            (props) =>
              this.state.isAdmin ?
                <Edit
                  {...props}
                  handleEditSubmit={this.handleEditSubmit.bind(this)}
                  handleChange={this.handleChange}
                  cars={this.state.cars}
                /> :
                <Redirect
                  to={{
                    pathname: "/login"
                  }}
                />
          }
            path="/edit/:id" />
          <Route render={
            (props) =>
              this.state.username ?
                <Cars
                  {...props}
                  cars={this.state.cars}
                /> :
                <Redirect
                  to={{
                    pathname: "/login"
                  }}
                />
          }
            path="/cars/" />
          <Route render={(props) =>
            <Rent
              {...props}
              handleRentCreateSubmit={this.handleRentCreateSubmit.bind(this)}
              handleChange={this.handleChange}
              cars={this.state.cars}
            />}
            path="/rent/:id"
          />
          <Route render={
            (props) =>
              this.state.username ?
                <RentedCars
                  {...props}
                  rents={this.state.rents}
                /> :
                <Redirect
                  to={{
                    pathname: "/login"
                  }}
                />
          }
            path="/rented" />
          <Route render={(props) =>
            <Register
              {...props}
              handleSubmit={this.handleSubmit.bind(this)}
              handleChange={this.handleChange} />}
            path="/register" />
          <Route render={(props) =>
            <Login
              {...props}
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

export default withRouter(App);

