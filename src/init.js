function download (filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

/**
 * @param {number[][]} winMatrix 
 */
function brownRobinson (winMatrix) {
  let table = 'k;Выбор А;Выбор B;x1;x2;x3;y1;y2;y3;Верхняя цена уср.;Нижняя цена уср.;ε\n'
  let nTimesStrategiesUsedByA = [0, 0, 0]
  let nTimesStrategiesUsedByB = [0, 0, 0]
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
    let error = upperGameCost - lowerGameCost
    let epsilon = minUpperCost - maxLowerCost
    table += '' + k + ';'
      + aStrategy + ';' + bStrategy + ';'
      + printNumberArr(aWins) + ';' + printNumberArr(bLosses) + ';'
      + printNumber(upperGameCost) + ';' + printNumber(lowerGameCost) + ';'
      + printNumber(epsilon) + '\n'
    if (epsilon <= 0.1) {
      gameValue = (minUpperCost + maxLowerCost) / 2
      break
    }
  }

  let table2 = 'Номер стратегии:;0;1;2\n'
  let aStrategy = nTimesStrategiesUsedByA.map(n => n / k)
  table2 += 'Стратегия игрока А:;' + printNumberArr(aStrategy) + '\n'
  let bStrategy = nTimesStrategiesUsedByB.map(n => n / k)
  table2 += 'Стратегия игрока B:;' + printNumberArr(bStrategy) + '\n'
  let optimalA = [9 / 57, 44 / 57, 4 / 57]
  table2 += 'Отклонение от оптимальной стратегии А:;'
  for (let i = 0; i < 3; ++i) {
    table2 += printNumber(aStrategy[i] - optimalA[i]) +
      (i === 2 ? '\n' : ';')
  }
  let optimalB = [46 / 171, 2 / 9, 29 / 57]
  table2 += 'Отклонение от оптимальной стратегии B:;'
  for (let i = 0; i < 3; ++i) {
    table2 += printNumber(bStrategy[i] - optimalB[i]) +
      (i === 2 ? '\n' : ';')
  }
  //download('table.csv', table)
  //download('table2.csv', table2)
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
  return increasing(3).map(i =>
    winMatrix[i][0] * nTimesStrategiesUsedByB[0] +
    winMatrix[i][1] * nTimesStrategiesUsedByB[1] +
    winMatrix[i][2] * nTimesStrategiesUsedByB[2])
}

/**
 * @param {number[][]} winMatrix 
 * @param {number[]} nTimesStrategiesUsedByA 
 */
function playerBLosses (winMatrix, nTimesStrategiesUsedByA) {
  return increasing(3).map(i =>
    winMatrix[0][i] * nTimesStrategiesUsedByA[0] +
    winMatrix[1][i] * nTimesStrategiesUsedByA[1] +
    winMatrix[2][i] * nTimesStrategiesUsedByA[2])
}

/**
 * @param {number[]} nTimesStrategiesUsedByB 
 */
function getPlayerAStrategy (winMatrix, nTimesStrategiesUsedByB) {
  let wins = playerAWins(winMatrix, nTimesStrategiesUsedByB)
  return randPick(indexesOfMaxValues(wins))
}

/**
 * @param {number[]} nTimesStrategiesUsedByA 
 */
function getPlayerBStrategy (winMatrix, nTimesStrategiesUsedByA) {
  let losses = playerBLosses(winMatrix, nTimesStrategiesUsedByA)
  return randPick(indexesOfMinValues(losses))
}

/**
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
export function arrMax (arr, f) {
  return arr.reduce(
    (acc, el) => Math.max(acc, f(el)), f(arr[0]))
}

/**
 * @template T
 * @param {T[]} arr 
 * @param {(element: T) => number} f 
 */
export function arrMin (arr, f) {
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
 * @param {number[]} arr 
 */
function printNumberArr (arr) {
  let str = ''
  arr.forEach((n, i) => {
    str += '' + printNumber(n) + (i === arr.length - 1 ? '' : ';')
  })
  return str
}

/**
 * @param {number} n 
 */
function printNumber (n) {
  return n.toString().slice(0, 7).replace('.', ',')
}

const winMatrix1 = [
  [19, 7, 3],
  [6, 9, 9],
  [8, 2, 11]
]
//brownRobinson(winMatrix1)


/**
 * @param {number} x 
 * @param {number} y 
 */
function kernelFunction (x, y) {
  let a = -3
  let b = 3 / 2
  let c = 18 / 5
  let d = -18 / 50
  let e = -72 / 25
  return a * x * x + b * y * y + c * x * y + d * x + e * y
}

/**
 * @param {number[][]} winMatrix 
 */
function getSaddle (winMatrix) {
  let minsOfRows = []
  let maxesOfColumns = []

  let maxMinI = indexOfMax(minsOfRows)
  let minMaxI = indexOfMin(maxesOfColumns)

  if (minsOfRows[maxMinI] === maxesOfColumns[minMaxI]) {
    return {
      aStrategy: maxMinI,
      bStrategy: minMaxI
    }
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
    if (arr[i] > max) {
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
 * @param {number} matrixSize 
 */
function solve (matrixSize) {
  let winMatrix = getWinMatrix(matrixSize)
  let saddle = getSaddle(winMatrix)
  if (saddle === null) {
    return brownRobinson(winMatrix)
  } else {
    return {
      aStrategy: saddle.aStrategy,
      bStrategy: saddle.bStrategy,
      gameValue: winMatrix[saddle.aStrategy, saddle.bStrategy]
    }
  }
}

function main () {
  let output = ''
  for (let n = 2; n < 10; ++n) {
    output += solve(n)
  }
  console.log(output)
}

main()