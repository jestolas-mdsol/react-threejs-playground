const keyDirection = (e) => (
  this.directionNames.find(dir => e.keyCode === keyCodes[dir].code) || null
);

export const handleKeydown = (e) => {
  const keyDirection = this.keyDirection(e);

  if (!!keyDirection) {
    this.validKeyIsPressed = true;
    this.cameraMovementDirection = keyDirection;
  } else { return }
};

export const handleKeyUp = (e) => {
  const keyDirection = this.keyDirection(e);

  if (keyDirection === this.cameraMovementDirection) {
    this.validKeyIsPressed = false;
    this.cameraMovementDirection = null
  }
};

export default {
  handleKeydown,
  handleKeyUp,
};
