/**
 * Returns array of elements with given `tag` from `container`
 * @type {<K extends keyof HTMLElementTagNameMap>(container: HTMLElement, tag: K) => HTMLElementTagNameMap[K][]}
 */
export function htmlTagged (container, tag) {
  return Array.from(container.getElementsByTagName(tag))
}

/**
 * @type {<K extends keyof HTMLElementTagNameMap>(tag: K) => HTMLElementTagNameMap[K]}
 */
export function htmlNew (tag) {
  return document.createElement(tag)
}

export function htmlBody () {
  return document.body
}

export function htmlCanvas () {
  return htmlNew('canvas')
}