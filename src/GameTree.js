class GameNode {
  /**
   * @param {OptimalWin[]} optimalWins 
   * @param {GameNode} parent 
   * @param {number} childI 
   * @param {GameNode[]} children 
   * @param {number} depth 
   */
  constructor (optimalWins, parent, childI, children, depth) {
    this.optimalWins = optimalWins
    this.parent = parent
    this.childI = childI
    this.children = children
    this.depth = depth
    this.isFromRoot = false
  }
  /**
   * @param {Object} args 
   * @param {OptimalWin[]} args.optimalWins 
   * @param {GameNode} args.parent 
   * @param {number} args.childI 
   * @param {GameNode[]} args.children 
   * @param {number} args.depth 
   */
  static byNamed (args) {
    return new GameNode(args.optimalWins, args.parent, args.childI, args.children, args.depth)
  }
}

class OptimalWin {
  /**
   * @param {number[]} values 
   * @param {number} childI 
   * @param {number} wayId 
   */
  constructor (values, childI, wayId) {
    this.values = values
    this.childI = childI
    this.wayId = wayId
  }
  /**
   * @param {Object} args 
   * @param {number[]} args.values 
   * @param {number} args.childI 
   * @param {number} args.wayId 
   */
  static byNamed (args) {
    return new OptimalWin(args.values, args.childI, args.wayId)
  }
}

/**
 * @param {number} depth 
 * @param {number} nNodes 
 */
function generateGameTree (depth, nNodes) {
  let { root, leafsWithNotMaxDepth } = generateMainBranch(depth)
  let currentNNodes = 2 * depth - 1
  while (currentNNodes < nNodes) {
    let { el: leaf, i: leafI } = randPickI(leafsWithNotMaxDepth)
    appendNewChildren(leaf)
    arrRemoveI(leafsWithNotMaxDepth, leafI)
    if (leaf.depth < depth - 1) {
      arrAppend(leafsWithNotMaxDepth, leaf.children)
    }
    currentNNodes += 2
  }
  setOptimalWinsToLeafs(root)
  return root
}

/**
 * @param {number} depth 
 */
function generateMainBranch (depth) {
  let root = GameNode.byNamed({
    optimalWins: [],
    parent: null,
    childI: null,
    children: [],
    depth: 1
  })
  /** @type {GameNode[]} */
  let leafsWithNotMaxDepth = []
  let currentNode = root
  for (let i = 0; i < depth - 1; ++i) {
    appendNewChildren(currentNode)
    let newLeafs = currentNode.children
    let { el: nextNode, i: nextNodeI } = randPickI(newLeafs)
    if (currentNode.depth < depth - 1) {
      leafsWithNotMaxDepth.push(newLeafs[(nextNodeI + 1) % 2])
    }
    currentNode = nextNode
  }
  return { root, leafsWithNotMaxDepth }
}

/**
 * @param {GameNode} node 
 */
function appendNewChildren (node) {
  node.children = arrInc(2).map(i =>
    GameNode.byNamed({
      optimalWins: [],
      parent: node,
      childI: i,
      children: [],
      depth: node.depth + 1
    }))
}

/**
 * @param {GameNode} root 
 */
function setOptimalWinsToLeafs (root) {
  let leafs = getLeafs(root)
  leafs.forEach(leaf => {
    let win = OptimalWin.byNamed({
      values: arrInc(2).map(_ => randInt(0, 20)),
      childI: null,
      wayId: Math.random()
    })
    leaf.optimalWins = [win]
  })
}

/**
 * @param {GameNode} root 
 */
function getLeafs (root) {
  let toProceed = [root]
  let leafs = []
  while (!arrEmpty(toProceed)) {
    let node = toProceed[0]
    if (isLeaf(node)) {
      leafs.push(node)
    } else {
      arrAppend(toProceed, node.children)
    }
    arrRemoveI(toProceed, 0)
  }
  return leafs
}

/**
 * @param {GameNode} node 
 */
function isLeaf (node) {
  return arrEmpty(node.children)
}

/**
 * @param {GameNode} root 
 * @param {CanvasRenderingContext2D} context 
 * @param {Box} canvasBox 
 */
function drawTree (root, context, canvasBox) {
  let toProceed = [root]
  while (!arrEmpty(toProceed)) {
    let node = toProceed[0]
    drawNode(node, context, canvasBox)
    arrAppend(toProceed, node.children)
    arrRemoveI(toProceed, 0)
  }
}

/**
 * @param {GameNode} node 
 * @param {CanvasRenderingContext2D} context 
 * @param {Box} canvasBox 
 */
function drawNode (node, context, canvasBox) {
  let rect = getNodeRect(node, canvasBox)
  node.children.forEach(child => {
    let childRect = getNodeRect(child, canvasBox)
    let line = new Arrow(rect.center(), childRect.center())
    if (child.isFromRoot) {
      canvasLine(context, line, 5)
    } else {
      canvasLine(context, line, 1)
    }
  })
  canvasFillStyled(context, playerI(node) === 0 ? 'blue' : 'red', () => {
    canvasFrame(context, rect, 4)
  })
  node.optimalWins.forEach((win, i) => {
    let text = win.values.toString()
    let position = new Dot(
      rect.x + rect.w / 2 - canvasTextWidth(context, text) / 2,
      rect.y + 32 + i * 30)
    canvasText(context, text, position)
  })
}

/**
 * @param {GameNode} node 
 * @param {Box} canvasBox
 * @returns {Rect} 
 */
function getNodeRect (node, canvasBox) {
  const w = 90
  const h = 100
  if (isRoot(node)) {
    return Rect.byNamed({
      x: canvasBox.w / 2 - w / 2,
      y: 20,
      w,
      h
    })
  } else {
    let parentRect = getNodeRect(node.parent, canvasBox)
    let x = parentRect.center().x + (node.childI === 0 ? -1 : 1)
      * Math.pow(2, 8 - node.depth) * 25
      - w / 2
    return Rect.byNamed({
      x,
      y: node.depth * 120,
      w,
      h
    })
  }
}

/**
 * @param {GameNode} node 
 */
function isRoot (node) {
  return node.parent === null
}

/**
 * @param {GameNode} root 
 */
function treeLevelsNodes (root) {
  let toProceed = [root]
  let nodes = []
  while (!arrEmpty(toProceed)) {
    let node = toProceed[0]
    nodes.push(node)
    arrAppend(toProceed, node.children)
    arrRemoveI(toProceed, 0)
  }
  return nodes
}