import React, { Component, useState } from 'react';
import * as THREE from 'three';

import styles from "./styles.scss";

class Scene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ctx: null,
      renderer: null,
    }
  }

  componentDidMount() {
    const ctx = this.canvas.getContext('webgl2');
    const canvasWidth = this.canvas.clientWidth;
    const canvasHeight = this.canvas.clientHeight;

    // SCENE
    this.scene = new THREE.Scene();

    // CAMERA
    this.camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 2000);
    this.camera.position.z = 4;

    // RENDERER
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, context: ctx, antialias: true });
    this.renderer.setClearColor('#000000');
    this.renderer.setSize(canvasWidth, canvasHeight);

    // SAMPLE CUBE
    const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: '#433F81',

    });
    // const meshPhongMaterial = new THREE.MeshPhongMaterial();
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    this.start();
  }

  componentWillUnmount() {
    this.stop();
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId);
  }

  animate = () => {
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  }

  render() {
    return(
      <div>
        <canvas
          id="stage"
          className={styles.canvas}
          ref={(canvas) => { this.canvas = canvas; }}
        />
      </div>
    )
  }

}

export default Scene;
