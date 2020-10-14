function download (filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

const params = {
  a: -6,
  b: 32 / 5,
  c: 16,
  d: -16 / 5,
  e: -64 / 5
}

const zeros = n => increasing(n).map(n => 0)

/**
 * @param {number[][]} winMatrix 
 */
function brownRobinson (winMatrix) {
  let size = winMatrix.length
  let nTimesStrategiesUsedByA = zeros(size)
  let nTimesStrategiesUsedByB = zeros(size)
  let upperCosts = []
  let lowerCosts = []
  let gameValue = 0
  let k = 1
  for (; true; ++k) {
    let aStrategy = getPlayerAStrategy(winMatrix, nTimesStrategiesUsedByB)
    let bStrategy = getPlayerBStrategy(winMatrix, nTimesStrategiesUsedByA)
    ++nTimesStrategiesUsedByA[aStrategy]
    ++nTimesStrategiesUsedByB[bStrategy]
    let aWins = playerAWins(winMatrix, nTimesStrategiesUsedByB)
    let bLosses = playerBLosses(winMatrix, nTimesStrategiesUsedByA)
    let upperGameCost = arrMax(aWins, n => n) / k
    let lowerGameCost = -arrMax(bLosses, n => -n) / k
    upperCosts.push(upperGameCost)
    lowerCosts.push(lowerGameCost)
    let minUpperCost = Math.min(...upperCosts)
    let maxLowerCost = Math.max(...lowerCosts)
    let epsilon = minUpperCost - maxLowerCost
    if (epsilon <= 0.01) {
      gameValue = (minUpperCost + maxLowerCost) / 2
      break
    }
  }

  let aStrategy = nTimesStrategiesUsedByA.map(n => n / k)
  let bStrategy = nTimesStrategiesUsedByB.map(n => n / k)
  return {
    aStrategy,
    bStrategy,
    gameValue
  }
}

/**
 * @param {number[][]} winMatrix 
 * @param {number[]} nTimesStrategiesUsedByB 
 */
function playerAWins (winMatrix, nTimesStrategiesUsedByB) {
  let size = winMatrix.length
  return increasing(size).map(i => {
    let sum = 0
    for (let j = 0; j < size; ++j) {
      sum += winMatrix[i][j] * nTimesStrategiesUsedByB[j]
    }
    return sum
  })
}

/**
 * @param {number[][]} winMatrix 
 * @param {number[]} nTimesStrategiesUsedByA 
 */
function playerBLosses (winMatrix, nTimesStrategiesUsedByA) {
  let size = winMatrix.length
  return increasing(size).map(i => {
    let sum = 0
    for (let j = 0; j < size; ++j) {
      sum += winMatrix[j][i] * nTimesStrategiesUsedByA[j]
    }
    return sum
  })
}

/**
 * @param {number[][]} winMatrix 
 * @param {number[]} nTimesStrategiesUsedByB 
 */
function getPlayerAStrategy (winMatrix, nTimesStrategiesUsedByB) {
  let wins = playerAWins(winMatrix, nTimesStrategiesUsedByB)
  return randPick(indexesOfMaxValues(wins))
}

/**
 * @param {number[][]} winMatrix 
 * @param {number[]} nTimesStrategiesUsedByA 
 */
function getPlayerBStrategy (winMatrix, nTimesStrategiesUsedByA) {
  let losses = playerBLosses(winMatrix, nTimesStrategiesUsedByA)
  return randPick(indexesOfMinValues(losses))
}

/**
 * Returns indexes of all elements that has max value
 * @param {number[]} arr 
 */
function indexesOfMaxValues (arr) {
  let max = Math.max(...arr)
  let maxIndexes = []
  arr.forEach((w, i) => {
    if (w === max) {
      maxIndexes.push(i)
    }
  })
  return maxIndexes
}

/**
 * Returns indexes of all elements that has min value
 * @param {number[]} arr 
 */
function indexesOfMinValues (arr) {
  let min = Math.min(...arr)
  let minIndexes = []
  arr.forEach((w, i) => {
    if (w === min) {
      minIndexes.push(i)
    }
  })
  return minIndexes
}

/**
 * returns [0,1,2,...,n-1]
 * @param {number} n 
 */
function increasing (n) {
  let arr = []
  for (var i = 0; i < n; ++i) {
    arr.push(i)
  }
  return arr
}

/**
 * @template T
 * @param {T[]} arr 
 * @param {(element: T) => number} f 
 */
function arrMax (arr, f) {
  return arr.reduce(
    (acc, el) => Math.max(acc, f(el)), f(arr[0]))
}

/**
 * @template T
 * @param {T[]} arr 
 * @param {(element: T) => number} f 
 */
function arrMin (arr, f) {
  return arr.reduce(
    (acc, el) => Math.min(acc, f(el)), f(arr[0]))
}

/**
 * @param {number} min
 * @param {number} max
 */
function randInt (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min))
}

