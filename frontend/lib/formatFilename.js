function clean(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s/g, '-')
}

export default (folder, id, filename) => `${folder}/${clean(id)}/${clean(filename)}`
