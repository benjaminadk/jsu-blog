import { Heading } from '../styles/PublicationEditStyles'
import { ButtonSave } from '../styles/Button'

const Save = ({ title, clean, onClick }) => (
  <Heading>
    <h1>{title}</h1>
    <ButtonSave clean={clean} onClick={onClick}>
      Save
    </ButtonSave>
  </Heading>
)

export default Save
