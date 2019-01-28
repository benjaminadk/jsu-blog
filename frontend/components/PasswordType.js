import styled from 'styled-components'
import { Eye } from 'styled-icons/octicons/Eye'
import { EyeClosed } from 'styled-icons/octicons/EyeClosed'
import PropTypes from 'prop-types'
import { darken } from 'polished'

const Container = styled.span`
  position: absolute;
  top: 1rem;
  right: 0;
  color: ${props => props.theme.grey[8]};
  cursor: pointer;
  transition: all 0.25s;
  &:hover {
    color: ${props => darken(0.05, props.theme.primary)};
  }
  svg {
    width: 2rem;
    height: 2rem;
    color: inherit;
  }
`

const PasswordType = ({ type, onClick }) => (
  <Container onClick={onClick}>{type === 'password' ? <EyeClosed /> : <Eye />}</Container>
)

PasswordType.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default PasswordType
