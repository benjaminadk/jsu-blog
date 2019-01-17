import PleaseRegister from '../components/PleaseRegister'
import PostEditor from '../components/PostEditor'

export default props => (
  <PleaseRegister {...props}>
    <PostEditor user={props.user} id={props.query.id} />
  </PleaseRegister>
)