/**
 * Returns random element from given [arr]
 * @param {any[]} arr 
 */
function randPick (arr) {
  return arr[randInt(0, arr.length - 1)]
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

function matrixColumns (matrix) {
  let columns = []
  let nRows = matrix.length
  let nColumns = matrix[0].length
  for (let i = 0; i < nColumns; ++i) {
    columns[i] = []
    for (let j = 0; j < nRows; ++j) {
      columns[i].push(matrix[j][i])
    }
  }
  return columns
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

function indexOfMax (arr) {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}

function indexOfMin (arr) {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}

/**
 * @param {number} matrixSize 
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
 */
function solveNumerical (winMatrix) {
  let saddle = getSaddle(winMatrix)
  if (saddle === null) {
    let solution = brownRobinson(winMatrix)
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

function matrixPrint (matrix) {
  let s = ''
  matrix.map(row => {
    row.map(n => s += ('' + n + '     ').substring(0, 6) + ' ')
    s += '\n'
  })
  return s
}

function solveAnalytically () {
  let first = `x=-(${params.c}y+${params.d})/(2*${params.a})`
  let second = `y=-(${params.c}x+${params.e})/(2*${params.b})`
  var solution = nerdamer.solveEquations([first, second])
  console.log(solution)
  let x = solution[0][1]
  let y = solution[1][1]
  let gameValue = kernelFunction(x, y)
  console.log(gameValue)
}

/**
 * @param {number[]} arr 
 */
function arrSum (arr) {
  return arr.reduce((acc, n) => acc + n)
}

/**
 * @param {number[]} arr 
 */
function arrMean (arr) {
  return arrSum(arr) / arr.length
}

/**
 * Removes element with given [i]
 * @param {any[]} arr 
 * @param {number} i
 */
function arrRemoveI (arr, i) {
  arr.splice(i, 1)
}

function main () {
  let lastGameValues = []
  let output = ''
  for (let matrixSize = 2; matrixSize < 12000; ++matrixSize) {
    let winMatrix = getWinMatrix(matrixSize)
    output += '*'.repeat(40) + '\n'
    output += 'Размер матрицы: ' + matrixSize + '. Матрица выигрышей:' + '\n'
    output += matrixPrint(winMatrix)
    let solution = solveNumerical(winMatrix)
    output += solution.isSaddle ?
      'Найдено седло.' : 'Седло не найдено. Решение методом Брауна-Робинсон'
    output += '\nx=' + solution.aStrategy / (matrixSize - 1)
    output += '\ny=' + solution.bStrategy / (matrixSize - 1)
    output += '\nH=' + solution.gameValue + '\n'
    if (matrixSize > 5 && Math.abs(arrMean(lastGameValues) - solution.gameValue) < 0.01) {
      break
    } else {
      lastGameValues.push(solution.gameValue)
      if (lastGameValues.length > 3) {
        arrRemoveI(lastGameValues, 0)
      }
    }
  }
  download('out.txt', output)
}

main()