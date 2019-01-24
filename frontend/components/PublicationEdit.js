import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import { ButtonSave } from './styles/Button'
import formatUrl from '../lib/formatUrl'

const CREATE_PUBLICATION_MUTATION = gql`
  mutation CREATE_PUBLICATION_MUTATION($data: PublicationCreateInput) {
    createPublication(data: $data) {
      success
      message
      id
    }
  }
`

const SINGLE_PUBLICATION_QUERY = gql`
  query SINGLE_PUBLICATION_QUERY($id: ID!) {
    publication(id: $id) {
      id
      name
    }
  }
`

const Container = styled.div`
  display: grid;
  justify-items: center;
  .content {
    width: 75%;
    margin-top: 2rem;
    .heading {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      h1 {
        font-family: 'Roboto Bold';
        font-size: 4.5rem;
      }
      & > :last-child {
        justify-self: flex-end;
      }
    }
  }
  .form {
    .row {
      display: grid;
      grid-template-columns: 1fr 3fr;
      .label {
        font-family: 'Roboto Bold';
        font-size: 2rem;
      }
      .input {
        display: flex;
        flex-direction: column;
        font-family: 'Roboto Slab';
        input[type='text'] {
          font-size: 1.75rem;
          border-bottom: 1px solid ${props => props.theme.grey[2]};
          &:focus {
            border-bottom: 1px solid ${props => props.theme.grey[5]};
          }
        }
        span {
          font-size: 1.25rem;
          color: ${props => props.theme.grey[5]};
        }
      }
    }
  }
`

class PublicationEdit extends React.Component {
  state = {
    clean: true,
    title: '',
    id: '',
    name: '',
    description: '',
    avatar: '',
    logo: ''
  }

  async componentDidMount() {
    let res
    if (this.props.id && this.props.id !== 'new') {
    } else {
      this.setState({ title: 'New Publication' })
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value })

  render() {
    const {
      state: { clean, title, id, name, description, avatar, logo }
    } = this
    return (
      <Container>
        <div className="content">
          <div className="heading">
            <h1>{title}</h1>
            <ButtonSave clean={clean}>Save</ButtonSave>
          </div>
          <div className="form">
            <div className="row">
              <span className="label">Name *</span>
              <div className="input">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.onChange}
                  spellCheck={false}
                />
                <span>
                  Link: medium.com/
                  {name ? formatUrl(name) : '...'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    )
  }
}

export default withApollo(PublicationEdit)
