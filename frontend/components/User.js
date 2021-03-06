import { Query } from 'react-apollo'
import gql from 'graphql-tag'

export const ME_QUERY = gql`
  query ME_QUERY {
    me {
      id
      name
      email
      image
      bio
      topics
      createdAt
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
      pubsOwner {
        id
        name
        description
        avatar
        logo
        createdAt
      }
    }
  }
`

const User = props => (
  <Query {...props} query={ME_QUERY}>
    {payload => props.children(payload)}
  </Query>
)

export default User
