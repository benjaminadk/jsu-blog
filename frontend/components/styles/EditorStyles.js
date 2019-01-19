import styled from 'styled-components'
import { darken } from 'polished'

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
