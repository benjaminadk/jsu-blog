import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'
import { Camera } from 'styled-icons/feather'
import NProgress from 'nprogress'
import axios from 'axios'
import { ButtonSave } from './styles/Button'
import formatUrl from '../lib/formatUrl'
import formatFilename from '../lib/formatFilename'
import { SIGN_S3_MUTATION } from './ProfileEdit'

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
      margin-bottom: 2rem;
      .label {
        font-family: 'Roboto Bold';
        font-size: 2rem;
      }
      .text-input {
        display: flex;
        flex-direction: column;
        input[type='text'] {
          font-family: 'Roboto Slab';
          font-size: 1.5rem;
          border-bottom: 1px solid ${props => props.theme.grey[2]};
          padding: 0.5rem 0;
          &:focus {
            border-bottom: 1px solid ${props => props.theme.grey[7]};
          }
          &::placeholder {
            color: ${props => props.theme.grey[5]};
          }
        }
        span {
          font-family: 'Roboto Slab';
          font-size: 1.25rem;
          color: ${props => props.theme.grey[5]};
        }
      }
      .image-input {
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        grid-gap: 5rem;
        align-items: center;
        font-family: 'Roboto Slab';
        .left {
          display: flex;
          flex-direction: column;
          & > :first-child {
            font-size: 1.5rem;
            cursor: pointer;
            &:hover {
              color: ${props => props.theme.grey[10]};
            }
          }
          & > :last-child {
            font-size: 1.25rem;
            text-align: justify;
            color: ${props => props.theme.grey[5]};
          }
        }
        .right {
          .image {
            width: 10rem;
            height: 10rem;
            display: grid;
            justify-items: center;
            align-items: center;
            color: ${props => props.theme.grey[5]};
            border: 2px solid ${props => props.theme.grey[5]};
            border-radius: ${props => props.theme.borderRadius};
            cursor: pointer;
            &:hover {
              color: ${props => props.theme.grey[10]};
            }
            svg {
              width: 5rem;
              height: 5rem;
              color: inherit;
            }
          }
          input[type='file'] {
            display: none;
          }
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

  file1 = React.createRef()

  async componentDidMount() {
    let res
    if (this.props.id && this.props.id !== 'new') {
    } else {
      this.setState({ title: 'New Publication' })
    }
  }

  onChange = e => this.setState({ [e.target.name]: e.target.value, clean: false })

  onClickFile1 = () => this.file1.current.click()

  onFile = async (e, signS3, property) => {
    NProgress.start()
    const { id } = this.props.user
    const file = e.target.files[0]
    const filename = formatFilename('user', id, 'publication', file.name)
    const filetype = file.type
    const res = await signS3({ variables: { filename, filetype } })
    const { requestUrl, imageUrl } = res.data.signS3
    await axios({
      method: 'PUT',
      url: requestUrl,
      data: file,
      headers: {
        'Content-Type': filetype
      },
      onUploadProgress: e => {
        const completed = Math.round((e.loaded * 100) / e.total)
        if (completed === 100) {
          NProgress.done()
          this.setState({ [property]: imageUrl, clean: false })
        }
      }
    })
  }

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
              <div className="text-input">
                <input
                  type="text"
                  placeholder="Type your publication's name"
                  name="name"
                  value={name}
                  onChange={this.onChange}
                  spellCheck={false}
                />
                <span>
                  Link: medium.com/publication/
                  {name ? formatUrl(name) : '...'}
                </span>
              </div>
            </div>

            <div className="row">
              <div className="label">Description *</div>
              <div className="text-input">
                <input
                  type="text"
                  placeholder="Type a short description"
                  name="description"
                  value={description}
                  onChange={this.onChange}
                />
                <span>This will be used in footers, search results, and other places.</span>
              </div>
            </div>

            <Mutation mutation={SIGN_S3_MUTATION}>
              {(signS3, { loading, error }) => (
                <div className="row">
                  <div className="label">Avatar *</div>
                  <div className="image-input">
                    <div className="left">
                      <span onClick={this.onClickFile1}>Add Image...</span>
                      <span>
                        This works like a user icon and appears in previews of your publication
                        content throughout Blog.io. It is square and should be at least 60 × 60px in
                        size.
                      </span>
                    </div>
                    <div className="right">
                      <div className="image" onClick={this.onClickFile1}>
                        <Camera />
                      </div>
                      <input
                        ref={this.file1}
                        type="file"
                        onChange={e => this.onFile(e, signS3, 'avatar')}
                      />
                    </div>
                  </div>
                </div>
              )}
            </Mutation>
          </div>
        </div>
      </Container>
    )
  }
}

export default withApollo(PublicationEdit)
