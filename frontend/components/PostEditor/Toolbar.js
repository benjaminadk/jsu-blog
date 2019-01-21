import styled from 'styled-components'
import { FormatBold, FormatItalic, FormatQuote } from 'styled-icons/material'
import { Link as FormatLink, Heading as FormatHeading } from 'styled-icons/boxicons-regular'
import { Image as FormatImage } from 'styled-icons/icomoon'

const Container = styled.div.attrs(props => ({
  style: {
    display: props.show ? 'grid' : 'none',
    top: props.top + 'px',
    left: props.left + 'px'
  }
}))`
  position: absolute;
  grid-template-columns: repeat(7, 1fr);
  border-radius: ${props => props.theme.borderRadius};
  transform: translate(-50%, -100%);
  transition: top 0.2s, left 0.2s;
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    z-index: -1;
    width: 1.25rem;
    height: 1rem;
    background-color: ${props => props.theme.black};
    transform: translate(-50%, 0.25rem) rotate(45deg);
  }
  .action {
    position: relative;
    display: grid;
    justify-items: center;
    align-items: center;
    background: ${props => props.theme.black};
    color: ${props => props.theme.white};
    padding: 1rem;
    cursor: pointer;
    transition: color 0.25s;
    &:hover {
      color: ${props => props.theme.primary};
    }
    svg {
      width: 2rem;
      height: 2rem;
      color: inherit;
    }
    &:first-child {
      border-top-left-radius: ${props => props.theme.borderRadius};
      border-bottom-left-radius: ${props => props.theme.borderRadius};
    }
    &:last-child {
      border-top-right-radius: ${props => props.theme.borderRadius};
      border-bottom-right-radius: ${props => props.theme.borderRadius};
    }
    &:nth-child(4)::after {
      content: '1';
      position: absolute;
      bottom: 0.65rem;
      right: 0.85rem;
      font-family: 'Roboto';
      font-size: 0.85rem;
      color: inherit;
    }
    &:nth-child(5)::after {
      content: '2';
      position: absolute;
      bottom: 0.65rem;
      right: 0.85rem;
      font-family: 'Roboto';
      font-size: 0.85rem;
      color: inherit;
    }
  }
`

export default ({ show, top, left, textDecorator }) => {
  const actions = [
    { icon: <FormatBold />, click: () => textDecorator('bold') },
    { icon: <FormatItalic />, click: () => {} },
    { icon: <FormatLink />, click: () => {} },
    { icon: <FormatHeading />, click: () => {} },
    { icon: <FormatHeading />, click: () => {} },
    { icon: <FormatQuote />, click: () => {} },
    { icon: <FormatImage />, click: () => {} }
  ]
  return (
    <Container show={show} top={top} left={left}>
      {actions.map((action, i) => (
        <div key={i} className="action" onClick={action.click}>
          {action.icon}
        </div>
      ))}
    </Container>
  )
}
