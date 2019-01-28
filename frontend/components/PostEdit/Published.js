import { Checkmark } from 'styled-icons/icomoon/Checkmark'
import { Row, SubHeading, PublishIconButton } from '../styles/PostEditStyles'

const Published = ({ published, onClick }) => (
  <Row>
    <SubHeading>{published ? 'Published' : 'Ready to publish?'}</SubHeading>
    <PublishIconButton checked={published} onClick={onClick}>
      <Checkmark />
    </PublishIconButton>
  </Row>
)

export default Published
