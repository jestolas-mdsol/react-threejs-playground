import React, { Component, useState } from 'react';
import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols'; // fork of three-orbit-controls

import styles from './styles.scss';
import keyCodes from '../../config/keyCodes';

class Scene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // don't need this yet
    }

    this.floorAngle = -1 * (Math.PI / 2.5);
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

    // CAMERA CONTROLS
    this.cameraControls = new OrbitControls(this.camera);
    // this.cameraControls.keys = {
    //   LEFT: 65,
    //   RIGHT: 68,
    //   UP: 87,
    //   DOWN: 83
    // };

    this.cameraControls.mouseButtons = {
      ORBIT: THREE.MOUSE.RIGHT,
      PAN: THREE.MOUSE.LEFT,
      ZOOM: THREE.MOUSE.MIDDLE,
    }

    this.cameraControls.enableDamping = true; // For that slippery Feeling
    this.cameraControls.dampingFactor = 0.12; // Needs to call update on render loop
    this.cameraControls.rotateSpeed = 0.08; // Rotate speed
    this.cameraControls.autoRotate = false; // turn this guy to true for a spinning camera
    this.cameraControls.autoRotateSpeed = 0.08; // 30
    this.cameraControls.maxPolarAngle = Math.PI/2; // Don't let to go below the ground

    // this.cameraControls.addEventListener('change', this.renderScene);

    // RENDERER
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, context: ctx, antialias: true });
    this.renderer.setClearColor('#000000');
    this.renderer.setSize(canvasWidth, canvasHeight);

    // FLOOR PLANE
    const plane = new THREE.PlaneGeometry(10, 10);
    const planeMaterial = new THREE.MeshBasicMaterial({ color: '#58da7b', side: THREE.DoubleSide });

    this.floor = new THREE.Mesh(plane, planeMaterial);
    this.floor.rotation.x = this.floorAngle;
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

    // CANVAS EVENT LISTENERS
    // this.canvas.addEventListener('mousemove', this.handleMouseMove);
    // this.canvas.addEventListener('mousedown', this.handleMouseDown);
    this.canvas.addEventListener('keydown', this.handleKeydown);
    this.canvas.addEventListener('keyup', this.handleKeyUp);
    // this.cameraControls.addEventListener('change', this.renderScene);

    // OTHER VARIALBES (maybe move this to constructor)
    this.validKeyIsPressed = false; // not using component state to avoid unnecessary re-renders
    this.directionNames = Object.keys(keyCodes);
    this.cameraMovementDirection = null;
    this.canvasIsFocused = false;

    this.canvas.focus();
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
    this.canvasIsFocused = this.canvas == document.activeElement;

    this.cubeWithLineSegments.rotation.x += 0.01;
    this.cubeWithLineSegments.rotation.y += 0.01;
    this.cubeMesh.rotation.x += 0.01;
    this.cubeMesh.rotation.y += 0.01;

    // if (this.validKeyIsPressed) {
    //   this.cameraControls.update();
    //   // this.moveCamera()
    // }
    this.cameraControls.update();
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  }

  // WIP - cahnge this to use OrbitControls if camara should follow an object
  // moveCamera = () => {
  //   const direction = this.cameraMovementDirection;
  //   const cameraVelocity = 0.1;
  //
  //   switch (direction) {
  //     case 'left':
  //       this.camera.position.x -= cameraVelocity;
  //       break;
  //     case 'right':
  //       this.camera.position.x += cameraVelocity;
  //       break;
  //     case 'up':
  //       this.camera.position.z -= cameraVelocity;
  //       break;
  //     case 'down':
  //       this.camera.position.z += cameraVelocity;
  //       break;
  //     default:
  //       break;
  //   }
  // }

  panOrTiltCamera = () => {
    // pan or tilt camera
  }

  handleMouseMove = (e) => {
    if (!this.canvasIsFocused) { return; }

    console.log('moving: ', e);
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
      this.cameraMovementDirection = keyDirection;
    } else { return }
  }

  handleKeyUp = (e) => {
    const keyDirection = this.keyDirection(e);

    if (keyDirection === this.cameraMovementDirection) {
      this.validKeyIsPressed = false;
      this.cameraMovementDirection = null
    }
  }

  render() {
    return(
      <div>
        <canvas
          tabIndex="-1"
          id="stage"
          className={styles.canvas}
          ref={(canvas) => { this.canvas = canvas; }}
        />
      </div>
    )
  }

}

export default Scene;
