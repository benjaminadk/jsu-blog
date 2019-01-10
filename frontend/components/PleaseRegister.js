import { UserContext } from '../lib/user-context'

const PleaseRegister = props => (
  <UserContext.Consumer>
    {({ user, onSignin }) => {
      if (!user) {
        return <div onClick={onSignin}>Signin</div>
      }
      return props.children
    }}
  </UserContext.Consumer>
)

export default PleaseRegister
