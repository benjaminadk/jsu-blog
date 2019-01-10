import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import Form from './styles/Form'
import Close from './styles/Close'
import Modal from './Modal'
import ErrorMsg from './ErrorMsg'
import PasswordType from './PasswordType'
import { ME_QUERY } from './User'

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      success
      message
    }
  }
`

const initialState = {
  email: '',
  password: '',
  passwordType: 'password'
}

export default class Signin extends React.Component {
  state = initialState

  onChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  togglePasswordType = () =>
    this.setState(({ passwordType }) => ({
      passwordType: passwordType === 'text' ? 'password' : 'text'
    }))

  onSubmit = async (e, signin) => {
    e.preventDefault()
    const { email, password } = this.state
    const res = await signin({
      variables: { email, password }
    })
    if (res.data.signin.success) {
      this.setState(initialState)
      Router.push('/')
      this.props.onClose()
    }
  }

  render() {
    const {
      props: { show, onClose, onSwitch },
      state: { email, password, passwordType }
    } = this
    return (
      <Mutation mutation={SIGNIN_MUTATION} refetchQueries={[{ query: ME_QUERY }]}>
        {(signin, { loading, error }) => (
          <Modal show={show} onClose={onClose}>
            <Form onSubmit={e => this.onSubmit(e, signin)}>
              <Close onClick={onClose} />
              <h1>Welcome Back.</h1>
              <p>
                Sign in to access your customized blog, follow writers and topics you like, and set
                fire to stories you want to see burn.
              </p>
              <fieldset disabled={loading}>
                <label>
                  <span>Your email</span>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    required
                    autoFocus
                    tabIndex={1}
                  />
                </label>

                <label>
                  <span>Your password</span>
                  <input
                    type={passwordType}
                    name="password"
                    value={password}
                    onChange={this.onChange}
                    required
                    minLength={8}
                    tabIndex={3}
                  />
                  <PasswordType type={passwordType} onClick={this.togglePasswordType} />
                </label>

                <ErrorMsg error={error} />

                <div className="signup">
                  <input type="submit" value={loading ? 'Signing in' : 'Sign in'} />
                  <span>
                    Don't have an account?<span onClick={onSwitch}>Make one.</span>
                  </span>
                </div>
              </fieldset>
            </Form>
          </Modal>
        )}
      </Mutation>
    )
  }
}

Signin.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSwitch: PropTypes.func.isRequired
}
