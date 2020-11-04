class Rect {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  constructor (x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }
  /**
   * Creates new Rect by properties of args
   * @param {Object} args
   * @param {number} args.x
   * @param {number} args.y
   * @param {number} args.w
   * @param {number} args.h
   */
  static byNamed (args) {
    return new Rect(args.x, args.y, args.w, args.h)
  }
  /**
   * Creates new Rect by x, y and box
   * @param {number} x 
   * @param {number} y 
   * @param {Box} box 
   */
  static byXYAndBox (x, y, box) {
    return new Rect(x, y, box.w, box.h)
  }
  /**
   * Creates new Rect by dot, width and height
   * @param {Dot} dot 
   * @param {number} width 
   * @param {number} height 
   */
  static byDotAndWH (dot, width, height) {
    return new Rect(dot.x, dot.y, width, height)
  }
  /**
   * 
   * @param {Dot} dot 
   * @param {Box} box 
   */
  static byDotAndBox (dot, box) {
    return new Rect(dot.x, dot.y, box.w, box.h)
  }
  /**
   * Logs this rect as string
   */
  log () {
    console.log(`x: ${this.x} y: ${this.y} w: ${this.w} h: ${this.h}`)
  }
  get h () {
    return this.height
  }
  get w () {
    return this.width
  }
  /**
   * @param {Vector} vector
   */
  moved (vector) {
    return new Rect(
      this.x + vector.x,
      this.y + vector.y,
      this.width,
      this.height)
  }
  center () {
    return new Dot(this.x + this.w / 2, this.y + this.h / 2)
  }
}

/**
 * Represents two-dimensional free vector.
 * Has no start dot.
 * @property {number} x
 * @property {number} y
 */
class Vector {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  /**
   * @param {number} length
   * @param {number} angle In radians
   */
  static createByLengthAngle (length, angle) {
    return new Vector(
      length * Math.cos(angle),
      -length * Math.sin(angle))
  }
  /**
   * @param {Vector} freeVector
   */
  moved (freeVector) {
    return new Vector(
      this.x + freeVector.x,
      this.y + freeVector.y)
  }
  /**
   * @param {number} multiplier
   */
  scaled (multiplier) {
    return new Vector(
      this.x * multiplier,
      this.y * multiplier)
  }
}

/**
 * Represents two-dimensional dot.
 * @property {number} x
 * @property {number} y
 */
class Dot {
  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  /**
   * Creates Dot by array of coordinates and returns it.
   * @param {number[]} coordinates 
   */
  static byArray (coordinates) {
    return new Dot(coordinates[0], coordinates[1])
  }
  /**
   * Creates dot by dotLike, which must have x and y
   * @param {{x: number, y: number}} dotLike
   */
  static byDotLike (dotLike) {
    return new Dot(dotLike.x, dotLike.y)
  }
  /**
   * @param {Vector} vector
   */
  moved (vector) {
    return new Dot(
      this.x + vector.x,
      this.y + vector.y)
  }
  /**
   * 
   * @param {number} x 
   */
  xMoved (x) {
    return new Dot(
      this.x + x,
      this.y)
  }
  /**
   * 
   * @param {number} y 
   */
  yMoved (y) {
    return new Dot(
      this.x,
      this.y + y)
  }
  /**
   * @param {Rect} rect
   */
  isIn (rect) {
    return this.x >= rect.x && this.x <= (rect.x + rect.width)
      && this.y >= rect.y && this.y <= (rect.y + rect.height)
  }
}

class Box {
  /**
   * @param {number} width
   * @param {number} height
   */
  constructor(width, height) {
    this.width = width
    this.height = height
  }
  /**
   * Creates and returns new box by boxLike object
   * @param {{width: number, height: number}} boxLike 
   */
  static byBoxLike (boxLike) {
    return new Box(boxLike.width, boxLike.height)
  }
  get h () {
    return this.height
  }
  get w () {
    return this.width
  }
  /**
   * Returns Box with sides scaled by [factor] 
   * @param {number} factor 
   */
  scaled (factor) {
    return new Box(
      this.width * factor,
      this.height * factor)
  }
}

/**
 * Represents two-dimensional fixed vector.
 * Has start dot.
 */
class Arrow {
  /**
   * @param {Dot} start
   * @param {Dot} end
   */
  constructor(start, end) {
    this.start = start
    this.end = end
  }
}