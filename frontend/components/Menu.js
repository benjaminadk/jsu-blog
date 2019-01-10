import styled from 'styled-components'
import PropTypes from 'prop-types'
import Router from 'next/router'
import Signout from './Signout'

const Container = styled.div`
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  position: absolute;
  top: 6.5rem;
  right: 5rem;
  z-index: 100;
  .arrow {
    position: absolute;
    top: -0.6rem;
    left: 21rem;
    margin-left: -0.7rem;
    &::after {
      content: '';
      display: block;
      width: 1.4rem;
      height: 1.4rem;
      background: ${props => props.theme.white};
      transform: rotate(45deg);
      box-shadow: -1px -1px 1px -1px rgba(0, 0, 0, 0.75);
    }
  }
`

const Backdrop = styled.div`
  visibility: ${props => (props.show ? 'visible' : 'hidden')};
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100vw;
  height: 100vh;
  background: transparent;
`

const Inner = styled.div`
  width: 23rem;
  border: 1px solid ${props => props.theme.grey[3]};
  border-radius: ${props => props.theme.borderRadius};
  background: ${props => props.theme.white};
  padding: 0;
  line-height: 1.4;
  box-shadow: ${props => props.theme.shadows[1]};
  ul {
    padding: 0.75rem 0;
    margin: 0;
    list-style: none;
    list-style-image: none;
    .separator {
      border-top: 1px solid ${props => props.theme.grey[3]};
      margin: 1rem 0;
    }
    .list-item {
      color: ${props => props.theme.grey[12]};
      font-size: 1.4rem;
      padding: 1rem 2rem;
      cursor: pointer;
      transition: color 0.25s;
      &:hover {
        color: ${props => props.theme.black};
      }
    }
  }
`

const navigation = [
  { text: 'New Post', pathname: '/post-new' },
  { text: 'separator' },
  { text: 'Profile', pathname: '/profile' }
]

class Menu extends React.Component {
  backdrop = React.createRef()

  componentDidUpdate(prevProps) {
    if (!prevProps.show && this.props.show) {
      document.body.addEventListener('click', this.onClickAway)
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onClickAway)
  }

  onClickAway = e => {
    if (e.target === this.backdrop.current) {
      this.props.onClose()
    }
  }

  onClick = pathname => {
    Router.push(pathname)
    this.props.onClose()
  }

  render() {
    const {
      props: { show, onSignout }
    } = this
    return (
      <React.Fragment>
        <Backdrop ref={this.backdrop} show={show} />
        <Container show={show}>
          <Inner>
            <ul role="menu">
              {navigation.map((nav, i) => {
                if (nav.text === 'separator') {
                  return <li key={i} className="separator" />
                } else {
                  return (
                    <li key={i} className="list-item" onClick={() => this.onClick(nav.pathname)}>
                      {nav.text}
                    </li>
                  )
                }
              })}
              <Signout onClick={onSignout} />
            </ul>
          </Inner>
          <div className="arrow" />
        </Container>
      </React.Fragment>
    )
  }
}

Menu.propTypes = {
  show: PropTypes.bool.isRequired,
  onSignout: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Menu
