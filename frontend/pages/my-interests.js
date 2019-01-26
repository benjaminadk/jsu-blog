import PleaseRegister from '../components/PleaseRegister'
import MyInterests from '../components/MyInterests'

export default props => (
  <PleaseRegister {...props}>
    <MyInterests {...props} />
  </PleaseRegister>
)
