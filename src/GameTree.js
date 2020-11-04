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
   * @param {boolean} isFromRoot 
   */
  constructor (values, childI, wayId, isFromRoot) {
    this.values = values
    this.childI = childI
    this.wayId = wayId
    this.isFromRoot = isFromRoot
  }
  /**
   * @param {Object} args 
   * @param {number[]} args.values 
   * @param {number} args.childI 
   * @param {number} args.wayId 
   * @param {boolean} args.isFromRoot 
   */
  static byNamed (args) {
    return new OptimalWin(args.values, args.childI, args.wayId, args.isFromRoot)
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
      values: arrInc(2).map(_ => Math.random()),
      childI: null,
      wayId: Math.random(),
      isFromRoot: false
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
    canvasLine(context, line, 1)
  })
  canvasFrame(context, rect, 2)
}

/**
 * @param {GameNode} node 
 * @param {Box} canvasBox 
 */
function getNodeRect (node, canvasBox) {
  const w = 90
  const h = 50
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
      y: node.depth * 100,
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