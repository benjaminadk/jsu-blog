import styled from 'styled-components'
import { darken } from 'polished'
import { UserContext } from '../lib/user-context'

const NotRegistered = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  button {
    background: transparent;
    color: ${props => props.theme.primary};
    border: 0;
    outline: 0;
    font-family: ${props => props.theme.primaryFont};
    font-size: 1.35rem;
    cursor: pointer;
    transition: all 0.25s;
    &:hover {
      color: ${props => darken(0.025, props.theme.primary)};
    }
  }
  & > :last-child {
    background: ${props => props.theme.white};
    border: 1px solid;
    border-radius: ${props => props.theme.borderRadius};
    padding: 0.75rem 1.5rem;
  }
`

const Registered = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
  & > :first-child {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: ${props => props.theme.grey[0]};
    cursor: pointer;
    user-select: none;
  }
`

const Register = () => (
  <UserContext.Consumer>
    {({ user, onSignin, onSignup, toggleMenu }) => {
      if (!user) {
        return (
          <NotRegistered>
            <button onClick={onSignin}>Sign in</button>
            <button onClick={onSignup}>Get started</button>
          </NotRegistered>
        )
      } else {
        return (
          <Registered>
            <img src={user.image} alt="avatar" onClick={toggleMenu} />
          </Registered>
        )
      }
    }}
  </UserContext.Consumer>
)

export default Register
