import PleaseRegister from '../components/PleaseRegister'
import PublicationEdit from '../components/PublicationEdit'

export default props => (
  <PleaseRegister {...props}>
    <PublicationEdit user={props.user} id={props.query.id} />
  </PleaseRegister>
)
