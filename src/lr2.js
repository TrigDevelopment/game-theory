const params = {
  a: -6,
  b: 32 / 5,
  c: 16,
  d: -16 / 5,
  e: -64 / 5
}

/**
 * @param {number} x 
 * @param {number} y 
 */
function kernelFunction (x, y) {
  return params.a * x * x
    + params.b * y * y
    + params.c * x * y
    + params.d * x
    + params.e * y
}

/**
 * @param {number[][]} winMatrix 
 */
function getSaddle (winMatrix) {
  let minsOfRows = winMatrix.map(row =>
    arrMin(row, x => x))
  let maxesOfColumns = matrixColumns(winMatrix)
    .map(column => arrMax(column, x => x))

  let maxMinI = indexOfMax(minsOfRows)
  let minMaxI = indexOfMin(maxesOfColumns)

  if (minsOfRows[maxMinI] === maxesOfColumns[minMaxI]) {
    return {
      aStrategy: maxMinI,
      bStrategy: minMaxI
    }
  } else {
    return null
  }
}

/**
 * @param {number} matrixSize 
 * @returns {number[][]}
 */
function getWinMatrix (matrixSize) {
  let matrix = []
  for (let i = 0; i < matrixSize; ++i) {
    matrix[i] = []
    for (let j = 0; j < matrixSize; ++j) {
      matrix[i][j] = kernelFunction(i / (matrixSize - 1), j / (matrixSize - 1))
    }
  }
  return matrix
}

/**
 * @param {number[][]} winMatrix 
 * @param {number} brownRobinsonEpsilon 
 */
function solveNumerical (winMatrix, brownRobinsonEpsilon) {
  let saddle = getSaddle(winMatrix)
  if (saddle === null) {
    let solution = brownRobinson(winMatrix, brownRobinsonEpsilon)
    return {
      isSaddle: false,
      aStrategy: indexOfMax(solution.aStrategy),
      bStrategy: indexOfMax(solution.bStrategy),
      gameValue: solution.gameValue
    }
  } else {
    return {
      isSaddle: true,
      aStrategy: saddle.aStrategy,
      bStrategy: saddle.bStrategy,
      gameValue: winMatrix[saddle.aStrategy][saddle.bStrategy]
    }
  }
}

function solveAnalytically () {
  let first = `x=-(${params.c}y+${params.d})/(2*${params.a})`
  let second = `y=-(${params.c}x+${params.e})/(2*${params.b})`
  // @ts-ignore
  let solution = nerdamer.solveEquations([first, second])
  console.log(solution)
  let x = solution[0][1]
  let y = solution[1][1]
  let gameValue = kernelFunction(x, y)
  console.log(gameValue)
}

/**
 * @typedef {Object} PureSolution
 * @property {number} aStrategy
 * @property {number} bStrategy
 * @property {number} gameValue
 */

/**
 * Returns sum of `f(x)` on every element of `arr`
 * @template T
 * @param {T[]} arr 
 * @param {(element: T) => number} f
 */
function arrSumF (arr, f) {
  return arr.reduce(
    (acc, el) => acc + f(el), 0)
}

const nLastSolutionsInStopCriteria = 5

/**
 * Returns true if algorithm has to stop
 * @param {PureSolution[]} lastGameSolutions 
 * @param {number} matrixSize
 * @param {number} epsilon
 */
function stopCriteria (lastGameSolutions, matrixSize, epsilon) {
  if (lastGameSolutions.length === nLastSolutionsInStopCriteria) {
    let aStrategies = lastGameSolutions.map(solution => solution.aStrategy / (matrixSize - 1))
    let bStrategies = lastGameSolutions.map(solution => solution.bStrategy / (matrixSize - 1))
    let gameValues = lastGameSolutions.map(solution => solution.gameValue)

    return arrDeviationSum(aStrategies) < epsilon
      && arrDeviationSum(bStrategies) < epsilon
      && arrDeviationSum(gameValues) < epsilon
  } else {
    return false
  }
}

/**
 * Returns string that represents one iteration of algorithm
 * @param {number[][]} winMatrix 
 */
function iterationToString (winMatrix, solution) {
  let str = '*'.repeat(40) + '\n'
  str += 'Размер матрицы: ' + winMatrix.length + '. Матрица выигрышей:' + '\n'
  str += matrixToString(winMatrix)
  str += solution.isSaddle ?
    'Найдено седло.' : 'Седло не найдено. Решение методом Брауна-Робинсон'
  str += '\nx=' + solution.aStrategy / (winMatrix.length - 1)
  str += '\ny=' + solution.bStrategy / (winMatrix.length - 1)
  str += '\nH=' + solution.gameValue + '\n'
  return str
}

function main () {
  let lastSolutions = []
  let output = ''
  let matrixSize = 2
  const stopCriteriaEpsilon = 0.1
  const brownRobinsonEpsilon = 0.01
  while (!stopCriteria(lastSolutions, matrixSize, stopCriteriaEpsilon)) {
    let winMatrix = getWinMatrix(matrixSize)
    let solution = solveNumerical(winMatrix, brownRobinsonEpsilon)
    output += iterationToString(winMatrix, solution)
    lastSolutions.push(solution)
    if (lastSolutions.length > nLastSolutionsInStopCriteria) {
      arrRemoveI(lastSolutions, 0)
    }
    ++matrixSize
  }
  download('out.txt', output)
}

main()
solveAnalytically()