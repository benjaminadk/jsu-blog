module.exports = `
  fragment PostWithAuthor on Post {
    id
    topic
    title
    subtitle
    body
    image
    tags
    published
    updatedAt
    createdAt
    author {
      id
      name
      bio
      image
    }
  }
`
