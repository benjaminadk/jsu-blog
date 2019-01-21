export default function(mode, input) {
  const { value, selectionStart: start, selectionEnd: end } = input
  const selection = value.substring(start, end)
  let cbMode, body
  if (mode === 'bold') {
    if (!selection.trim()) {
      cbMode = mode + '.add'
      body = value.substring(0, start) + ' **bold text** ' + value.substring(end)
    } else if (
      value.substring(start - 2, start) === '**' &&
      value.substring(end, end + 2) === '**'
    ) {
      cbMode = mode + '.sub'
      body = value.substring(0, start - 2) + selection + value.substring(end + 2)
    } else {
      cbMode = mode + '.add'
      body = value.substring(0, start) + `**${selection.trim()}**` + value.substring(end)
    }
  }
  return [cbMode, body, start, end]
}
