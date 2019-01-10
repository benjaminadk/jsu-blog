import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Close as CloseIcon } from 'styled-icons/material'

export const Container = styled.span`
  position: absolute;
  top: 0;
  right: 0.75rem;
  color: ${props => props.theme.grey[5]};
  cursor: pointer;
  & > :first-child {
    width: 2rem;
    height: 2rem;
    color: inherit;
  }
`

const Close = ({ onClick }) => (
  <Container onClick={onClick}>
    <CloseIcon />
  </Container>
)

Close.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default Close
