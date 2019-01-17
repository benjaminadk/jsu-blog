import PleaseRegister from '../components/PleaseRegister'
import MyPosts from '../components/MyPosts'

export default props => (
  <PleaseRegister {...props}>
    <MyPosts user={props.user} />
  </PleaseRegister>
)
