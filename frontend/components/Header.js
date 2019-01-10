import styled from 'styled-components'
import Router from 'next/router'
import NProgress from 'nprogress'
import Register from './Register'

Router.onRouteChangeStart = () => {
  NProgress.start()
}

Router.onRouteChangeComplete = () => {
  NProgress.done()
}

Router.onRouteChangeError = () => {
  NProgress.done()
}

const Container = styled.header`
  height: 6rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  background: ${props => props.theme.grey[0]};
  border-bottom: 1px solid ${props => props.theme.grey[3]};
  padding: 0 5rem;
`

const Logo = styled.div`
  font-size: 3rem;
`

export default class Header extends React.Component {
  render() {
    return (
      <Container>
        <Logo onClick={() => Router.push('/')}>Blog.io</Logo>
        <div />
        <Register />
      </Container>
    )
  }
}
