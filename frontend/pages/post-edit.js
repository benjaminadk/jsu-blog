import PleaseRegister from '../components/PleaseRegister'
import PostEdit from '../components/PostEdit'

export default props => (
  <PleaseRegister {...props}>
    <PostEdit user={props.user} id={props.query.id} />
  </PleaseRegister>
)
