import React, { Component, useState } from 'react';
import * as THREE from 'three';

import styles from "./styles";

class Scene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ctx: null,
      renderer: null,
    }
  }

  componentDidMount() {
    if (!this.state.ctx || !this.state.renderer) {
      const ctx = this.canvas.getContext('webgl2');
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera()
      const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, context: ctx });

      // use custom shader in index.html
      // const material = new THREE.ShaderMaterial({
      //   vertexShader: do
      // })

      this.setState({ ctx, renderer });
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
