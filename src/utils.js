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
 * Returns indexes of all elements that has max value
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
 * Returns indexes of all elements that has min value
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
 * @param {number} a 
 * @param {number} b 
 */
function delta (a, b) {
  return Math.abs(a - b)
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
 * @template T
 * @param {T[]} arr 
 * @param {(element: T) => number} f 
 */
function arrMin (arr, f) {
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
 * Returns random element from given `arr` and its index
 * @param {any[]} arr 
 */
function randPickI (arr) {
  let i = randInt(0, arr.length - 1)
  let el = arr[i]
  return { el, i }
}

/**
 * Returns random element from given `arr`
 * @param {any[]} arr 
 */
function randPick (arr) {
  return randPickI(arr).el
}

/**
 * Appends `what` array to `to` array
 * @template T
 * @param {T[]} to 
 * @param {T[]} what 
 */
function arrAppend (to, what) {
  what.forEach(el => to.push(el))
}

/**
 * @param {number[]} arr 
 */
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

/**
 * @param {number[]} arr 
 */
function indexOfMin (arr) {
  if (arr.length === 0) {
    return -1;
  }

  var max = arr[0];
  var maxIndex = 0;

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] < max) {
      maxIndex = i;
      max = arr[i];
    }
  }

  return maxIndex;
}

/**
 * @param {number[]} arr 
 */
function arrSum (arr) {
  return arr.reduce((acc, n) => acc + n, 0)
}

/**
 * @param {number[]} arr 
 */
function arrMean (arr) {
  return arrSum(arr) / arr.length
}

/**
 * Removes element with given `i`
 * @param {any[]} arr 
 * @param {number} i
 */
function arrRemoveI (arr, i) {
  arr.splice(i, 1)
}

/**
 * @param {number[][]} matrix 
 */
function matrixToString (matrix) {
  let s = ''
  matrix.map(row => {
    row.map(n => s += ('' + n + '     ').substring(0, 6) + ' ')
    s += '\n'
  })
  return s
}

/**
 * @param {number[][]} matrix 
 */
function matrixColumns (matrix) {
  let columns = []
  let nRows = matrix.length
  let nColumns = matrix[0].length
  for (let i = 0; i < nColumns; ++i) {
    columns[i] = []
    for (let j = 0; j < nRows; ++j) {
      columns[i].push(matrix[j][i])
    }
  }
  return columns
}

/**
 * @param {number} min
 * @param {number} max
 * @param {number} len
 */
function randIntArr (min, max, len) {
  let arr = []
  for (let i = 0; i < len; ++i) {
    arr.push(randInt(min, max))
  }
  return arr
}

/**
 * @param {number} min 
 * @param {number} max 
 * @param {number} size 
 */
function randIntSquareMatrix (min, max, size) {
  return increasing(size)
    .map(_ => randIntArr(min, max, size))
}

/**
 * @template T
 * @param {T[]} arr 
 * @param {(el: T) => boolean} pred 
 */
function arrAll (arr, pred) {
  let b = true
  arr.forEach(x => {
    if (!pred(x)) {
      b = false
    }
  })
  return b
}

/**
 * Returns sum of `f(x)` on every element of `arr`
 * @template T
 * @param {T[]} arr 
 * @param {(element: T) => number} f
 */
function arrSumF (arr, f) {
  return arr.reduce(
    (acc, el) => acc + f(el), 0)
}

/**
 * Returns [0,1,2,...,n-1]
 * @param {number} n 
 */
function arrInc (n) {
  let arr = []
  for (let i = 0; i < n; ++i) {
    arr.push(i)
  }
  return arr
}

/**
 * @param {any[]} arr 
 */
function arrNEmpty (arr) {
  return arr.length > 0
}

/**
 * 
 * Returns true iff `arr` is empty
 * @param {any[]} arr 
 */
function arrEmpty (arr) {
  return !arrNEmpty(arr)
}

/**
 * @param {CanvasRenderingContext2D} context 
 * @param {Rect} rect 
 * @param {number} lineWidth 
 */
function canvasFrame (context, rect, lineWidth) {
  context.fillRect(rect.x, rect.y, rect.w, rect.h)
  canvasFillStyled(context, 'white', () =>
    context.fillRect(
      rect.x + lineWidth,
      rect.y + lineWidth,
      rect.w - 2 * lineWidth,
      rect.h - 2 * lineWidth))
}

/**
 * Changes `context` fill style to `style`, calls `f`, then reverts context fill style
 * @param {CanvasRenderingContext2D} context 
 * @param {string} style 
 * @param {() => any} f 
 */
function canvasFillStyled (context, style, f) {
  let temp = context.fillStyle
  context.fillStyle = style
  f()
  context.fillStyle = temp
}

/**
 * @param {CanvasRenderingContext2D} context 
 * @param {Arrow} arrow 
 * @param {number} lineWidth 
 */
function canvasLine (context, arrow, lineWidth) {
  context.strokeStyle = 'black'
  context.beginPath()
  context.moveTo(arrow.start.x, arrow.start.y)
  context.lineTo(arrow.end.x, arrow.end.y)
  context.lineWidth = lineWidth
  context.stroke()
}

/**
 * @param {CanvasRenderingContext2D} context 
 * @param {string} text 
 * @param {Dot} position 
 */
function canvasText (context, text, position) {
  context.fillText(text, position.x, position.y)
}

/**
 * @param {CanvasRenderingContext2D} context 
 * @param {string} text 
 */
function canvasTextWidth (context, text) {
  return context.measureText(text).width
}

/**
 * Returns shallow copy of `arr`
 * @param {any[]} arr 
 */
function arrShallowCopy (arr) {
  return [].concat(arr)
}

/**
 * Returns true iff some element of `arr` is `pred`
 * @template T
 * @param {T[]} arr 
 * @param {(el: T) => boolean} pred 
 */
function arrSome (arr, pred) {
  let b = false
  arr.forEach(x => {
    if (pred(x)) {
      b = true
    }
  })
  return b
}

/**
 * @param {number} n 
 */
function mathFactorial (n) {
  return n === 0 ? 1 : arrProduct(arrInc(n).map(x => x + 1))
}

/**
 * @param {number[]} arr 
 */
function arrProduct (arr) {
  return arr.reduce((acc, x) => acc * x)
}