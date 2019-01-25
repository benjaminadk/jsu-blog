import styled from 'styled-components'
import { darken } from 'polished'

const Input = styled.div`
  position: relative;
  padding-left: 5rem;
  font-family: 'Roboto Slab';
  border-left: 0.5px solid ${props => (props.show ? props.theme.grey[5] : 'none')};
  span {
    display: ${props => (props.show ? 'block' : 'none')};
    position: absolute;
    left: -6rem;
    font-size: 1.1rem;
    color: ${props => props.theme.grey[5]};
  }
  input {
    width: 100%;
    font-size: 4.25rem;
    font-family: inherit;
  }
`

export const TitleInput = styled(Input)`
  span {
    top: 1.5rem;
  }
`

export const SubtitleInput = styled(Input)`
  span {
    top: 0.5rem;
  }
  input {
    font-size: 2.5rem;
    color: ${props => props.theme.grey[10]};
  }
`

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const SubHeading = styled.span`
  font-family: 'Roboto Slab Bold';
  color: ${props => props.theme.grey[10]};
`

export const IconButton = styled.div`
  width: 5rem;
  display: grid;
  justify-items: center;
  align-items: center;
  color: ${props => props.theme.grey[10]};
  cursor: pointer;
  transition: color 0.25s;
  &:hover {
    color: ${props =>
      props.color === 'red' ? props.theme.error : darken(0.1, props.theme.primary)};
  }
  svg {
    width: 2rem;
    height: 2rem;
    color: inherit;
  }
`

export const PublishIconButton = styled(IconButton)`
  color: ${props => (props.checked ? darken(0.1, props.theme.primary) : props.theme.grey[5])};
`
