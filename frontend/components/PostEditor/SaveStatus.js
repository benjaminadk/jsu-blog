import styled from 'styled-components'
import { ButtonOutline } from '../styles/Button'

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  padding-bottom: 2rem;
  border-bottom: 1px dashed ${props => props.theme.grey[1]};
  span {
    text-align: center;
    font-family: 'Roboto Slab';
    font-size: 1rem;
  }
`

const SaveStatus = props => (
  <Container>
    <ButtonOutline>Save</ButtonOutline>
    <span>Everything is up to date. 🌼</span>
  </Container>
)

export default SaveStatus
