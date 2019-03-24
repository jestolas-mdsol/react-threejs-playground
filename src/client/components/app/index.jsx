import React, { Component } from 'react';
import Scene from '../scene';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientDimensions: {}
    }
  }

  componentDidMount() {
    this.setState({
      clientDimensions: { width: window.innerWidth, height: window.innerHeight }
    })
  }

  render() {
    const { width, height } = this.state.clientDimensions;
    return(
      <div>
        <h1>Help me, Obi-Wan Kenobi. You’re my only hope.</h1>
        <Scene width={width} height={height} />
      </div>
    )
  };
}

export default App;
