import styled from 'styled-components'
import { Categories } from 'styled-icons/boxicons-solid'
import { Row, SubHeading, IconButton } from '../styles/PostEditStyles'
import TOPICS from '../../constants/topics'

const Container = styled.div`
  display: grid;
  select {
    justify-self: center;
    align-self: center;
    width: 90%;
    border: 1px dashed ${props => props.theme.grey[5]};
    background: ${props => props.theme.grey[0]};
    color: ${props => props.theme.grey[10]};
    font-size: 1rem;
    text-align: center;
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    outline: 0;
    optgroup {
      font-family: 'Roboto Slab Bold';
    }
    option {
      font-family: 'Roboto Slab';
    }
  }
`

const Topic = ({ topic, onChange }) => (
  <Container>
    <Row>
      <SubHeading>Topic</SubHeading>
      <IconButton>
        <Categories />
      </IconButton>
    </Row>
    <select name="topic" value={topic} onChange={onChange}>
      {TOPICS.map(x => (
        <optgroup key={x.title} label={x.title}>
          {x.topics.map(y => (
            <option key={y.enum} value={y.enum}>
              {y.name}
            </option>
          ))}
        </optgroup>
      ))}
      <option value="NONE">None</option>
    </select>
  </Container>
)

export default Topic
