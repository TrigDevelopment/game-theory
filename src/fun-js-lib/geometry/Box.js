/**
 * Represents object with width and height
 */
export default class Box {
  /**
   * @param {Object} args
   * @param {number} args.w
   * @param {number} args.h
   */
  constructor (args) {
    /** Width of the box */
    this.w = args.w
    /** Height of the box */
    this.h = args.h
  }
  copy () {
    return new Box({
      w: this.w,
      h: this.h
    })
  }
  /**
   * Returns new `Box` with sides scaled by `factor`
   * @param {number} factor 
   */
  scaled (factor) {
    return new Box({
      w: this.w * factor,
      h: this.h * factor
    })
  }
}