import styled from 'styled-components'
import { Camera as CameraIcon } from 'styled-icons/feather'
import { Plus as PlusIcon, Code as CodeIcon } from 'styled-icons/boxicons-regular'
import { Eye as EyeIcon } from 'styled-icons/octicons'

const Command = styled.span.attrs(props => ({
  style: { top: `calc(${props.top}px + 4rem)` }
}))`
  position: absolute;
  left: -5rem;
  width: 3rem;
  height: 3rem;
  display: grid;
  justify-items: center;
  align-items: center;
  opacity: ${props => (Boolean(props.top) ? 1 : 0)};
  background: ${props => props.theme.white};
  color: ${props => props.theme.grey[8]};
  border: 1px solid;
  border-radius: 50%;
  cursor: pointer;
  transition: color 0.1s, transform 0.2s;
  &:hover {
    color: ${props => props.theme.grey[12]};
  }
  svg {
    width: 2rem;
    height: 2rem;
    color: inherit;
  }
`

const Plus = styled(Command)`
  transform: rotate(${props => (props.expand ? '45deg' : 0)});
`

const Camera = styled(Command)`
  left: 0;
  transform: scale(${props => (props.expand ? 1 : 0)});
  transition: transform 0.2s ${props => (props.expand ? 0 : '.1s')};
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`

const Code = styled(Command)`
  left: 3.5rem;
  transform: scale(${props => (props.expand ? 1 : 0)});
  transition: transform 0.2s ${props => (props.expand ? '.2s' : 0)};
  svg {
    width: 1.75rem;
    height: 1.75rem;
  }
`

const Eye = styled(Command)`
  left: 6.95rem;
  transform: scale(${props => (props.expand ? 1 : 0)});
  transition: transform 0.2s ${props => (props.expand ? '.3s' : 0)};
  svg {
    width: 1.75rem;
    height: 1.75rem;
  }
`

export default ({ top, expand, toggleExpander, togglePreview }) => (
  <React.Fragment>
    <Plus top={top} expand={expand} onClick={toggleExpander}>
      <PlusIcon />
    </Plus>
    <Camera top={top} expand={expand}>
      <CameraIcon />
    </Camera>
    <Code top={top} expand={expand}>
      <CodeIcon />
    </Code>
    <Eye top={top} expand={expand} onClick={togglePreview}>
      <EyeIcon />
    </Eye>
  </React.Fragment>
)
