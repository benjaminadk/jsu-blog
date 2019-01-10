import PleaseRegister from '../components/PleaseRegister'
import ProfileEdit from '../components/ProfileEdit'

export default props => (
  <PleaseRegister {...props}>
    <ProfileEdit user={props.user} />
  </PleaseRegister>
)
