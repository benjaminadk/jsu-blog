import styled from 'styled-components'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import axios from 'axios'
import NProgress from 'nprogress'
import { darken } from 'polished'
import { Camera } from 'styled-icons/feather'
import PropTypes from 'prop-types'
import formatFilename from '../lib/formatFilename'
import { ME_QUERY } from './User'

export const SIGN_S3_MUTATION = gql`
  mutation SIGN_S3_MUTATION($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      requestUrl
      imageUrl
    }
  }
`

const UPDATE_USER_MUTATION = gql`
  mutation UPDATE_USER_MUTATION($name: String, $bio: String, $image: String) {
    updateUser(name: $name, bio: $bio, image: $image) {
      success
      message
    }
  }
`

const Container = styled.div`
  display: grid;
  justify-items: center;
  .user-form {
    width: 50%;
    display: grid;
    grid-template-columns: 1fr 12rem;
    margin-top: 5rem;
    .text-inputs {
      display: flex;
      flex-direction: column;
      input,
      textarea {
        outline: 0;
        border: 0;
        color: ${props => props.theme.black};
        padding: 0 3rem 0 0;
        resize: none;
      }
      input {
        font-size: 3rem;
      }
      textarea {
        font-size: 1.65rem;
      }
      span {
        font-size: 1rem;
      }
    }
  }
  .actions {
    width: 50%;
    button {
      background: ${props => props.theme.white};
      color: ${props => props.theme.primary};
      border: 1px solid;
      border-radius: ${props => props.theme.borderRadius};
      outline: 0;
      padding: 0.85rem 1.25rem;
      margin-right: 1rem;
      cursor: pointer;
      transition: all 0.25s;
      &:hover {
        color: ${props => `${darken(0.05, props.theme.primary)}`};
      }
    }
    & > :last-child {
      color: ${props => props.theme.grey[7]};
      &:hover {
        color: ${props => props.theme.grey[10]};
      }
    }
  }
`

const ImageUpload = styled.div`
  width: 10rem;
  height: 10rem;
  display: grid;
  justify-items: center;
  align-items: center;
  border-radius: 50%;
  background-image: ${props =>
    `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url("${props.image}")`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.white};
  }
  svg {
    width: 4rem;
    height: 4rem;
    stroke-width: 1.5px;
    color: inherit;
  }
  input[type='file'] {
    display: none;
  }
`

class ProfileEdit extends React.Component {
  state = {
    imageUrl: '',
    showLimit: false,
    clean: true
  }

  file = React.createRef()

  onChange = e => {
    const { name, value } = e.target
    if (name === 'bio') {
      this.setState({ showLimit: value.length > 105 })
    }
    this.setState({ [name]: value, clean: false })
  }

  onFile = async (e, signS3) => {
    NProgress.start()
    const { id } = this.props.user
    const file = e.target.files[0]
    const filename = formatFilename('avatars', id, file.name)
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
          this.setState({ imageUrl, clean: false })
        }
      }
    })
  }

  onSave = async updateUser => {
    const { imageUrl: image, name, bio } = this.state
    const args = { image, name, bio }
    const variables = {}
    for (let x in args) {
      if (args[x]) {
        variables[x] = args[x]
      }
    }
    if (!Object.keys(variables).length) return alert('Change something before updating!')
    const res = await updateUser({ variables })
    if (res.data.updateUser.success) {
      Router.push('/profile')
    }
  }

  onCancel = () => {
    if (this.state.clean) {
      return Router.push('/profile')
    } else {
      if (confirm('Are you sure you want to leave this page before saving?')) {
        return Router.push('/profile')
      }
    }
  }

  render() {
    const {
      props: { user },
      state: { imageUrl, bio, showLimit }
    } = this
    return (
      <Container>
        <div className="user-form">
          <div className="text-inputs">
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              defaultValue={user.name}
              onChange={this.onChange}
              maxLength={30}
              autoFocus
              tabIndex={1}
              required
              spellCheck={false}
            />
            <textarea
              type="text"
              name="bio"
              placeholder="Enter a short bio"
              defaultValue={user.bio}
              onChange={this.onChange}
              maxLength={160}
              rows={4}
              tabIndex={2}
              required
            />
            {showLimit && <span>{bio.length}/160</span>}
          </div>
          <Mutation mutation={SIGN_S3_MUTATION}>
            {signS3 => (
              <ImageUpload image={imageUrl || user.image} onClick={() => this.file.current.click()}>
                <Camera />
                <input
                  ref={this.file}
                  type="file"
                  accept="image/*"
                  multiple={false}
                  onChange={e => this.onFile(e, signS3)}
                />
              </ImageUpload>
            )}
          </Mutation>
        </div>
        <div className="actions">
          <Mutation mutation={UPDATE_USER_MUTATION} refetchQueries={[{ query: ME_QUERY }]}>
            {(updateUser, { loading }) => (
              <button onClick={() => this.onSave(updateUser)}>Sav{loading ? 'ing' : 'e'}</button>
            )}
          </Mutation>
          <button onClick={this.onCancel}>Cancel</button>
        </div>
      </Container>
    )
  }
}

ProfileEdit.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
  })
}

export default ProfileEdit
