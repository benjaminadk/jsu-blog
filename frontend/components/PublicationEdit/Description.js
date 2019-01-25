import { Row, Label, SingleInput, TextInput } from '../styles/PublicationEditStyles'

const Description = ({ description, onChange }) => (
  <Row>
    <Label>Description *</Label>
    <SingleInput>
      <TextInput
        placeholder="Type a short description"
        name="description"
        value={description}
        onChange={onChange}
      />
      <span>This will be used in footers, search results, and other places.</span>
    </SingleInput>
  </Row>
)

export default Description
