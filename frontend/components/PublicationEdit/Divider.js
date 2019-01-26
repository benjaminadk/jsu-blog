import styled from 'styled-components'

const Container = styled.div`
  margin-top: ${props => (props.size === 'md' ? '5rem' : 0)};
  margin-bottom: 4rem;
  border-bottom: 1px solid ${props => props.theme.grey[2]};
  .sm {
    font-family: 'Roboto Slab';
    font-size: 1.25rem;
    text-align: justify;
    color: ${props => props.theme.grey[5]};
  }
  .md {
    font-family: 'Roboto Bold';
    font-size: 2rem;
  }
`
const Divider = ({ size, text }) => (
  <Container size={size}>
    <span className={size}>{text}</span>
  </Container>
)

export default Divider
