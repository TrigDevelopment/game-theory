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
 * Returns random element from given [arr]
 * @param {any[]} arr 
 */
function randPick (arr) {
  return arr[randInt(0, arr.length - 1)]
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
 * Removes element with given [i]
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