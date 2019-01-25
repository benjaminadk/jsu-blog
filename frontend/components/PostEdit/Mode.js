import { Row, SubHeading, IconButton } from '../styles/PostEditStyles'
import { Pen } from 'styled-icons/boxicons-solid'
import { BookOpen } from 'styled-icons/fa-solid'

const Mode = ({ preview, onClick }) => (
  <Row>
    <SubHeading>{preview ? 'Preview' : 'Edit'} Mode</SubHeading>
    <IconButton onClick={onClick}>{preview ? <BookOpen /> : <Pen />}</IconButton>
  </Row>
)

export default Mode
