const nInfoPlayers = 10
let matrix = generateStochasticMatrix(nInfoPlayers)
console.log(matrix)
let log = ''
log += matrixToString(matrix)
const initOpinions = randIntArr(1, 20, nInfoPlayers)
log += '\nИсходные мнения агентов:\n'
log += vectorToString(initOpinions)

let noAgentsFinishOpinions = getFinishOpinions(matrix, initOpinions)
log += '\nИтоговое мнение агентов (случай без агентов влияния):\n'
log += vectorToString(noAgentsFinishOpinions)
console.log(noAgentsFinishOpinions)

let nFirstAgents = randInt(2, 3)
let nSecondAgents = randInt(2, 3)

let allIndexes = arrIndexes(initOpinions, _ => true)
let firstAgents = randPickMany(allIndexes, nFirstAgents).sort()
let secondAgents = randPickMany(arrExcept(allIndexes, firstAgents), nSecondAgents).sort()
log += 'Агенты первого игрока: ' + vectorToString(firstAgents)
log += 'Агенты второго игрока: ' + vectorToString(secondAgents)

let firstOpinion = randInt(1, 99)
let secondOpinion = randInt(1, 99)
log += '\nВлияние первого игрока: ' + firstOpinion
log += '\nВлияние второго игрока: ' + secondOpinion + '\n'
console.log('Влияние первого игрока: ' + firstOpinion)
console.log('Влияние второго игрока: ' + secondOpinion)

let withAgentsOpinions = initOpinions.map((opinion, i) => {
  if (arrHas(firstAgents, i)) {
    return firstOpinion
  } else if (arrHas(secondAgents, i)) {
    return secondOpinion
  } else {
    return opinion
  }
})
let withAgentsFinishOpinions = getFinishOpinions(matrix, withAgentsOpinions)
log += '\nИтоговое мнение агентов (случай с агентами влияния):\n'
log += vectorToString(withAgentsFinishOpinions)
console.log(withAgentsFinishOpinions)

download('out.txt', log)

/**
 * Возвращает итоговые мнения агентов
 * @param {number[][]} matrix 
 * @param {number[]} initialOpinions 
 */
function getFinishOpinions (matrix, initialOpinions) {
  let currentOpinions = arrShallowCopy(initialOpinions)
  const epsilon = Math.pow(10, -6)
  while (arrDeviationSum(currentOpinions) > epsilon) {
    currentOpinions = getNextOpinions(matrix, currentOpinions)
  }
  return currentOpinions
}

/**
 * Создаёт стохастическую матрицу
 * @param {number} nPlayers 
 */
function generateStochasticMatrix (nPlayers) {
  return arrInc(nPlayers).map(_ =>
    generateStochasticRow(nPlayers))
}

/**
 * Создаёт случайную строку стохастической по строкам матрицы
 * @param {number} nPlayers 
 */
function generateStochasticRow (nPlayers) {
  let delimiters = arrInc(nPlayers - 1).map(Math.random)
    .concat([1]).sort()
  return delimiters.map((delimiter, i) =>
    i === 0 ? delimiter : delimiter - delimiters[i - 1])
}

/**
 * Возвращает мнения агентов на следующем шаге
 * @param {number[][]} matrix 
 * @param {number[]} opinions 
 */
function getNextOpinions (matrix, opinions) {
  return arrInc(opinions.length).map(i =>
    arrSum(opinions.map((opinion, j) => matrix[i][j] * opinion)))
}