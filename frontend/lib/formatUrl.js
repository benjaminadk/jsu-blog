export default function(str) {
  return str
    .trim()
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^a-zA-Z0-9\-]/g, '')
}
