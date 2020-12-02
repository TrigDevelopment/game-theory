import { mathDelta } from './math';

/**
 * Pads `arr` to length `len` using `padding` element to fill.
 * Padding is placed on left of array.
 * @template T
 * @param {T[]} arr 
 * @param {number} len 
 * @param {T} padding 
 */
export function padLeft (arr, len, padding) {
  return Array(len - arr.length).fill(padding)
    .concat(arr)
}

/**
 * Pads `arr` to length `len` using `padding` element to fill
 * Padding is placed on right of array.
 * @template T
 * @param {T[]} arr 
 * @param {number} len 
 * @param {T} padding 
 */
export function padRight (arr, len, padding) {
  return arr.concat(Array(len - arr.length).fill(padding))
}

/**
 * Removes and returns first element of `arr`
 * @template T
 * @param {T[]} arr 
 */
export function arrPopFront (arr) {
  let first = arr[0]
  for (let i = 0; i < arr.length - 1; ++i) {
    arr[i] = arr[i + 1]
  }
  arr.length--
  return first
}

/**
 * Adds two arrays elementwise
 * @param {number[]} arr1 
 * @param {number[]} arr2 
 */
export function arrPlus (arr1, arr2) {
  return arrZip(arr1, arr2).map(([a, b]) => a + b)
}

/**
 * Returns true iff `arr` is empty
 * @template T
 * @param {T[]} arr 
 */
export function arrEmpty (arr) {
  return arr.length === 0
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
 * Removes all elements from given `arr` that are `=== el`
 * @template T
 * @param {T[]} arr 
 * @param {T} el 
 */
export function arrRemoveEl (arr, el) {
  arrRemoveIf(arr, e => e === el)
}

/**
 * Removes element with given `i`
 * @param {any[]} arr 
 * @param {number} i
 */
export function arrRemoveI (arr, i) {
  arr.splice(i, 1)
}

/**
 * Returns sum of `f(x)` on every element of `arr`
 * @template T
 * @param {T[]} arr 
 * @param {(element: T) => number} f
 */
export function arrSumF (arr, f) {
  return arr.reduce(
    (acc, el) => acc + f(el), 0)
}

/**
 * Returns sum `arr` elements
 * @param {number[]} arr 
 */
export function arrSum (arr) {
  return arrSumF(arr, x => x)
}

/**
 * @template T
 * @param {T[]} arr 
 * @param {(element: T) => number} f 
 */
export function arrMaxF (arr, f) {
  return arr.reduce(
    (acc, el) => Math.max(acc, f(el)), 0)
}

/**
 * Returns true iff array has element
 * @template T
 * @param {T[]} arr 
 * @param {T} el 
 */
export const arrHas = (arr, el) =>
  arr.find(e => e === el) !== undefined

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

/**
 * @param {number[]} arr 
 */
export const arrMean = arr => 
  arrSum(arr) / arr.length

/**
 * Returns sum of deviations from mean value
 * @param {number[]} arr 
 */
export function arrDeviationSum (arr) {
  let mean = arrMean(arr)
  return arrSumF(arr, x => mathDelta(x, mean))
}

/**
 * Appends `what` array to `to` array
 * @template T
 * @param {T[]} to 
 * @param {T[]} what 
 */
export function arrAppend (to, what) {
  what.forEach(el => to.push(el))
}

/**
 * Returns [0,1,2,...,n-1]
 * @param {number} n 
 */
export function arrInc (n) {
  let arr = []
  for (let i = 0; i < n; ++i) {
    arr.push(i)
  }
  return arr
}

/**
 * Returns shallow copy of `arr`
 * @template T
 * @param {T[]} arr 
 */
export const arrShallowCopy = arr =>
  [].concat(arr)

/**
 * @template T
 * @param {T[][]} arrays 
 */
export const arrConcat = arrays => 
  arrays.reduce((acc, cur) => acc.concat(cur), [])

/**
 * @template T
 * @param {T[]} arr1 
 * @param {T[]} arr2 
 */
export const arrCrossProduct = (arr1, arr2) =>
  arrConcat(arr1.map(a => arr2.map(b => [a, b])))

/**
 * Returns array of pairs with elements from `arr1` and `arr2`.
 * Arrays must be of the same length
 * @template T
 * @param {T[]} arr1 
 * @param {T[]} arr2 
 */
export const arrZip = (arr1, arr2) => 
  arr1.map((a, i) => [a, arr2[i]])

/**
 * Returns product of all elements of given `arr`
 * @param {number[]} arr 
 */
export const arrProduct = arr =>
  arr.reduce((acc, x) => acc * x)

/**
 * Removes duplicates from `arr` using `isEqual` predicate to 
 * determine equal elements
 * @template T
 * @param {T[]} arr 
 * @param {(a: T, b: T) => boolean} isEqual 
 */
export function arrRemoveDuplicates (arr, isEqual) {
  for (let i = 0; i < arr.length; ++i) {
    if (arr.slice(0, i).some(x => isEqual(x, arr[i]))) {
      arrRemoveI(arr, i)
    }
  }
}

/**
 * @template Value
 * @template Key
 * @param {Value[]} arr 
 * @param {(value: Value) => Key} keyF 
 */
export function arrClassify (arr, keyF) {
  /** @type {Map<Key, Value[]>} */
  let classes = new Map()
  arr.forEach(v => {
    let key = keyF(v)
    if (classes.has(key)) {
      classes.get(key).push(v)
    } else {
      classes.set(key, [v])
    }
  })
  return classes
}

/**
 * Returns indexes of all elements from given `arr` that are `predicate`
 * @template T
 * @param {T[]} arr 
 * @param {(element: T) => boolean} predicate 
 */
export function arrIndexes (arr, predicate) {
  return arr.filter((el, i) => predicate(el) ? i : null)
    .map((_, i) => i)
}

/**
 * Returns array with elements from `arr` that have specified `indexes`
 * @template T
 * @param {T[]} arr 
 * @param {number[]} indexes 
 */
export const arrSubset = (arr, indexes) =>
  indexes.map(i => arr[i])

/**
 * Returns `arr` without elements that exist in `except` array
 * @template T
 * @param {T[]} arr 
 * @param {T[]} except 
 */
export const arrExcept = (arr, except) =>
  arr.filter(el => !arrHas(except, el))