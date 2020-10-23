const zeros = n => increasing(n).map(n => 0)

/**
 * @param {number[][]} winMatrix 
 * @param {number} epsilon 
 */
function brownRobinson (winMatrix, epsilon) {
  let nRows = winMatrix.length
  let nColumns = winMatrix[0].length
  let nTimesStrategiesUsedByA = zeros(nRows)
  let nTimesStrategiesUsedByB = zeros(nColumns)
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
    if (minUpperCost - maxLowerCost <= epsilon) {
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
  let nRows = winMatrix.length
  let nColumns = winMatrix[0].length
  return increasing(nRows).map(i => {
    let sum = 0
    for (let j = 0; j < nColumns; ++j) {
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
  let nRows = winMatrix.length
  let nColumns = winMatrix[0].length
  return increasing(nColumns).map(i => {
    let sum = 0
    for (let j = 0; j < nRows; ++j) {
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