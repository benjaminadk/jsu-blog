import styled from 'styled-components'
import { Categories } from 'styled-icons/boxicons-solid'
import { Row, SubHeading, IconButton } from '../styles/EditorStyles'

const Container = styled.div`
  display: grid;
  select {
    justify-self: center;
    align-self: center;
    width: 90%;
    border: 1px dashed ${props => props.theme.grey[5]};
    background: ${props => props.theme.grey[0]};
    color: ${props => props.theme.grey[10]};
    font-family: 'Roboto Slab';
    font-size: 1rem;
    text-align: center;
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    outline: 0;
  }
`

const categories = ['GENERAL', 'ART', 'MUSIC', 'POLITICS', 'PROGRAMMING', 'SCIENCE', 'SPORTS']

const Category = ({ category, onChange }) => (
  <Container>
    <Row>
      <SubHeading>Category</SubHeading>
      <IconButton>
        <Categories />
      </IconButton>
    </Row>
    <select name="category" value={category} onChange={onChange}>
      {categories.map(c => (
        <option key={c} value={c}>
          {c}
        </option>
      ))}
    </select>
  </Container>
)

export default Category
