module.exports = `
  fragment UserWithPosts on User {
    id
    name
    email
    image
    bio
    createdAt
    topics
    posts {
      id
      title
      subtitle
      body
      image
      published
      updatedAt
      createdAt
    }
  }
`
