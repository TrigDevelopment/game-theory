const nPlayers = 4

/**
 * @param {boolean[]} coalition 
 */
function myCharacteristicFunction (coalition) {
  let coalitionI = arrSum(coalition.map((b, i) => b ? Math.pow(2, i) : 0))
  let initValues = [0, 3, 3, 7, 1, 6, 4, 10, 2, 7, 7, 10, 3, 9, 7, 12]
  let fixdValues = [0, 3, 3, 7, 1, 6, 4, 10, 2, 7, 7, 10, 3, 9, 8, 13]
  return fixdValues[coalitionI]
}

console.log('Супераддитивность ' + checkIsSuperAdditive(myCharacteristicFunction).condition)
console.log('Выпуклость ' + checkIsBulb(myCharacteristicFunction).condition)
console.log('Вектор Шепли: ')
let sheplyVector = getSheplyVector(myCharacteristicFunction)
console.log(sheplyVector)
console.log('Условие групповой рационализации: '
  + isGroupRational(myCharacteristicFunction, sheplyVector))
console.log('Условие индивидуальной рационализации: '
  + isIndividualRational(myCharacteristicFunction, sheplyVector))

download('out.txt', checkIsBulb(myCharacteristicFunction).log)

/**
 * @param {boolean[]} coalition 
 */
function coalitionToString (coalition) {
  let playerIndexes = arrIndexes(coalition, x => x).map(x => x + 1)
  if (playerIndexes.length === 0) {
    return '∅'
  } else {
    return playerIndexes.toString()
  }
}

/**
 * @param {(coalition: boolean[]) => number} characteristicF
 */
function checkIsSuperAdditive (characteristicF) {
  let notIntersectingPairs =
    arrCrossProduct(allCoalitions(nPlayers), allCoalitions(nPlayers))
      .filter(pair => !isIntersect(pair[0], pair[1]))
  let log = ''
  let isSuperAdditive = arrAll(notIntersectingPairs,
    ([coalition1, coalition2]) => {
      let union = getUnion(coalition1, coalition2)
      let condition = characteristicF(union) >=
        characteristicF(coalition1) + characteristicF(coalition2)
      log += 'Первая: ' + coalitionToString(coalition1) + '\n'
      log += 'Вторая: ' + coalitionToString(coalition2) + '\n'
      log += `${characteristicF(union)} ≥ ${characteristicF(coalition1)} + ${characteristicF(coalition2)}\n`
      log += condition ? 'Выполнено\n\n' : 'Не выполнено\n\n'
      return condition
    })
  return {
    condition: isSuperAdditive,
    log
  }
}

/**
 * @param {(coalition: boolean[]) => number} characteristicF
 */
function checkIsBulb (characteristicF) {
  let log = ''
  let condition = arrAll(arrCrossProduct(allCoalitions(nPlayers), allCoalitions(nPlayers)),
    ([coalition1, coalition2]) => {
      let union = getUnion(coalition1, coalition2)
      let intersect = intersection(coalition1, coalition2)
      let bulb = characteristicF(union) + characteristicF(intersect)
        >= characteristicF(coalition1) + characteristicF(coalition2)
      log += 'Первая: ' + coalitionToString(coalition1) + '\n'
      log += 'Вторая: ' + coalitionToString(coalition2) + '\n'
      log += `${characteristicF(union)} + ${characteristicF(intersect)} ≥ ${characteristicF(coalition1)} + ${characteristicF(coalition2)}\n`
      log += bulb ? 'Выполнено\n\n' : 'Не выполнено\n\n'
      return bulb
    })
  return {
    condition,
    log
  }
}

/**
 * @param {(coalition: boolean[]) => number} characteristicF
 */
function getSheplyVector (characteristicF) {
  return arrInc(nPlayers).map(playerI => {
    let coalitionsWithPlayer = allCoalitions(nPlayers).filter(coalition =>
      hasPlayer(coalition, playerI))
    let bigSum = arrSum(coalitionsWithPlayer
      .map(coalition =>
        mathFactorial(nPlayersInCoalition(coalition) - 1)
        * mathFactorial(nPlayers - nPlayersInCoalition(coalition))
        * (characteristicF(coalition) - characteristicF(coalitionWithoutPlayer(coalition, playerI)))
      ))
    return bigSum / mathFactorial(nPlayers)
  })
}

/**
 * @param {(coalition: boolean[]) => number} characteristicF
 * @param {number[]} sheplyVector
 */
function isGroupRational (characteristicF, sheplyVector) {
  let left = arrSum(sheplyVector)
  let right = characteristicF(totalCoalition(nPlayers))
  let epsilon = Math.pow(10, -8)
  return delta(left, right) < epsilon
}

/**
 * @param {(coalition: boolean[]) => number} characteristicF
 * @param {number[]} sheplyVector
 */
function isIndividualRational (characteristicF, sheplyVector) {
  return arrAll(sheplyVector.map((x, i) =>
    x >= characteristicF(coalitionWithOnePlayer(i))),
    b => b)
}

/**
 * @template T
 * @param {T[][]} arrays 
 */
function arrConcat (arrays) {
  return arrays.reduce((acc, cur) => acc.concat(cur), [])
}

/**
 * @template T
 * @param {T[]} arr1 
 * @param {T[]} arr2 
 */
function arrCrossProduct (arr1, arr2) {
  return arrConcat(arr1.map(a => arr2.map(b => [a, b])))
}

/**
 * @param {number} nPlayers
 * @returns {boolean[][]}
 */
function allCoalitions (nPlayers) {
  if (nPlayers === 0) {
    return [[]]
  } else {
    let prev = allCoalitions(nPlayers - 1)
    return prev.map(coalition => coalition.concat([false]))
      .concat(prev.map(coalition => coalition.concat([true])))
  }
}

/**
 * @param {boolean[]} coalition1 
 * @param {boolean[]} coalition2 
 */
function isIntersect (coalition1, coalition2) {
  return arrSome(arrZip(coalition1, coalition2),
    pair => pair[0] && pair[1])
}

/**
 * @template T
 * @param {T[]} arr1 
 * @param {T[]} arr2 
 */
function arrZip (arr1, arr2) {
  return arr1.map((a, i) => [a, arr2[i]])
}

/**
 * @param {boolean[]} coalition1 
 * @param {boolean[]} coalition2 
 */
function getUnion (coalition1, coalition2) {
  return arrZip(coalition1, coalition2).map(pair => pair[0] || pair[1])
}

/**
 * @param {boolean[]} coalition1 
 * @param {boolean[]} coalition2 
 */
function intersection (coalition1, coalition2) {
  return arrZip(coalition1, coalition2).map(pair => pair[0] && pair[1])
}

/**
 * @param {boolean[]} coalition 
 * @param {number} playerI 
 */
function hasPlayer (coalition, playerI) {
  return coalition[playerI]
}

/**
 * @param {number} nPlayers 
 */
function totalCoalition (nPlayers) {
  return arrInc(nPlayers).map(_ => true)
}

/**
 * @param {number} playerI 
 */
function coalitionWithOnePlayer (playerI) {
  return arrInc(nPlayers).map(i => i === playerI)
}

/**
 * @param {boolean[]} coalition 
 */
function nPlayersInCoalition (coalition) {
  return coalition.filter(b => b).length
}

/**
 * @param {boolean[]} coalition 
 * @param {number} playerI 
 */
function coalitionWithoutPlayer (coalition, playerI) {
  let newCoalition = arrShallowCopy(coalition)
  newCoalition[playerI] = false
  return newCoalition
}