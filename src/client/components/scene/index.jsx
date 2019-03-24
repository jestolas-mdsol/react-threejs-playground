import React, { Component, useState } from 'react';
import * as THREE from 'three';

import styles from "./styles";

// const Scene = ({ width, height }) => {

class Scene extends Component {
  // react16 state
  // const [ctx, setCtx] = usetState(0);
  // setCtx(this.canvas.getContext('webgl2'));

  // console.log('canvas: ', this.canvas)

  // const scene = new THREE.Scene();
  // const renderer = new THREE.WebGLRenderer({ canvas: ctx,  });
  // const camera = new THREE.PerspectiveCamera(
  //   75,
  //   width / height,
  //   0.1,
  //   1000
  // )
  // camera.position.z = 4

  constructor(props) {
    super(props);

    this.state = {
      ctx: null
    }
  }

  componentDidMount() {
    debugger

    if (!this.state.ctx) {
      this.setState({
        ctx: this.canvas.getContext('webgl2')
      })
    }
  }

  render() {
    return(
      <div>
        <h1>foo</h1>
        <canvas
          id="stage"
          ref={(canvas) => { this.canvas = canvas; }}
          className={styles.canvas}
        />
      </div>
    )
  }

}

export default Scene;
