import styled from 'styled-components'
import { UserContext } from '../lib/user-context'
import { ButtonText, ButtonOutline } from './styles/Button'

const NotRegistered = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`

const Registered = styled.div`
  width: 6rem;
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
            <ButtonText onClick={onSignin}>Sign in</ButtonText>
            <ButtonOutline onClick={onSignup}>Get started</ButtonOutline>
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
