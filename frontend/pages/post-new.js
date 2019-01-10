import PleaseRegister from '../components/PleaseRegister'
import PostNew from '../components/PostNew'

export default props => (
  <PleaseRegister {...props}>
    <PostNew user={props.user} />
  </PleaseRegister>
)
