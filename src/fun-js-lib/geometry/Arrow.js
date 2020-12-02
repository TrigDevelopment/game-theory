import Dot from './Dot'

/**
 * Represents two-dimensional fixed vector.
 * Has start dot.
 */
export default class Arrow {
  /**
   * @param {Object} args
   * @param {Dot} args.start
   * @param {Dot} args.end
   */
  constructor(args) {
    this.start = args.start
    this.end = args.end
  }
}