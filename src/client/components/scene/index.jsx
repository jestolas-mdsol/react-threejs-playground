import React, { Component, useState } from 'react';
import * as THREE from 'three';
// import OrbitControls from 'three-orbitcontrols'; // fork of three-orbit-controls

import styles from './styles.scss';
import keyCodes from '../../config/keycodes';

class Scene extends Component {
  constructor(props) {
    super(props);

    // constants
    this.cameraVelocity = 0.1;
    this.mouseSensitivity = 0.1;
  }

  componentDidMount() {
    const ctx = this.canvas.getContext('webgl2');
    const canvasWidth = this.canvas.clientWidth;
    const canvasHeight = this.canvas.clientHeight;

    // DOM API BINDS
    this.canvas.requestPointerLock = this.canvas.requestPointerLock || this.canvas.mozRequestPointerLock;
    document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;

    // SCENE
    this.scene = new THREE.Scene();

    // CAMERA
    this.camera = new THREE.PerspectiveCamera(75, canvasWidth / canvasHeight, 0.1, 1000);
    // this.camera.position.z = 4;
    this.camera.position.set(0, 1, -5)

    // RENDERER
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, context: ctx, antialias: true });
    this.renderer.setClearColor('#000000');
    this.renderer.setSize(canvasWidth, canvasHeight);

    // FLOOR PLANE
    const plane = new THREE.PlaneGeometry(12, 12, 12, 12);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: '#58da7b', side: THREE.DoubleSide });

    this.floor = new THREE.Mesh(plane, planeMaterial);
    this.floor.position.set(0, 0, 0);
    this.floor.rotation.x += Math.PI / 2; // this.floorAngle;
    this.scene.add(this.floor);

    // CUBE EDGES AND MESH
    const cube = new THREE.BoxBufferGeometry(1, 1, 1);
    const cubeWithEdges = new THREE.EdgesGeometry(cube);

    this.cubeWithLineSegments = new THREE.LineSegments(cubeWithEdges, new THREE.LineBasicMaterial({ color: '#00ffff' }));
    this.cubeWithLineSegments.position.set(0, 1, 1);

    this.cubeMesh = new THREE.Mesh(cube, new THREE.MeshBasicMaterial({ color: '#433F81' }));
    this.cubeMesh.position.set(0, 1, 1);

    this.scene.add(this.cubeWithLineSegments);
    this.scene.add(this.cubeMesh);
    this.camera.lookAt(new THREE.Vector3(0, 1, 1)); // look at this.cubeMesh position

    // EVENT LISTENERS
    this.canvas.addEventListener('mousemove', this.handleMouseMove);
    // this.canvas.addEventListener('mousedown', this.handleMouseDown);
    this.canvas.addEventListener('keydown', this.handleKeydown);
    this.canvas.addEventListener('keyup', this.handleKeyUp);
    document.addEventListener('pointerlockchange', (e) => { console.log('pointer lock changed: ', document.pointerLockElement, '\n', e) });
    document.addEventListener('mozpointerlockchange', (e) => { console.log('pointer lock changed: ', document.pointerLockElement, '\n', e) });
    document.addEventListener('pointerlockerror', (e) => { console.log('pointer lock error: ', e) });
    document.addEventListener('mozpointerlockerror', (e) => { console.log('pointer lock error: ', e) });

    // MUTATING VARIALBES (maybe move this to constructor)
    this.validKeyIsPressed = false; // not using component state to avoid unnecessary re-renders
    this.directionNames = Object.keys(keyCodes);
    this.cameraMovementDirections = {};
    this.canvasIsFocused = false;

    // RUN INITIALIZER FUNCTIONS
    // this.canvas.focus();
    // this.canvas.requestPointerLock();
    this.start();
  }

  componentWillUnmount() {
    this.stop();
  }

  handleCanvasClick = (e) => {
    // if (!this.canvasIsFocused) {
    this.canvas.requestPointerLock();
    // }
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
    this.canvasIsFocused = this.canvas == document.activeElement;

    this.cubeWithLineSegments.rotation.x += 0.01;
    this.cubeWithLineSegments.rotation.y += 0.01;
    this.cubeMesh.rotation.x += 0.01;
    this.cubeMesh.rotation.y += 0.01;

    if (this.validKeyIsPressed) {
      this.keyMoveCamera()
    }

    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  }

  keyMoveCamera = () => {
    if (this.cameraMovementDirections['left']) {
      // this.camera.rotation.y -= this.cameraVelocity;
    }
    if (this.cameraMovementDirections['right']) {
      // this.camera.rotation.y += this.cameraVelocity;
    }
    if (this.cameraMovementDirections['up']) {
      this.camera.position.x -= Math.sin(this.camera.rotation.y) * this.cameraVelocity;
      this.camera.position.z += Math.cos(this.camera.rotation.y) * this.cameraVelocity;
    }
    if (this.cameraMovementDirections['down']) {
      this.camera.position.x += Math.sin(this.camera.rotation.y) * this.cameraVelocity;
      this.camera.position.z -= Math.cos(this.camera.rotation.y) * this.cameraVelocity;
    }
  }

  mouseLookCamera = () => {
    // pan or tilt camera
  }

  handleMouseMove = (e) => {
    if (!this.canvasIsFocused) { return; }
    // console.log(e);
    if (e.movementX < 0) {
      // console.log('left');
      this.camera.rotation.y -= this.cameraVelocity;
    }
    if (e.movementX > 0) {
      // console.log('right');
      this.camera.rotation.y += this.cameraVelocity;
    }
    if (e.movementY < 0) {
      // console.log('up');
      // #here #koko
      this.camera.rotation.x -= Math.sin(this.camera.rotation.y) * this.cameraVelocity;
      this.camera.rotation.z += Math.cos(this.camera.rotation.y) * this.cameraVelocity;
    }
    if (e.movementY > 0) {
      // console.log('down');
      // this.camera.rotation.x += this.cameraVelocity;
    }
  }

  handleMouseDown = (e) => {
    console.log('clicking down: ', e)
  }

  // util - extract as util
  keyDirection = (e) => (
    this.directionNames.find(dir => e.keyCode === keyCodes[dir].code) || null
  )

  handleKeydown = (e) => {
    if (!this.canvasIsFocused) { return; }

    const keyDirection = this.keyDirection(e);

    if (!!keyDirection) {
      this.validKeyIsPressed = true;
      this.cameraMovementDirections[keyDirection] = true;
    } else if (e.keyCode === 27) { // esc key
      document.exitPointerLock();
    }
    else { return }
  }

  handleKeyUp = (e) => {
    const keyDirection = this.keyDirection(e);
    if (!this.cameraMovementDirections[keyDirection]) return;

    this.cameraMovementDirections[keyDirection] = false;
  }

  render() {
    return(
      <div>
        <canvas
          tabIndex="-1"
          id="stage"
          className={styles.canvas}
          ref={(canvas) => { this.canvas = canvas; }}
          onClick={this.handleCanvasClick}
        />
      </div>
    )
  }

}

export default Scene;
