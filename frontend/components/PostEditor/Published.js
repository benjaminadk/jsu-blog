import { Checkmark } from 'styled-icons/icomoon'
import { Row, SubHeading, PublishIconButton } from '../styles/EditorStyles'

const Published = ({ published }) => (
  <Row>
    <SubHeading>{published ? 'Published' : 'Ready to publish?'}</SubHeading>
    <PublishIconButton checked={published}>
      <Checkmark />
    </PublishIconButton>
  </Row>
)

export default Published
