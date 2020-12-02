import { arrInc, arrProduct } from './arr'

/**
 * @param {number} n 
 */
export function mathFactorial (n) {
  return n === 0 ? 1 : arrProduct(arrInc(n).map(x => x + 1))
}

/**
 * @param {number} a 
 * @param {number} b 
 */
export function mathDelta (a, b) {
  return Math.abs(a - b)
}

/**
 * Returns golden angle in radians
 */
export const mathGoldenAngle = Math.PI * (3 - Math.sqrt(5))