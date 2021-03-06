import React from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import Router from 'next/router'
import { UserContext } from '../lib/user-context'
import Meta from './Meta'
import Header from './Header'
import Signin from './Signin'
import Signup from './Signup'
import Menu from './Menu'
import User from './User'
import theme from './styles/Theme'

const StyledPage = styled.div`
  background: ${props => props.theme.white};
  color: ${props => props.theme.black};
`

const Inner = styled.div`
  margin: 0 auto;
`

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url('/static/Roboto-Regular.ttf') format('opentype');
    font-display: auto;
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto Slab';
    src: url('/static/RobotoSlab-Regular.ttf') format('opentype');
    font-display: auto;
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto Slab Bold';
    src: url('/static/RobotoSlab-Bold.ttf') format('opentype');
    font-display: auto;
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto Bold';
    src: url('/static/Roboto-Bold.ttf') format('opentype');
    font-display: auto;
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto Condensed';
    src: url('/static/RobotoCondensed-Regular.ttf') format('opentype');
    font-display: auto;
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto Condensed Bold';
    src: url('/static/RobotoCondensed-Bold.ttf') format('opentype');
    font-display: auto;
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Roboto Mono';
    src: url('/static/RobotoMono-Regular.ttf') format('opentype');
    font-display: auto;
    font-weight: normal;
    font-style: normal;
  }
  html {
    scroll-behavior: smooth;
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
  }
  a {
    text-decoration: none;
    color: inherit;
  }
  input,
  textarea {
    border: 0;
    outline: 0;
    color: ${theme.black};
    resize: none;
  }
`

const navigation = [
  { type: 'link', text: 'New Story', pathname: '/post-edit', id: 'new' },
  { type: 'link', text: 'Stories', pathname: '/my-posts' },
  { type: 'separator' },
  { type: 'link', text: 'Publications', pathname: '/my-publications' },
  { type: 'link', text: 'Customize your interests', pathname: '/my-interests' },
  { type: 'separator' },
  { type: 'link', text: 'Profile', pathname: '/profile' }
]

export default class Page extends React.Component {
  state = {
    showSignin: false,
    showSignup: false,
    showMenu: false,
    topic: ''
  }

  onSignin = () => this.setState({ showSignin: true })

  onSignup = () => this.setState({ showSignup: true })

  onSwitch = () =>
    this.setState(({ showSignin, showSignup }) => ({
      showSignin: !showSignin,
      showSignup: !showSignup
    }))

  onCloseModal = () => this.setState({ showSignin: false, showSignup: false })

  toggleMenu = () => this.setState(({ showMenu }) => ({ showMenu: !showMenu }))

  onCloseMenu = () => this.setState({ showMenu: false })

  onSignout = async signout => {
    const res = await signout()
    if (res.data.signout.success) {
      this.onCloseMenu()
      Router.push('/adios')
    }
  }

  setTopic = topic => this.setState({ topic })

  render() {
    const {
      state: { showSignin, showSignup, showMenu, topic }
    } = this
    return (
      <ThemeProvider theme={theme}>
        <User>
          {({ data, loading }) => {
            if (loading) return null
            return (
              <UserContext.Provider
                value={{
                  user: data.me,
                  onSignin: this.onSignin,
                  onSignup: this.onSignup,
                  toggleMenu: this.toggleMenu
                }}
              >
                <StyledPage>
                  <Meta />
                  <GlobalStyle />
                  <Header topic={topic} />
                  <Inner>
                    {React.Children.map(this.props.children, child =>
                      React.cloneElement(child, {
                        user: data.me,
                        setTopic: this.setTopic
                      })
                    )}
                  </Inner>
                  <Signin show={showSignin} onSwitch={this.onSwitch} onClose={this.onCloseModal} />
                  <Signup show={showSignup} onSwitch={this.onSwitch} onClose={this.onCloseModal} />
                  <Menu
                    show={showMenu}
                    width={23}
                    menuPosition={{ top: '6.5rem', right: '5rem' }}
                    arrowPosition="left: 21rem"
                    navigation={navigation}
                    onSignout={this.onSignout}
                    onClose={this.onCloseMenu}
                  />
                </StyledPage>
              </UserContext.Provider>
            )
          }}
        </User>
      </ThemeProvider>
    )
  }
}
