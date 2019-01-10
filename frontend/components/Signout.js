import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { ME_QUERY } from './User'

const SIGNOUT_MUTATION = gql`
  mutation SIGNOUT_MUTATION {
    signout {
      success
      message
    }
  }
`

const Signout = ({ onClick }) => (
  <Mutation mutation={SIGNOUT_MUTATION} refetchQueries={[{ query: ME_QUERY }]}>
    {(signout, { loading, error }) => (
      <li className="list-item" onClick={() => onClick(signout)}>
        <a>Sign{loading && 'ing'} out</a>
      </li>
    )}
  </Mutation>
)

export default Signout
