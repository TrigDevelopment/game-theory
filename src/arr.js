import { zipWith } from 'ramda';

/**
 * Pads arr to length of [len] using padding element to fill.
 * Padding is placed on left of array.
 * @param {any[]} arr 
 * @param {number} len 
 * @param {any} padding 
 */
export function padLeft (arr, len, padding) {
  return Array(len - arr.length).fill(padding)
    .concat(arr)
}

/**
 * Pads [arr] to length of [len] using [padding] element to fill
 * Padding is placed on right of array.
 * @param {any[]} arr 
 * @param {number} len 
 * @param {any} padding 
 */
export function padRight (arr, len, padding) {
  return arr.concat(Array(len - arr.length).fill(padding))
}
/**
 * Removes and returns first element of [arr]
 * @param {any[]} arr 
 */
export function arrPopFront (arr) {
  let first = arr[0]
  for (let i = 0; i < arr.length - 1; ++i) {
    arr[i] = arr[i + 1]
  }
  arr.length--;
  return first
}

/**
 * @param {any[]} arr 
 */
export function arrNEmpty (arr) {
  return arr.length > 0
}


/**
 * @param {any[]} arr 
 */
export function arrEmpty (arr) {
  return !arrNEmpty(arr)
}

/**
 * Returns arr with repeating el
 * @template T
 * @param {T} el 
 * @param {number} n 
 * @returns {T[]}
 */
export function repeat (el, n) {
  return Array(n).fill(el)
}

/**
 * @param {any[]} arr 
 */
export function empty (arr) {
  return arr.length === 0
}

/**
 * @param {number} n 
 */
export function emptyArrays (n) {
  let arrs = []
  for (let i = 0; i < n; ++i) {
    arrs.push([])
  }
  return arrs
}

/**
 * returns [0,1,2,...,n-1]
 * @param {number} n 
 */
export function increasing (n) {
  let arr = []
  for (var i = 0; i < n; ++i) {
    arr.push(i)
  }
  return arr
}

/**
 * Swaps two elements of array with indexes [i1] and [i2]
 * @param {any[]} arr 
 * @param {number} i1 
 * @param {number} i2 
 */
export function arrSwap (arr, i1, i2) {
  let temp = arr[i1]
  arr[i1] = arr[i2]
  arr[i2] = temp
}

/**
 * Removes all elements from given [arr] that are (=== el)
 * @template T
 * @param {T[]} arr 
 * @param {T} el 
 */
export function arrRemoveEl (arr, el) {
  arrRemoveIf(arr, e => e === el)
}

/**
 * Removes element with given [i]
 * @param {any[]} arr 
 * @param {number} i
 */
export function arrRemoveI (arr, i) {
  arr.splice(i, 1)
}

/**
 * @template T
 * @param {T[]} arr 
 * @param {(element: T) => number} f
 */
export function arrSum (arr, f) {
  return arr.reduce(
    (acc, el) => acc + f(el), 0)
}

/**
 * @template T
 * @param {T[]} arr 
 * @param {(element: T) => number} f 
 */
export function arrMax (arr, f) {
  return arr.reduce(
    (acc, el) => Math.max(acc, f(el)), f(arr[0]))
}

/**
 * Returns true iff array has element
 * @template T
 * @param {T[]} arr 
 * @param {T} el 
 */
export function arrHas (arr, el) {
  return arr.find(e => e === el) !== undefined
}

/**
 * Returns last element of [arr] for which pred is true. \
 * If not found, returns null
 * @template T
 * @param {T[]} arr 
 * @param {(el: T) => boolean} pred 
 */
export function findLast (arr, pred) {
  for (let i = arr.length - 1; i >= 0; --i) {
    if (pred(arr[i])) {
      return arr[i]
    }
  }
  return null
}

/**
 * Returns last index of [arr] for which pred is true. \
 * If not found, returns null
 * @template T
 * @param {T[]} arr 
 * @param {(el: T) => boolean} pred 
 */
export function findLastI (arr, pred) {
  for (let i = arr.length - 1; i >= 0; --i) {
    if (pred(arr[i])) {
      return i
    }
  }
  return null
}
/**
 * Returns number of pred elements
 * @template T
 * @param {T[]} arr 
 * @param {(el: T) => boolean} pred 
 */
export function arrCount (arr, pred) {
  let n = 0
  for (let i = arr.length - 1; i >= 0; --i) {
    if (pred(arr[i])) {
      ++n
    }
  }
  return n
}
/**
 * @template T
 * @param {T[]} arr 
 */
export function getLast (arr) {
  return arr[arr.length - 1]
}
/**
 * Removes elements from `arr` that are `pred`
 * @template T
 * @param {T[]} arr 
 * @param {(el: T) => boolean} pred 
 */
export function arrRemoveIf (arr, pred) {
  for (let i = arr.length - 1; i >= 0; --i) {
    if (pred(arr[i])) {
      arr.splice(i, 1)
    }
  }
}

/**
 * @template T
 * @param {T[]} arr 
 * @param {T} el 
 * @param {number} i 
 */
export const arrInsert = (arr, el, i) =>
  arr.splice(i, 0, el)

/**
 * @template T
 * @param {T[]} arr 
 */
export function arrLast (arr) {
  return arr[arr.length - 1]
}
/**
 * Returns true iff [arr] is sorted
 * @param {any[]} arr 
 */
export function arrIsSorted (arr) {
  for (let i = 1; i < arr.length; ++i) {
    if (arr[i - 1] > arr[i]) {
      return false
    }
  }
  return true
}