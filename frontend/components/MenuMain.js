import PropTypes from 'prop-types'
import Router from 'next/router'
import { MenuOuter, MenuInner, MenuArrow, Backdrop } from './styles/Menu'
import Signout from './Signout'

const navigation = [
  { text: 'New Story', pathname: '/post-edit', id: 'new' },
  { text: 'Stories', pathname: '/my-posts' },
  { text: 'separator' },
  { text: 'Profile', pathname: '/profile' }
]

class MenuMain extends React.Component {
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

  onClick = (pathname, id) => {
    let route
    if (id) {
      route = { pathname, query: { id } }
    } else {
      route = pathname
    }
    Router.push(route)
    this.props.onClose()
  }

  render() {
    const {
      props: { show, onSignout }
    } = this
    return (
      <React.Fragment>
        <Backdrop ref={this.backdrop} show={show} />
        <MenuOuter show={show} position={{ top: '6.5rem', right: '5rem' }}>
          <MenuInner width={23}>
            <ul role="menu">
              {navigation.map((nav, i) => {
                if (nav.text === 'separator') {
                  return <li key={i} className="separator" />
                } else {
                  return (
                    <li
                      key={i}
                      className="list-item"
                      onClick={() => this.onClick(nav.pathname, nav.id)}
                    >
                      {nav.text}
                    </li>
                  )
                }
              })}
              <Signout onClick={onSignout} />
            </ul>
          </MenuInner>
          <MenuArrow position="left: 21rem" />
        </MenuOuter>
      </React.Fragment>
    )
  }
}

MenuMain.propTypes = {
  show: PropTypes.bool.isRequired,
  onSignout: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
}

export default MenuMain
