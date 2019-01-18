import styled from 'styled-components'

const Container = styled.div`
  height: calc(100vh - 6rem);
  display: grid;
  justify-items: center;
  align-items: center;
  p {
    font-size: 5rem;
    font-family: 'Roboto Slab Bold';
  }
`

export default props => (
  <Container>
    <p>Adios. 🌻</p>
  </Container>
)
