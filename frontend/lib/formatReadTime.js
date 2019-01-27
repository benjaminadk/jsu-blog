export default (words, published) =>
  `${Math.ceil(words / 265)} min read${
    !published ? ` (${words} word${Number(words) === 1 ? '' : 's'} so far)` : ''
  }`
