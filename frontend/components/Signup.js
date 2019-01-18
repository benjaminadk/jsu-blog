import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import PropTypes from 'prop-types'
import Router from 'next/router'
import Modal from './Modal'
import Form from './styles/Form'
import Close from './styles/Close'
import ErrorMsg from './ErrorMsg'
import PasswordType from './PasswordType'
import { ME_QUERY } from './User'

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      success
      message
    }
  }
`

const initialState = {
  email: '',
  name: '',
  password: '',
  passwordType: 'password'
}

export default class Signup extends React.Component {
  state = initialState

  onChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  togglePasswordType = () =>
    this.setState(({ passwordType }) => ({
      passwordType: passwordType === 'text' ? 'password' : 'text'
    }))

  onSubmit = async (e, signup) => {
    e.preventDefault()
    const { email, name, password } = this.state
    const res = await signup({
      variables: { email, name, password }
    })
    if (res.data.signup.success) {
      this.setState(initialState)
      Router.push('/')
      this.props.onClose()
    }
  }

  render() {
    const {
      props: { show, onClose, onSwitch },
      state: { email, name, password, passwordType }
    } = this
    return (
      <Mutation mutation={SIGNUP_MUTATION} refetchQueries={[{ query: ME_QUERY }]}>
        {(signup, { loading, error }) => (
          <Modal show={show} onClose={onClose}>
            <Form onSubmit={e => this.onSubmit(e, signup)}>
              <Close onClick={onClose} />
              <h1>Join Blog.io</h1>
              <p>
                Create an account to customize your blog, follow your favorite writers and ignite
                the stories you like, and more.
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
                    spellCheck={false}
                  />
                </label>

                <label>
                  <span>Your name</span>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={this.onChange}
                    required
                    tabIndex={2}
                    spellCheck={false}
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
                    spellCheck={false}
                  />
                  <PasswordType type={passwordType} onClick={this.togglePasswordType} />
                </label>

                <ErrorMsg error={error} />

                <div className="signup">
                  <input type="submit" value={loading ? '🥚👶👧👩👩‍🦳' : 'Create Account'} />
                  <span>
                    Already have an account?<span onClick={onSwitch}>Sign in.</span>
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

Signup.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSwitch: PropTypes.func.isRequired
}
