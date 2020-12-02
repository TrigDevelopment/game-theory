let canvasBox = new Box(6400, 1200)
let canvas = document.body.appendChild(document.createElement('canvas'))
canvas.width = canvasBox.w
canvas.height = canvasBox.h
let context = canvas.getContext('2d')
context.font = '32px Arial'
let root = generateGameTree(7, 42)
let nodes = treeLevelsNodes(root)
  .filter(node => !isLeaf(node))
  .reverse()
nodes.forEach(reverseInduction)
markFromRoot(root)
drawTree(root, context, canvasBox)

/**
 * @param {GameNode} node 
 */
function reverseInduction (node) {
  if (isLeaf(node)) {
    node.optimalWins[0].wayId = Math.random()
  } else {
    let leftWins = node.children[0].optimalWins
    let rightWins = node.children[1].optimalWins
    let leftMin = arrMin(leftWins, win => win.values[playerI(node)])
    let rightMin = arrMin(rightWins, win => win.values[playerI(node)])
    if (leftMin > rightMin) {
      node.optimalWins = arrShallowCopy(leftWins)
    } else if (leftMin < rightMin) {
      node.optimalWins = arrShallowCopy(rightWins)
    } else {
      node.optimalWins = leftWins.concat(rightWins)
    }
  }
}

/**
 * @param {GameNode} node 
 */
function playerI (node) {
  const nPlayers = 2
  return (node.depth + 1) % nPlayers
}

/**
 * Отмечает пути, которые исходят из корня
 * @param {GameNode} root 
 */
function markFromRoot (root) {
  let toProceed = [root]
  while (!arrEmpty(toProceed)) {
    let node = toProceed[0]
    node.isFromRoot = true

    // Добавляем в массив вершин для обработки те дочерние вершины,
    // через которые проходит путь, исходящий из корня
    let childrenToProceed =
      node.children.filter(child =>
        arrSome(child.optimalWins, childWin =>
          arrSome(node.optimalWins, nodeWin =>
            childWin.wayId === nodeWin.wayId)))
    arrAppend(toProceed, childrenToProceed)
    arrRemoveI(toProceed, 0)
  }
}