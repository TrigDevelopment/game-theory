import { DirectionEnum } from './DirectionEnum'

export default class Direction {
  /**
   * Create `Direction` from `direction`.\
   * Use `DirectionEnum` to specify direction
   * @param {DirectionEnum} direction
   */
  constructor(direction) {
    /** Value is from DirectionEnum */
    this.direction = direction
  }
  static newUp () {
    return new Direction(DirectionEnum.UP)
  }
  static newRight () {
    return new Direction(DirectionEnum.RIGHT)
  }
  static newDown () {
    return new Direction(DirectionEnum.DOWN)
  }
  static newLeft () {
    return new Direction(DirectionEnum.LEFT)
  }
  /**
   * Creates Direction from KeyboardEvent using arrow key direction
   * @param {KeyboardEvent} event
   */
  static createByArrow (event) {
    switch (event.keyCode) {
      case 37:
        return new Direction(DirectionEnum.LEFT)
      case 38:
        return new Direction(DirectionEnum.UP)
      case 39:
        return new Direction(DirectionEnum.RIGHT)
      case 40:
        return new Direction(DirectionEnum.DOWN)
    }
  }
  /**
   * Creates Direction from KeyboardEvent.
   * Creates left Direction for backspace, right Direction for delete
   * @param {KeyboardEvent} event
   */
  static createByBackspace (event) {
    switch (event.keyCode) {
      case 8:
        return new Direction(DirectionEnum.LEFT)
      case 46:
        return new Direction(DirectionEnum.RIGHT)
    }
  }
  /**
   * Returns lowercase string representation of direction
   */
  toString () {
    switch (this.direction) {
      case DirectionEnum.UP:
        return 'up'
      case DirectionEnum.RIGHT:
        return 'right'
      case DirectionEnum.DOWN:
        return 'down'
      case DirectionEnum.LEFT:
        return 'left'
    }
  }
  /**
   * Logs lowercase string representation of direction
   */
  log () {
    console.log(this.toString())
  }
  isVertical () {
    return this.isUp() || this.isDown()
  }
  isHorizontal () {
    return this.isLeft() || this.isRight()
  }
  /**
   * Returns new Direction which is inversed
   */
  inversed () {
    switch (this.direction) {
      case DirectionEnum.UP:
        return new Direction(DirectionEnum.DOWN)
      case DirectionEnum.RIGHT:
        return new Direction(DirectionEnum.LEFT)
      case DirectionEnum.DOWN:
        return new Direction(DirectionEnum.UP)
      case DirectionEnum.LEFT:
        return new Direction(DirectionEnum.RIGHT)
    }
  }
  isUp () {
    return this.direction === DirectionEnum.UP
  }
  isRight () {
    return this.direction === DirectionEnum.RIGHT
  }
  isDown () {
    return this.direction === DirectionEnum.DOWN
  }
  isLeft () {
    return this.direction === DirectionEnum.LEFT
  }
}
