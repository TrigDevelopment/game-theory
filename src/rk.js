import { arrInc } from './fun-js-lib/arr'
import Dot from './fun-js-lib/geometry/Dot'
import { mathGoldenAngle } from './fun-js-lib/math'

/**
 * @param {number} nSamples 
 */
export function fibonacciSphere (nSamples) {
  let phi = mathGoldenAngle
  return arrInc(nSamples).map(i => {
    let y = 1 - (i / (nSamples - 1)) * 2
    let radius = Math.sqrt(1 - y * y)
    let theta = phi * i // golden angle increment
    return new Dot({
      x: Math.cos(theta) * radius,
      y,
      z: Math.sin(theta) * radius
    })
  })
}