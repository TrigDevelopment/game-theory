import Dot from './Dot'

/**
 * Represents coordinate system
 */
export default class CoordinateSystem {
  /**
   * @param {Dot} oDot
   * @param {Dot[]} basisVectors
   */
  constructor(oDot, basisVectors) {
    /** Start dot of coordinate system */
    this.oDot = oDot
    this.basisVectors = basisVectors
  }
}