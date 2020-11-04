/**
 * @param {number[][]} aWins 
 * @param {number[][]} bWins 
 * @param {number} rowI 
 * @param {number} columnI 
 */
function isNashEquilibrium (aWins, bWins, rowI, columnI) {
  let aColumn = matrixColumns(aWins)[columnI]
  let bRow = bWins[rowI]
  return arrAll(aColumn, x => x <= aWins[rowI][columnI])
    && arrAll(bRow, y => y <= bWins[rowI][columnI])
}

/**
 * @param {number[][]} aWins 
 * @param {number[][]} bWins 
 * @param {number} rowI 
 * @param {number} columnI 
 */
function isParetoEfficient (aWins, bWins, rowI, columnI) {
  let nRows = aWins.length
  let nColumns = aWins[0].length
  return arrAll(increasing(nRows), r =>
    arrAll(increasing(nColumns), c =>
      aWins[r][c] < aWins[rowI][columnI]
      || bWins[r][c] < bWins[rowI][columnI]
      || (r === rowI && c === columnI)
    ))
}

/**
 * @param {number[][]} aWins 
 * @param {number[][]} bWins 
 */
function biMatrixToString (aWins, bWins) {
  let nRows = aWins.length
  let nColumns = aWins[0].length
  let str = ''
  increasing(nRows).forEach(rowI => {
    increasing(nColumns).forEach(columnI => {
      let nash = isNashEquilibrium(aWins, bWins, rowI, columnI) ? 'N' : ''
      let pareto = isParetoEfficient(aWins, bWins, rowI, columnI) ? 'P' : ''
      let a = ('' + aWins[rowI][columnI]).padStart(2)
      let b = ('' + bWins[rowI][columnI]).padStart(2)
      str += (nash + pareto + `(${a},${b}) `).padStart(10)
    })
    str += '\n'
  })
  return str
}

function tenSized () {
  const aWins = randIntSquareMatrix(1, 50, 10)
  const bWins = randIntSquareMatrix(1, 50, 10)
  return biMatrixToString(aWins, bWins)
}

function crossRoad () {
  const aWins = [[1, 0.99], [2, 0]]
  const bWins = [[1, 2], [0.99, 0]]
  return 'Перекрёсток:\n' + biMatrixToString(aWins, bWins)
}

function family () {
  const aWins = [[4, 0], [0, 1]]
  const bWins = [[1, 0], [0, 4]]
  return 'Семейный спор:\n' + biMatrixToString(aWins, bWins)
}

function prisonerDilemma () {
  const aWins = [[-5, 0], [-10, -1]]
  const bWins = [[-5, -10], [0, -1]]
  return 'Дилемма заключённого:\n' + biMatrixToString(aWins, bWins)
}

function twoSized () {
  const aWins = [[5, 10], [8, 6]]
  const bWins = [[1, 4], [6, 9]]
  return '2x2:\n' + biMatrixToString(aWins, bWins)
}

function mixedNash () {
  const aWins = [[5, 10.001], [8, 6]]
  const bWins = [[1, 4.001], [6, 9]]
  const aInverse = math.inv(aWins)
  const bInverse = math.inv(bWins)
  console.log(bInverse)
  let v1 = 1 / arrSumF(aInverse, row => arrSum(row))
  let v2 = 1 / arrSumF(bInverse, row => arrSum(row))
  let x = [bInverse[0][0] + bInverse[1][0], bInverse[0][1] + bInverse[1][1]]
    .map(n => n * v2)
  let y = [aInverse[0][0] + aInverse[0][1], aInverse[1][0] + aInverse[1][1]]
    .map(n => n * v1)
  return { v1, v2, x, y }
}

let output = tenSized() + '\n' +
  crossRoad() + '\n' +
  family() + '\n' +
  prisonerDilemma() + '\n' +
  twoSized() + '\n'
console.log(mixedNash())
download('output.txt', output)



