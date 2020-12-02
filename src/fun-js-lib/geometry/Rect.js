import Box from './Box'
import Dot from './Dot'

/**
 * Represents rectangle. Rectangle is positioned box,
 * i.e. box and it's position
 */
export default class Rect {
  /**
   * @param {Object} args
   * @param {Dot} args.dot
   * @param {Box} args.box
   */
  constructor (args) {
    this.dot = args.dot
    this.box = args.box
  }
  /**
   * Logs this rect as string
   */
  log () {
    console.log(`x: ${this.x} y: ${this.y} w: ${this.w} h: ${this.h}`)
  }
  /**
   * @param {Dot} vector
   */
  moved (vector) {
    return new Rect({
      dot: this.dot.moved(vector),
      box: this.box.copy()
    })
  }
  center () {
    return new Dot({
      x: this.x + this.w / 2,
      y: this.y + this.h / 2
    })
  }
  get x () {
    return this.dot.x
  }
  get y () {
    return this.dot.y
  }
  get w () {
    return this.box.w
  }
  get h () {
    return this.box.h
  }
}