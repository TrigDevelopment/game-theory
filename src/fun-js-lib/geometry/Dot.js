import Rect from './Rect'

/**
 * Represents two-dimensional dot.
 * @property {number} x
 * @property {number} y
 */
export default class Dot {
  /**
   * @param {Object} args
   * @param {number} [args.x]
   * @param {number} [args.y]
   * @param {number} [args.z]
   */
  constructor (args) {
    this.x = args.x ?? 0
    this.y = args.y ?? 0
    this.z = args.z ?? 0
  }
  /**
   * Creates Dot by array of coordinates and returns it.
   * @param {number[]} coordinates 
   */
  static byArray (coordinates) {
    return new Dot({
      x: coordinates[0] ?? 0,
      y: coordinates[1] ?? 0,
      z: coordinates[2] ?? 0
    })
  }
  /**
   * Returns copy of the dot
   */
  copy () {
    return new Dot({
      x: this.x,
      y: this.y,
      z: this.z
    })
  }
  /**
   * @param {Dot} vector
   */
  moved (vector) {
    return new Dot({
      x: this.x + (vector.x ?? 0),
      y: this.y + (vector.y ?? 0),
      z: this.z + (vector.z ?? 0)
    })
  }
  /**
   * Returns true iff this dot is in `rect`.
   * Third dimension (`this.z`) is not considered.
   * @param {Rect} rect
   */
  isInRect (rect) {
    return this.x >= rect.x && this.x <= (rect.x + rect.w)
      && this.y >= rect.y && this.y <= (rect.y + rect.h)
  }
}