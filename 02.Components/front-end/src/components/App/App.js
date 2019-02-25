import React, { Component } from 'react';
import './App.css';
import Street from '../Street/Street';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      streets: [],
      selectedStreetIdx: 0,
      selectedHouseIdx: 0,
      hasFetched: false
    }
  }

  componentDidMount() {
    fetch('http://localhost:9999/feed/street/all')
      .then(rawData => rawData.json())
      .then(data => {
        this.setState({
          streets: data.streets
        })
      });
  }

  getStreets() {
    return this.state.streets;
  }

  render() {
    return (
      <div className="App">
        <div className="streets">
          <h2>Streets</h2>
          {
            this.getStreets().map((street, idx) => (
              <Street location={street.location} key={idx} />
            ))
          }
        </div>
      </div>
    );
  }
}

export default App;
