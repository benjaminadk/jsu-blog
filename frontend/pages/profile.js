import PleaseRegister from '../components/PleaseRegister'
import Profile from '../components/Profile'

export default props => (
  <PleaseRegister {...props}>
    <Profile user={props.user} />
  </PleaseRegister>
)
