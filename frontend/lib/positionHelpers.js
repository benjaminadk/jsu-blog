function getCursorXY(input, selectionPoint) {
  const { offsetLeft: x1, offsetTop: y1 } = input
  const div = document.createElement('div')
  const copyStyle = getComputedStyle(input)
  for (const prop of copyStyle) {
    div.style[prop] = copyStyle[prop]
  }
  const textContent = input.value.substr(0, selectionPoint)
  div.textContent = textContent
  div.style.position = 'fixed'
  const span = document.createElement('span')
  span.textContent = input.value.substr(selectionPoint)
  div.appendChild(span)
  document.body.appendChild(div)
  const { offsetLeft: x2, offsetTop: y2 } = span
  document.body.removeChild(div)
  return {
    x: x1 + x2,
    y: y1 + y2
  }
}

export function getCaretPosition(input) {
  const { offsetTop, offsetHeight, scrollTop, selectionEnd } = input
  const { x, y } = getCursorXY(input, selectionEnd)
  const top = Math.min(y - scrollTop, offsetTop + offsetHeight)
  return top
}

export function getSelectionPosition(input) {
  const { selectionStart, selectionEnd, offsetLeft, offsetWidth, scrollLeft, scrollTop } = input
  const { y: startTop, x: startLeft } = getCursorXY(input, selectionStart)
  const { y: endTop, x: endLeft } = getCursorXY(input, selectionEnd)
  const { paddingLeft, paddingRight } = getComputedStyle(input)
  const endPoint =
    startTop !== endTop
      ? offsetLeft + (offsetWidth - parseInt(paddingLeft, 10) + parseInt(paddingRight, 10))
      : endLeft
  const newLeft = startLeft + (endPoint - startLeft) / 2
  const top = startTop - scrollTop - 10
  const left = newLeft - scrollLeft
  return [top, left]
}
