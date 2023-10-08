class Vec4 {
  constructor(x, y, z, w) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.w = w;
  }
}

class Mat4 {
    constructor(
        d00, d01, d02, d03,
        d10, d11, d12, d13,
        d20, d21, d22, d23,
        d30, d31, d32, d33
    ) {
        this.m = [
            [d00, d01, d02, d03],
            [d10, d11, d12, d13],
            [d20, d21, d22, d23],
            [d30, d31, d32, d33]
        ];
    }
    
    static add(mat1, mat2) {
        const result = new Array(4);
        for (let i = 0; i < 4; i++) {
            result[i] = new Array(4);
            for (let j = 0; j < 4; j++) {
                result[i][j] = mat1[i][j] + mat2[i][j];
            }
        }
        return new Mat4(result);
    }

    static subtract(mat1, mat2) {
        const result = new Array(4);
        for (let i = 0; i < 4; i++) {
            result[i] = new Array(4);
            for (let j = 0; j < 4; j++) {
                result[i][j] = mat1[i][j] - mat2[i][j];
            }
        }
        return new Mat4(result);
    }

    static multiplyVec4(mat, vec) {
        const x = mat[0][0] * vec.x + mat[0][1] * vec.y + mat[0][2] * vec.z + mat[0][3] * vec.w;
        const y = mat[1][0] * vec.x + mat[1][1] * vec.y + mat[1][2] * vec.z + mat[1][3] * vec.w;
        const z = mat[2][0] * vec.x + mat[2][1] * vec.y + mat[2][2] * vec.z + mat[2][3] * vec.w;
        const w = mat[3][0] * vec.x + mat[3][1] * vec.y + mat[3][2] * vec.z + mat[3][3] * vec.w;

        return new Vec4(x, y, z, w);
    }

    static multiply(mat1, mat2) {
        const result = new Array(4);
        for (let i = 0; i < 4; i++) {
            result[i] = new Array(4);
            for (let j = 0; j < 4; j++) {
                result[i][j] =
                    mat1[i][0] * mat2[0][j] +
                    mat1[i][1] * mat2[1][j] +
                    mat1[i][2] * mat2[2][j] +
                    mat1[i][3] * mat2[3][j];
            }
        }
        return new Mat4(result);
    }

    static multiplyScalar(mat, scalar) {
        const result = new Array(4);
        for (let i = 0; i < 4; i++) {
            result[i] = new Array(4);
            for (let j = 0; j < 4; j++) {
                result[i][j] = mat[i][j] * scalar;
            }
        }
        return new Mat4(result);
    }

    static transpose(mat) {
        const result = new Array(4);
        for (let i = 0; i < 4; i++) {
            result[i] = new Array(4);
            for (let j = 0; j < 4; j++) {
                result[i][j] = mat[j][i];
            }
        }
        return new Mat4(result);
    }

    static identity() {
        const result = new Array(4);
        for (let i = 0; i < 4; i++) {
            result[i] = new Array(4);
            for (let j = 0; j < 4; j++) {
                if (i === j) {
                    result[i][j] = 1.0;
                } else {
                    result[i][j] = 0.0;
                }
            }
        }
        return new Mat4(result);
    }

    static scale(mat, x, y, z) {
        const result = new Array(4);
        result[0] = [
            mat[0][0] * x,
            mat[0][1] * y,
            mat[0][2] * z,
            mat[0][3]
        ];
        result[1] = [
            mat[1][0] * x,
            mat[1][1] * y,
            mat[1][2] * z,
            mat[1][3]
        ];
        result[2] = [
            mat[2][0] * x,
            mat[2][1] * y,
            mat[2][2] * z,
            mat[2][3]
        ];
        result[3] = [
            mat[3][0] * x,
            mat[3][1] * y,
            mat[3][2] * z,
            mat[3][3]
        ];
        return new Mat4(result);
    }

    static translation(v) {
        const result = [
            [1.0, 0.0, 0.0, v.x],
            [0.0, 1.0, 0.0, v.y],
            [0.0, 0.0, 1.0, v.z],
            [0.0, 0.0, 0.0, 1.0]
        ];
        return new Mat4(result);
    }

    static scaling(s) {
        const result = [
            [s.x, 0.0, 0.0, 0.0],
            [0.0, s.y, 0.0, 0.0],
            [0.0, 0.0, s.z, 0.0],
            [0.0, 0.0, 0.0, 1.0]
        ];
        return new Mat4(result);
    }

    static rotationX(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const result = [
            [1.0, 0.0, 0.0, 0.0],
            [0.0, cos, -sin, 0.0],
            [0.0, sin, cos, 0.0],
            [0.0, 0.0, 0.0, 1.0]
        ];
        return new Mat4(result);
    }

    static rotationY(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const result = [
            [cos, 0.0, sin, 0.0],
            [0.0, 1.0, 0.0, 0.0],
            [-sin, 0.0, cos, 0.0],
            [0.0, 0.0, 0.0, 1.0]
        ];
        return new Mat4(result);
    }

    static rotationZ(angle) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        const result = [
            [cos, -sin, 0.0, 0.0],
            [sin, cos, 0.0, 0.0],
            [0.0, 0.0, 1.0, 0.0],
            [0.0, 0.0, 0.0, 1.0]
        ];
        return new Mat4(result);
    }

    static orthographic(left, right, bottom, top, near, far) {
        const result = [
            [2.0 / (right - left), 0.0, 0.0, -(right + left) / (right - left)],
            [0.0, 2.0 / (top - bottom), 0.0, -(top + bottom) / (top - bottom)],
            [0.0, 0.0, -2.0 / (far - near), -(far + near) / (far - near)],
            [0.0, 0.0, 0.0, 1.0]
        ];
        return new Mat4(...result.flat());
    }

    // Add other methods similarly...

    static perspective(fov, aspectRatio, near, far) {
        const f = 1.0 / Math.tan((fov * Math.PI) / 360.0);
        const result = [
            [f / aspectRatio, 0.0, 0.0, 0.0],
            [0.0, f, 0.0, 0.0],
            [0.0, 0.0, (far + near) / (near - far), (2.0 * far * near) / (near - far)],
            [0.0, 0.0, -1.0, 0.0]
        ];
        return new Mat4(...result.flat());
    }
}

class Vertex4 {
  constructor(vec4, vertexIndex) {
    this.vec4 = vec4;
    this.vertexIndex = vertexIndex;
  }
  
  project() {
    const { x, y, z, w } = this.vec4;
    return new Vec4(x / w, y / w, z / w, 1);
  }
}

class Face4 {
  constructor(vertexIndexes) {
    this.vertexIndexes = vertexIndexes;
  }
}