import PropTypes from 'prop-types'
import Router from 'next/router'
import Signout from './Signout'
import { MenuOuter, MenuInner, MenuArrow, Backdrop } from './styles/MenuStyles'

export default class Menu extends React.Component {
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

  onClick = nav => {
    const { type, pathname, id, cb } = nav
    if (type === 'link') {
      let route
      if (id) {
        route = { pathname, query: { id } }
      } else {
        route = pathname
      }
      Router.push(route)
      return this.props.onClose()
    } else if (type === 'cb') {
      cb()
      return this.props.onClose()
    }
  }

  render() {
    const {
      props: { show, width, menuPosition, arrowPosition, navigation, onSignout }
    } = this
    return (
      <React.Fragment>
        <Backdrop ref={this.backdrop} show={show} />
        <MenuOuter show={show} position={menuPosition}>
          <MenuInner width={width}>
            <ul role="menu">
              {navigation.map((nav, i) => {
                if (nav.type === 'separator') {
                  return <li key={i} className="separator" />
                } else {
                  return (
                    <li key={i} className="list-item" onClick={() => this.onClick(nav)}>
                      {nav.text}
                    </li>
                  )
                }
              })}
              {onSignout && <Signout onClick={onSignout} />}
            </ul>
          </MenuInner>
          <MenuArrow position={arrowPosition} />
        </MenuOuter>
      </React.Fragment>
    )
  }
}

Menu.propTypes = {
  show: PropTypes.bool.isRequired,
  width: PropTypes.number.isRequired,
  menuPosition: PropTypes.object.isRequired,
  arrowPosition: PropTypes.string.isRequired,
  navigation: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      text: PropTypes.string,
      pathname: PropTypes.string,
      id: PropTypes.string
    })
  ),
  onSignout: PropTypes.func,
  onClose: PropTypes.func.isRequired
}
