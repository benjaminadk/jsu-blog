import PleaseRegister from '../components/PleaseRegister'
import MyPublications from '../components/MyPublications'

export default props => (
  <PleaseRegister {...props}>
    <MyPublications user={props.user} />
  </PleaseRegister>
)
