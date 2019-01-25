import { Row, Label, SingleInput, TextInput } from '../styles/PublicationEditStyles'
import formatUrl from '../../lib/formatUrl'

const Name = ({ name, onChange }) => (
  <Row>
    <Label>Name *</Label>
    <SingleInput>
      <TextInput
        placeholder="Type your publication's name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <span>
        Link: medium.com/publication/
        {name ? formatUrl(name) : '...'}
      </span>
    </SingleInput>
  </Row>
)

export default Name
