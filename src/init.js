const winMatrix = [
  [19, 7, 3],
  [6, 9, 9],
  [8, 2, 11]
]

function main () {
  let nTimesStrategiesUsedByA = [0, 0, 0]
  let nTimesStrategiesUsedByB = [0, 0, 0]
  for (let i = 0; i < 1200; ++i) {
    let aStrategy = getPlayerAStrategy(nTimesStrategiesUsedByB)
    let bStrategy = getPlayerBStrategy(nTimesStrategiesUsedByA)
    ++nTimesStrategiesUsedByA[aStrategy]
    ++nTimesStrategiesUsedByB[bStrategy]
    let aWins = playerAWins(nTimesStrategiesUsedByB)
    let bLosses = playerBLosses(nTimesStrategiesUsedByA)
    let upperGameCost = arrMax(aWins, n => n) / (i + 1)
    let lowerGameCost = -arrMax(bLosses, n => -n) / (i + 1)
    console.log(playerAWins(nTimesStrategiesUsedByB))
    console.log(playerBLosses(nTimesStrategiesUsedByA))
    console.log(upperGameCost)
    console.log(lowerGameCost)
  }
}

/**
 * @param {number[]} nTimesStrategiesUsedByB 
 */
function playerAWins (nTimesStrategiesUsedByB) {
  return increasing(3).map(i =>
    winMatrix[i][0] * nTimesStrategiesUsedByB[0] +
    winMatrix[i][1] * nTimesStrategiesUsedByB[1] +
    winMatrix[i][2] * nTimesStrategiesUsedByB[2])
}

/**
 * @param {number[]} nTimesStrategiesUsedByA 
 */
function playerBLosses (nTimesStrategiesUsedByA) {
  return increasing(3).map(i =>
    winMatrix[0][i] * nTimesStrategiesUsedByA[0] +
    winMatrix[1][i] * nTimesStrategiesUsedByA[1] +
    winMatrix[2][i] * nTimesStrategiesUsedByA[2])
}

/**
 * @param {number[]} nTimesStrategiesUsedByB 
 */
function getPlayerAStrategy (nTimesStrategiesUsedByB) {
  let wins = playerAWins(nTimesStrategiesUsedByB)
  return indexOfBiggest(wins)
}

/**
 * @param {number[]} nTimesStrategiesUsedByA 
 */
function getPlayerBStrategy (nTimesStrategiesUsedByA) {
  let losses = playerBLosses(nTimesStrategiesUsedByA)
  return indexOfSmallest(losses)
}

function indexOfSmallest (a) {
  var lowest = 0
  for (var i = 1; i < a.length; i++) {
    if (a[i] < a[lowest]) lowest = i
  }
  return lowest
}

function indexOfBiggest (a) {
  var biggestI = 0
  for (var i = 1; i < a.length; i++) {
    if (a[i] > a[biggestI]) biggestI = i
  }
  return biggestI
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

main()