import styled from 'styled-components'
import { ArrowBack } from 'styled-icons/boxicons-regular'
import Markdown from 'markdown-to-jsx'
import { lighten, darken } from 'polished'
import FencedBlock from './FencedBlock'

const Container = styled.div`
  align-self: center;
  position: relative;
  display: ${props => (props.preview ? 'block' : 'none')};
  width: 100%;
  text-align: justify;
  line-height: normal;
  padding-left: 5rem;
  margin-top: 5rem;
  .back {
    position: absolute;
    top: 0;
    left: -4rem;
    cursor: pointer;
    svg {
      width: 3rem;
      height: 3rem;
      color: inherit;
    }
  }
`

const ATag = styled.a.attrs(props => ({
  href: props.href,
  title: props.title,
  target: 'blank'
}))`
  color: ${props => props.theme.secondary};
  text-decoration: underline;
`

const PTag = styled.p`
  font-family: 'Roboto Condensed';
  font-size: 1.6rem;
  text-align: justify;
  padding-left: 2rem;
`

const H1Tag = styled.h1`
  font-family: 'Roboto Bold';
  font-size: 3rem;
  font-weight: normal;
  color: ${props => lighten(0.3, props.theme.black)};
`

const H2Tag = styled(H1Tag)`
  font-size: 2.5rem;
`

const H3Tag = styled(H1Tag)`
  font-size: 2rem;
  color: ${props => props.theme.black};
`

const H4Tag = styled(H1Tag)`
  font-size: 1.75rem;
  color: ${props => props.theme.black};
`

const StrongTag = styled.strong`
  font-family: 'Roboto Condensed Bold';
  font-weight: normal;
`

const UlTag = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const OlTag = styled.ol`
  list-style: none;
  padding: 0;
  margin: 0;
  counter-reset: ol-counter;
`

const LiTag = styled.li`
  font-family: 'Roboto Condensed';
  padding-left: 2rem;
  &::before {
    content: '\\27A4';
    padding-right: 0.8rem;
    color: ${props => darken(0.1, props.theme.primary)};
  }
`

const TaskTag = styled.li`
  font-family: 'Roboto Condensed';
  padding-left: 1.5rem;
  input[type='checkbox'] {
    transform: scale(1.25);
  }
`

const NumberTag = styled.li`
  font-family: 'Roboto Condensed';
  padding-left: 2rem;
  counter-increment: ol-counter;
  &::before {
    content: '0' counter(ol-counter);
    font-family: 'Roboto Condensed Bold';
    padding-right: 0.8rem;
    color: ${props => darken(0.1, props.theme.primary)};
  }
`

const CodeTag = styled.code`
  font-family: 'Roboto Mono';
  font-size: 1.25rem;
  color: ${props => darken(0.05, props.theme.primary)};
  background: ${props => lighten(0.4, props.theme.primary)};
  padding: 0.1rem 0.75rem;
  border-radius: ${props => props.theme.borderRadius};
`

const ImgTag = styled.img`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  max-width: ${props =>
    props.size === 'xl'
      ? '100%'
      : props.size === 'lg'
      ? '75%'
      : props.size === 'md'
      ? '50%'
      : '25%'};
  border-radius: ${props => props.theme.borderRadius};
  margin: 2rem auto;
  box-shadow: ${props => props.theme.shadows[2]};
`

const BlockquoteTag = styled.blockquote`
  background: ${props => lighten(0.45, props.theme.primary)};
  border-left: 2rem solid ${props => props.theme.primary};
  border-radius: ${props => props.theme.borderRadius};
  padding: 0.5rem 2rem;
  margin: 2rem 5rem;
  box-shadow: ${props => props.theme.shadows[1]};
  & > p:first-of-type {
    line-height: 1;
    font-family: 'Roboto Slab Bold';
    font-style: italic;
    text-align: center;
    color: ${props => lighten(0.2, props.theme.black)};
    &::before,
    &::after {
      display: inline-block;
      vertical-align: top;
      height: 3rem;
      font-size: 3rem;
      color: ${props => props.theme.primary};
      opacity: 0.5;
    }
    &::before {
      content: '\\275D';
      margin: -0.5rem 0.75rem 0 -0.75rem;
    }
    &::after {
      content: '\\275E';
      margin-left: -0.25rem;
    }
  }
  & > p:last-of-type {
    font-family: 'Roboto Bold';
    font-size: 1.4rem;
    text-align: center;
    color: ${props => props.theme.grey[5]};
    &::before {
      content: '- ';
    }
  }
`

const A = ({ children, ...props }) => <ATag {...props}>{children}</ATag>

const P = ({ children, ...props }) => <PTag {...props}>{children}</PTag>

const H1 = ({ children, ...props }) => <H1Tag {...props}>{children}</H1Tag>

const H2 = ({ children, ...props }) => <H2Tag {...props}>{children}</H2Tag>

const H3 = ({ children, ...props }) => <H3Tag {...props}>{children}</H3Tag>

const H4 = ({ children, ...props }) => <H4Tag {...props}>{children}</H4Tag>

const Strong = ({ children, ...props }) => <StrongTag {...props}>{children}</StrongTag>

const Ul = ({ children, ...props }) => <UlTag {...props}>{children}</UlTag>

const Ol = ({ children, ...props }) => (
  <OlTag {...props}>
    {children.map((child, i) => (
      <NumberTag key={i}>{child.props.children}</NumberTag>
    ))}
  </OlTag>
)

const Li = ({ children, ...props }) => {
  if (children.length > 1) {
    return <TaskTag {...props}>{children}</TaskTag>
  } else {
    return <LiTag {...props}>{children}</LiTag>
  }
}

const Pre = props => {
  const code = props.children.props.children
  const [_, language, mode] = props.children.props.className.split('-')
  return <FencedBlock code={code} language={language} mode={mode} />
}

const Code = ({ children, ...props }) => <CodeTag {...props}>{children}</CodeTag>

const Img = ({ src, alt, ...props }) => {
  const [title, size] = props.title.split('-')
  return <ImgTag src={src} alt={alt} title={title} size={size} />
}

const Blockquote = ({ children, props }) => <BlockquoteTag {...props}>{children}</BlockquoteTag>

const overrides = {
  a: A,
  p: P,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  strong: Strong,
  ul: Ul,
  ol: Ol,
  li: Li,
  pre: Pre,
  code: Code,
  img: Img,
  blockquote: Blockquote
}

export default ({ preview, markdown, togglePreview }) => (
  <Container preview={preview}>
    <div className="back" onClick={togglePreview}>
      <ArrowBack />
    </div>
    <Markdown children={markdown} options={{ overrides }} />
  </Container>
)
