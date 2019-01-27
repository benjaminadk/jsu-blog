import styled from 'styled-components'
import Markdown from 'markdown-to-jsx'
import overrides from './styles/Overrides'

const Container = styled.div`
  align-self: center;
  position: relative;
  display: ${props => (props.preview ? 'block' : 'none')};
  width: 100%;
  text-align: justify;
  line-height: normal;
  padding-left: 5rem;
  margin-top: 5rem;
`

export default ({ preview, markdown }) => (
  <Container preview={preview}>
    <Markdown children={markdown} options={{ overrides }} />
  </Container>
)
