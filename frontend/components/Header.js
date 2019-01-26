import styled from 'styled-components'
import Router from 'next/router'
import NProgress from 'nprogress'
import Register from './Register'
import Search from './Search'
import formatInitCap from '../lib/formatInitCap'

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
  grid-template-columns: auto 1fr auto auto;
  background: ${props => props.theme.grey[0]};
  border-bottom: 1px solid ${props => props.theme.grey[3]};
  padding: 0 5rem;
`

const Logo = styled.div`
  display: grid;
  grid-template-columns: ${props => (props.topic ? '10rem auto' : '1fr')};
  .title {
    align-self: center;
    font-size: 3rem;
    font-family: 'Roboto Slab';
    cursor: pointer;
  }
  .topic {
    align-self: center;
    display: grid;
    align-items: flex-end;
    border-left: 2px solid ${props => props.theme.grey[1]};
    margin-left: 0.75rem;
    padding-left: 0.75rem;
    p {
      padding: 0;
      margin: 0;
      color: ${props => props.theme.grey[14]};
      font-size: 1.75rem;
      font-family: 'Roboto';
    }
  }
`

export default class Header extends React.Component {
  onLogoClick = () => Router.push('/')

  render() {
    const {
      props: { topic }
    } = this
    return (
      <Container>
        <Logo topic={topic} onClick={this.onLogoClick}>
          <span className="title">Blog.io</span>
          {topic && (
            <div className="topic">
              <p>{formatInitCap(topic)}</p>
            </div>
          )}
        </Logo>
        <div />
        <Search />
        <Register />
      </Container>
    )
  }
}
