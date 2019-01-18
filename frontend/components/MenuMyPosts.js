import { MenuOuter, MenuInner, MenuArrow, Backdrop } from './styles/Menu'
import Router from 'next/router'

export default class MyPostsMenu extends React.Component {
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

  onClick = (type, id) => {}

  render() {
    const {
      props: { show, menu, navigation }
    } = this
    const position = {
      top: show ? `calc(${menu.y}px + 2rem)` : 0,
      left: show ? `calc(${menu.x}px - 7.5rem)` : 0
    }
    return (
      <React.Fragment>
        <Backdrop ref={this.backdrop} show={show} />
        <MenuOuter show={show} position={position}>
          <MenuInner width={15}>
            <ul role="menu">
              {navigation.map((nav, i) => (
                <li key={i} className="list-item" onClick={() => this.onClick(nav.type, nav.id)}>
                  {nav.text}
                </li>
              ))}
            </ul>
          </MenuInner>
          <MenuArrow position="left: 7.5rem;" />
        </MenuOuter>
      </React.Fragment>
    )
  }
}
