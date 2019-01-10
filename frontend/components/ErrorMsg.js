import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Error as ErrorIcon } from 'styled-icons/boxicons-solid'

const Container = styled.div`
  background: #fff3f3;
  margin: 1rem 0;
  padding: 1rem;
  border-left: 5px solid #d62929;
  box-shadow: ${props => props.theme.shadows[1]};
  p {
    margin: 0;
    font-size: 1.25rem;
  }
  span {
    margin-right: 0.25rem;
    svg {
      width: 2rem;
      height: 2rem;
      color: #d62929;
    }
  }
`

const ErrorMsg = ({ error }) => {
  if (!error || !error.message) return null
  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors.map((error, i) => (
      <Container key={i}>
        <p>
          <span>
            <ErrorIcon />
          </span>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </Container>
    ))
  }
  return (
    <Container>
      <p>
        <span>
          <ErrorIcon />
        </span>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </Container>
  )
}

ErrorMsg.defaultProps = {
  error: {}
}

ErrorMsg.propTypes = {
  error: PropTypes.object
}

export default ErrorMsg
