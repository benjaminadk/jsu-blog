import styled, { keyframes } from 'styled-components'
import PropTypes from 'prop-types'

const grow = keyframes`
  from {
    transform: scale(.25) translate(-50%, -50%);
  }
  to {
    transform: scale(1) translate(-50%, -50%);
  }
`

const ModalWindow = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.9);
`

const ModalMain = styled.div`
  position: fixed;
  max-width: 100%;
  height: auto;
  top: 50%;
  left: 50%;
  background: ${props => (props.transparent ? 'transparent' : props.theme.white)};
  transform: translate(-50%, -50%);
  transform-origin: left center;
  border-radius: ${props => props.theme.borderRadius};
  animation: ${grow} 200ms ease;
`

export default class Modal extends React.Component {
  modal = React.createRef()

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      document.body.addEventListener('click', this.onClickAway)
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onClickAway)
  }

  onClickAway = e => {
    if (e.target === this.modal.current) {
      this.props.onClose()
    }
  }

  render() {
    const {
      props: { children, show, transparent }
    } = this
    return (
      <ModalWindow ref={this.modal} show={show}>
        <ModalMain transparent={transparent}>{children}</ModalMain>
      </ModalWindow>
    )
  }
}

Modal.proptypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
}
