import styled from 'styled-components'
import { FormatBold, FormatItalic, FormatUnderlined } from 'styled-icons/material'
import { Link as FormatLink } from 'styled-icons/boxicons-regular'

const Container = styled.div.attrs(props => ({
  style: {
    opacity: props.show ? 1 : 0,
    top: props.top + 'px',
    left: props.left + 'px'
  }
}))`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: ${props => props.theme.black};
  color: ${props => props.theme.white};
  transform: translate(-50%, -100%);
  transition: top 0.5s, left 0.5s;
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
    display: grid;
    justify-items: center;
    align-items: center;
    padding: 1rem;
    svg {
      width: 2rem;
      height: 2rem;
    }
  }
`

export default ({ show, top, left }) => {
  const actions = [
    { icon: <FormatBold /> },
    { icon: <FormatItalic /> },
    { icon: <FormatUnderlined /> },
    { icon: <FormatLink /> }
  ]
  return (
    <Container show={show} top={top} left={left}>
      {actions.map((action, i) => (
        <div key={i} className="action">
          {action.icon}
        </div>
      ))}
    </Container>
  )
}
