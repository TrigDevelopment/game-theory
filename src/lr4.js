let canvasBox = new Box(6400, 900)
let canvas = document.body.appendChild(document.createElement('canvas')) 
canvas.width = canvasBox.w
canvas.height = canvasBox.h
let context = canvas.getContext('2d')
let root = generateGameTree(7, 42)
drawTree(root, context, canvasBox)