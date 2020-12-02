import Arrow from './geometry/Arrow'
import Dot from './geometry/Dot'
import Rect from './geometry/Rect'
import { strsEmpty } from './str'

/**
 * @param {CanvasRenderingContext2D} context 
 * @param {Rect} rect 
 * @param {number} lineWidth 
 */
export function canvasFrame (context, rect, lineWidth) {
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
export function canvasFillStyled (context, style, f) {
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
export function canvasLine (context, arrow, lineWidth) {
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
export function canvasText (context, text, position) {
  context.fillText(text, position.x, position.y)
}

/**
 * @param {CanvasRenderingContext2D} context 
 * @param {string} text 
 */
export function canvasTextWidth (context, text) {
  return context.measureText(text).width
}

/**
 * Fills `text` in center of `rect`. `TextMetrics.fontBoundingBoxDescent` and
 * `TextMetrics.fontBoundingBoxAscent` are still experimental, so we cannot
 * use them to determine text height.
 * @param {CanvasRenderingContext2D} context 
 * @param {string} text 
 * @param {Rect} rect 
 * @param {number} textHeight Text height in pixels
 */
export function canvasTextCentered (context, text, rect, textHeight) {
  let textW = canvasTextWidth(context, text)
  let position = new Dot({
    x: rect.x + rect.w / 2 - textW / 2,
    y: rect.y + rect.h / 2 + textHeight / 2
  })
  canvasText(context, text, position)
}

/**
 * Using `maxW` as maximum row width, splits `text` by spaces so that\
 * strings can fit in these rows. If `text` is an empty string,\
 * array with one empty string is returned
 * @param {CanvasRenderingContext2D} context 
 * @param {string} text 
 * @param {number} maxW 
 */
export function canvasSplitBounded (context, text, maxW) {
  let words = text.split(' ')
  let w = 0
  let lines = strsEmpty()
  let line = strsEmpty()
  words.forEach(word => {
    let wordW = canvasTextWidth(context, word)
    w += wordW + canvasTextWidth(context, ' ')
    if (w > maxW) {
      if (line.length !== 0) {
        lines.push(line.join(' '))
      }
      line = [word]
      w = wordW
    } else {
      line.push(word)
    }
  })
  lines.push(line.join(' '))
  return lines
}

/**
 * Splits `text` into lines by spaces and draws it into `rect` with
 * given `lineInterval`. Note that `rect.h` is not used and text can
 * be drawn out of `rect`. Also if one word is too long to fit into line,
 * it can break right line of `rect`
 * @param {CanvasRenderingContext2D} context 
 * @param {string} text 
 * @param {Rect} rect
 * @param {number} lineInterval 
 */
export const canvasTextBounded = (context, text, rect, lineInterval) => {
  let lines = canvasSplitBounded(context, text, rect.w)
  lines.forEach((line, i) => {
    context.fillText(line, rect.x, rect.y + (i + 1) * lineInterval)
  })
}