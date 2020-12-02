/**
 * Returns new string with removed character at `i` position
 * @param {string} str 
 * @param {number} i 
 */
export function strRemovedI (str, i) {
  return str.slice(0, i) + str.slice(i + 1)
}

/**
 * Returns `str` part after first entry of `substr`
 * @param {string} str 
 * @param {string} substr 
 */
export function strAfter (str, substr) {
  return str.slice(str.indexOf(substr) + substr.length)
}

/**
 * Applies `f` to every character in `str`
 * @param {string} str 
 * @param {(ch: string, i: number) => void} f 
 */
export function strForEach (str, f) {
  str.split('').forEach(f)
}

/**
 * Returns str without last character
 * @param {string} str 
 */
export function strPopped (str) {
  return str.slice(0, str.length - 1)
}

/**
 * Returns index of closing bracket `]` that pairs `[`.
 * Pairing `]` must be in str\
 * Example:\
 * `ab[df[] + ] etc []`\
 * `..........^`
 * @param {string} str 
 * @param {number} startI
 */
export function strFindPairBracket (str, startI) {
  let bracketCount = 0
  for (let i = startI; i < str.length; ++i) {
    let ch = str[i]
    if (ch === '[') {
      ++bracketCount
    } else if (ch === ']') {
      --bracketCount
      if (bracketCount === 0) {
        return i
      }
    }
  }
}

/**
 * Returns true iff `str` is empty
 * @param {string} str 
 */
export function strEmpty (str) {
  return str.length === 0
}

/**
 * Returns empty array with `string[]` type.
 * Useful for type-hinting
 * @returns {string[]}
 */
export function strsEmpty () {
  return []
}

/**
 * Returns string with removed html-tags.
 * @param {string} str 
 */
export function noHtmlTags (str) {
  return str === '' ?
    '' :
    JSON.parse(str).html.replace(/<\/?[^>]+(>|$)/g, "")
}

/**
 * Returns string with space repeated `nSpaces` times
 * @param {number} nSpaces 
 */
export function spaces (nSpaces) {
  return ' '.repeat(nSpaces)
}

/**
 * Splits given `str` by `\r\n` and `\n`, returning array with lines
 * @param {string} str 
 */
export function strToLines (str) {
  return str.replace(/\r\n/g, '\n').split('\n')
}