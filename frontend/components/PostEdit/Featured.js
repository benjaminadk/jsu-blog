import styled from 'styled-components'
import { Trashcan } from 'styled-icons/octicons'
import { darken, lighten, transparentize } from 'polished'
import PropTypes from 'prop-types'
import { Row, SubHeading, IconButton } from '../styles/PostEditStyles'

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
  color: ${props => props.theme.grey[5]};
  cursor: pointer;
  transition: all 0.25s;
  &:hover {
    border: ${props => (props.image ? 'none' : `2px dashed ${darken(0.1, props.theme.primary)}`)};
    background-color: ${props =>
      props.image ? 'none' : `${transparentize(0.85, lighten(0.2, props.theme.primary))}`};
    color: ${props => darken(0.1, props.theme.primary)};
  }
  input[type='file'] {
    display: none;
  }
  .message {
    display: ${props => (props.image ? 'none' : 'flex')};
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto Bold';
    font-weight: normal;
    background: transparent;
    color: inherit;
    span {
      font-size: 3rem;
    }
  }
`

const Featured = ({ inputRef, image, onClick, onChange, onDelete }) => (
  <React.Fragment>
    <Row>
      <SubHeading>Featured Image</SubHeading>
      <IconButton color="red" onClick={onDelete}>
        <Trashcan />
      </IconButton>
    </Row>
    <Container image={image} onClick={onClick}>
      <div className="message">
        <span>+</span>
      </div>
      <input ref={inputRef} type="file" accept="image/*" multiple={false} onChange={onChange} />
    </Container>
  </React.Fragment>
)

Featured.propTypes = {
  image: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

export default Featured
