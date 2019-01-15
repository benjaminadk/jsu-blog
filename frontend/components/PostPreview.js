import styled from 'styled-components'
import { ArrowBack } from 'styled-icons/boxicons-regular'
import Markdown from 'markdown-to-jsx'

const Container = styled.div`
  display: ${props => (props.preview ? 'block' : 'none')};
  align-self: center;
  width: 50%;
  .header {
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    svg {
      width: 3rem;
      height: 3rem;
    }
  }
`

const MarkdownLink = styled.a.attrs(props => ({
  href: props.href,
  title: props.title,
  target: 'blank'
}))`
  color: ${props => props.theme.secondary};
  text-decoration: underline;
`

const A = ({ children, ...props }) => <MarkdownLink {...props}>{children}</MarkdownLink>

export default ({ markdown, togglePreview }) => (
  <Container>
    <div className="header">
      <span onClick={togglePreview}>
        <ArrowBack />
      </span>
      <span>Preview</span>
    </div>
    <Markdown children={markdown} options={{ overrides: { a: A } }} />
  </Container>
)
