import styled from 'styled-components'
import { darken } from 'polished'

const Button = styled.button`
  color: ${props => darken(0.05, props.theme.primary)};
  border: 0;
  outline: 0;
  font-size: 1.35rem;
  font-family: 'Roboto Slab Bold';
  cursor: pointer;
  transition: all 0.25s;
  &:hover {
    color: ${props => darken(0.1, props.theme.primary)};
  }
`

export const ButtonText = styled(Button)`
  background: transparent;
`

export const ButtonOutline = styled(Button)`
  background: ${props => props.theme.white};
  border: 2px solid;
  border-radius: ${props => props.theme.borderRadius};
  padding: 0.75rem 1.5rem;
`
