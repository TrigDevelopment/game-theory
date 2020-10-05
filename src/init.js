const { download } = require('./download')

const winMatrix1 = [
  [19, 7, 3],
  [6, 9, 9],
  [8, 2, 11]
]

/**
 * @param {number[][]} winMatrix 
 */
export function brownRobinson (winMatrix) {
  let table = 'k;Выбор А;Выбор B;x1;x2;x3;y1;y2;y3;Верхняя цена уср.;Нижняя цена уср.;ε\n'
  let nTimesStrategiesUsedByA = [0, 0, 0]
  let nTimesStrategiesUsedByB = [0, 0, 0]
  let upperCosts = []
  let lowerCosts = []
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
      console.log(minUpperCost + (minUpperCost - maxLowerCost) / 2)
      break
    }
  }
  
  let table2 = 'Номер стратегии:;0;1;2\n'
  let aStrategies = nTimesStrategiesUsedByA.map(n => n / k)
  table2 += 'Стратегия игрока А:;' + printNumberArr(aStrategies) + '\n'
  let bStrategies = nTimesStrategiesUsedByB.map(n => n / k)
  table2 += 'Стратегия игрока B:;' + printNumberArr(bStrategies) + '\n'
  let optimalA = [9 / 57, 44 / 57, 4 / 57]
  table2 += 'Отклонение от оптимальной стратегии А:;'
  for (let i = 0; i < 3; ++i) {
    table2 += printNumber(aStrategies[i] - optimalA[i]) + 
      (i === 2 ? '\n' : ';')
  }
  let optimalB = [46 / 171, 2 / 9, 29 / 57]
  table2 += 'Отклонение от оптимальной стратегии B:;'
  for (let i = 0; i < 3; ++i) {
    table2 += printNumber(bStrategies[i] - optimalB[i]) + 
      (i === 2 ? '\n' : ';')
  }
  download('table.csv', table)
  download('table2.csv', table2)
  return {
    aStrategy: aStrategies,
    bStrategy: bStrategies
  }
}

/**
 * @param {number[][]} winMatrix 
 * @param {number[]} nTimesStrategiesUsedByB 
 */
function playerAWins (winMatrix, nTimesStrategiesUsedByB) {
  return increasing(3).map(i =>
    winMatrix1[i][0] * nTimesStrategiesUsedByB[0] +
    winMatrix1[i][1] * nTimesStrategiesUsedByB[1] +
    winMatrix1[i][2] * nTimesStrategiesUsedByB[2])
}

/**
 * @param {number[][]} winMatrix 
 * @param {number[]} nTimesStrategiesUsedByA 
 */
function playerBLosses (winMatrix, nTimesStrategiesUsedByA) {
  return increasing(3).map(i =>
    winMatrix1[0][i] * nTimesStrategiesUsedByA[0] +
    winMatrix1[1][i] * nTimesStrategiesUsedByA[1] +
    winMatrix1[2][i] * nTimesStrategiesUsedByA[2])
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
function arrMax (arr, f) {
  return arr.reduce(
    (acc, el) => Math.max(acc, f(el)), f(arr[0]))
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

brownRobinson(winMatrix1)