import styled from 'styled-components'
import { darken, lighten, transparentize } from 'polished'
import PropTypes from 'prop-types'

const Container = styled.div`
  justify-self: center;
  align-self: center;
  position: relative;
  width: 20rem;
  height: 20rem;
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: ${props => props.theme.grey[0]};
  background-image: ${props => (props.image ? `url("${props.image}")` : 'none')};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: ${props => (props.image ? 'none' : `2px dashed ${props.theme.grey[5]}`)};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => (props.image ? props.theme.shadows[1] : 'none')};
  cursor: pointer;
  transition: all 0.25s;
  &:hover {
    border: ${props => (props.image ? 'none' : `2px dashed ${darken(0.1, props.theme.primary)}`)};
    background-color: ${props =>
      props.image ? 'none' : `${transparentize(0.85, lighten(0.2, props.theme.primary))}`};
  }
  input[type='file'] {
    display: none;
  }
  .message {
    display: ${props => (props.image ? 'none' : 'flex')};
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto Slab Bold';
    font-weight: normal;
    background: transparent;
    & > :first-child {
      font-size: 1.5rem;
      color: ${props => props.theme.grey[10]};
    }
    & > :last-child {
      font-size: 1.25rem;
      color: ${props => props.theme.grey[5]};
    }
  }
`

const Featured = ({ inputRef, image, onClick, onChange }) => (
  <Container image={image} onClick={onClick}>
    <div className="message">
      <span>Featured Image</span> <span>Click to +</span>
    </div>
    <input ref={inputRef} type="file" accept="image/*" multiple={false} onChange={onChange} />
  </Container>
)

Featured.propTypes = {
  onChange: PropTypes.func.isRequired
}

export default Featured
