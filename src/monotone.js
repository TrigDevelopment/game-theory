

/**
 * @param {number} alphaN 
 * @param {number[]} previousxN 
 * @param {number[]} xtildaN 
 */
function getxN (alphaN, previousxN, xtildaN) {
  let xN = []
  for (let i = 0; i < previousxN.length; ++i) {
    xN[i] = (1 - alphaN) * previousxN[i] + alphaN * xtildaN[i]
  }
  return xN
}

/**
 * @param {number} alphaN 
 * @param {number[]} previouscN 
 * @param {number[]} ctildaN 
 */
function getcN (alphaN, previouscN, ctildaN) {
  let cN = []
  for (let i = 0; i < previouscN.length; ++i) {
    cN[i] = (1 - alphaN) * previouscN[i] + alphaN * ctildaN[i]
  }
  return cN
}

/**
 * @param {number[]} cN 
 */
function getJN (cN) {
  let min = Math.min(...cN)
  let minIndexes = []
  cN.forEach((w, i) => {
    if (delta(w, min) < 0.05) {
      minIndexes.push(i)
    }
  })
  return minIndexes
}

/**
 * @param {number[][]} winMatrix 
 * @param {number[]} previousJ 
 */
function getAN (winMatrix, previousJ) {
  let newMatrix = []
  winMatrix.forEach(row => {
    let newRow = []
    for (let i = 0; i < previousJ.length; ++i) {
      newRow.push(row[previousJ[i]])
    }
    newMatrix.push(newRow)
  })
  return newMatrix
}

/**
 * @param {number[][]} AN 
 */
function getxTildaN (AN) {
  let solution = brownRobinson(AN)
  return solution.aStrategy
}

/**
 * @param {number[][]} winMatrix 
 * @param {number[]} xTildaN 
 */
function getcTildaN (winMatrix, xTildaN) {
  let nColumns = winMatrix[0].length
  let result = zeros(nColumns)
  xTildaN.forEach((zeta, i) => {
    let row = winMatrix[i]
    for (let i = 0; i < nColumns; ++i) {
      result[i] += zeta * row[i]
    }
  })
  return result
}

/**
 * @param {number[]} previouscN 
 * @param {number[]} cTildaN 
 */
function getAlphaN (previouscN, cTildaN) {
  let solution = brownRobinson([previouscN, cTildaN])
  return solution.aStrategy[0]
}

/**
 * @typedef {Object} Iteration
 * @property {number[]} xN
 * @property {number[]} cN
 * @property {number[]} JN
 * @property {number[][]} AN
 * @property {number[]} xTildaN
 * @property {number[]} cTildaN
 * @property {number} alphaN
 */

/**
 * @param {number[][]} winMatrix 
 */
function main (winMatrix) {
  /** @type {Iteration[]} */
  let iterations = []

  let firstStrategy = 0
  let x0 = zeros(winMatrix.length)
  x0[firstStrategy] = 1
  let cN = winMatrix[firstStrategy]
  iterations[0] = {
    AN: [],
    xTildaN: [],
    cTildaN: [],
    alphaN: 1,
    xN: x0,
    cN,
    JN: getJN(cN)
  }

  for (let iterationI = 1;
    iterations[iterationI - 1].alphaN > 0.001 && iterationI < 100;
    ++iterationI) {
    let prevIteration = iterations[iterationI - 1]
    let AN = getAN(winMatrix, prevIteration.JN)
    let xTildaN = getxTildaN(AN)
    let cTildaN = getcTildaN(winMatrix, xTildaN)
    let alphaN = getAlphaN(prevIteration.cN, cTildaN)
    let xN = getxN(alphaN, prevIteration.xN, xTildaN)
    let cN = getcN(alphaN, prevIteration.cN, cTildaN)
    let JN = getJN(cN)
    /** @type {Iteration} */
    let iteration = { AN, xTildaN, cTildaN, alphaN, xN, cN, JN }
    iterations.push(iteration)
  }
  console.log(iterations)
}

const myWinMatrix2 = [
  [2, 1, 3],
  [3, 0, 1],
  [1, 2, 1]
]
const myWinMatrix = [
  [19, 7, 3],
  [6, 9, 9],
  [8, 2, 11]
]

main(myWinMatrix)