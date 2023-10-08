class Vec3 {
  constructor(x, y, w = 1) {
    this.x = x;
    this.y = y;
    this.w = w;
  }

  // Normalize the vector
  normalize() {
    return new Vec3(this.x / this.w, this.y / this.w, 1);
  }
}

class Mat3 {
  constructor(elements) {
    this.elements = elements || [1, 0, 0, 0, 1, 0, 0, 0, 1];
  }

  // Multiply the matrix with a vector
  multiplyVector(vec) {
    const result = new Vec3(
      this.elements[0] * vec.x + this.elements[1] * vec.y + this.elements[2] * vec.w,
      this.elements[3] * vec.x + this.elements[4] * vec.y + this.elements[5] * vec.w,
      this.elements[6] * vec.x + this.elements[7] * vec.y + this.elements[8] * vec.w
    );
    return result;
  }

  // Multiply the matrix with another matrix
  multiplyMatrix(mat) {
    const resultElements = new Array(9).fill(0);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        for (let k = 0; k < 3; k++) {
          resultElements[i * 3 + j] += this.elements[i * 3 + k] * mat.elements[k * 3 + j];
        }
      }
    }
    return new Mat3(resultElements);
  }

  // Static method to create a translation matrix
  static translation(tx, ty) {
    return new Mat3([1, 0, tx, 0, 1, ty, 0, 0, 1]);
  }

  // Static method to create a scaling matrix
  static scaling(sx, sy) {
    return new Mat3([sx, 0, 0, 0, sy, 0, 0, 0, 1]);
  }

  // Static method to create a rotation matrix (angle in radians)
  static rotation(angle) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    return new Mat3([cos, -sin, 0, sin, cos, 0, 0, 0, 1]);
  }

  // Static method to create an orthographic projection matrix
  static orthographic(left, right, bottom, top) {
    const tx = -(right + left) / (right - left);
    const ty = -(top + bottom) / (top - bottom);
    return new Mat3([2 / (right - left), 0, tx, 0, 2 / (top - bottom), ty, 0, 0, 1]);
  }
}