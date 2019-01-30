import throttle from 'lodash.throttle'
import styled from 'styled-components'

const Progress = styled.div`
  position: fixed;
  display: block;
  top: 0;
  width: 100vw;
  height: 0.5rem;
  background: transparent;
  z-index: 2;
`
const Bar = styled.div.attrs(props => ({
  style: { width: `${props.width}vw` }
}))`
  position: absolute;
  top: 0;
  left: 0;
  height: 0.5rem;
  background: ${props => props.theme.secondary};
  transition: width 0.1s;
  z-index: 1;
`

export default class Reading extends React.Component {
  constructor(props) {
    super(props)
    this.targetEl = null
    this.rootEl = null
    this.max = 0
    this.viewportHeight = 0
    this.targetHeight = 0
    this.state = {
      width: 0
    }
  }

  componentDidMount() {
    const { props } = this
    this.targetEl = props.targetEl ? document.querySelector(props.targetEl) : document.body
    this.rootEl = props.rootEl ? document.querySelector(props.rootEl) : window
    this.targetHeight = this.targetEl.getBoundingClientRect().height
    this.viewportHeight = this.measureViewportHeight()
    this.max = this.targetHeight - this.viewportHeight + this.targetEl.offsetTop

    this.rootEl.addEventListener('scroll', this.update)
    window.addEventListener('resize', this.measure)
    this.update()
  }

  componentWillUnmount() {
    this.rootEl.removeEventListener('scroll', this.update)
    window.removeEventListener('resize', this.measure)
  }

  measureViewportHeight() {
    return !this.props.rootEl
      ? Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
      : this.rootEl.clientHeight
  }

  measure = throttle(() => {
    this.targetHeight = this.targetEl.getBoundingClientRect().height
    this.viewportHeight = this.measureViewportHeight()
    this.max = this.targetHeight - this.viewportHeight + this.targetEl.offsetTop
  }, 100)

  update = throttle(() => {
    const value = !this.props.rootEl
      ? window.pageYOffset || document.documentElement.scrollTop
      : this.rootEl.scrollTop
    const width = Math.round((value / this.max) * 1000) / 10
    this.setState({ width })
  }, 100)

  render() {
    return (
      <Progress>
        <Bar width={this.state.width} />
      </Progress>
    )
  }
}
