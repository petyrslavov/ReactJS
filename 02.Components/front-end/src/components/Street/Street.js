import React, { Component } from 'react';
import './Street.css';

class Street extends Component {
  render() {
    return (
      <div className="street">
        <p className="street-info"> {this.props.location}</p>
      </div>
    );
  }
}

export default Street;
