import styled from 'styled-components'
import axios from 'axios'
import { Mutation } from 'react-apollo'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import { Upload, Copy } from 'styled-icons/icomoon'
import { SIGN_S3_MUTATION } from './ProfileEdit'
import formatFilename from '../lib/formatFilename'
import copyToClipboard from '../lib/copyToClipboard'

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 1rem;
  padding: 0 1rem;
  margin-top: 1rem;
  .heading {
    line-height: 1.5;
    font-family: 'Roboto Slab';
    font-size: 2rem;
    color: ${props => props.theme.grey[2]};
    border-bottom: 1px dashed ${props => props.theme.grey[1]};
  }
  .content {
    display: grid;
    grid-template-rows: 22rem 1fr;
    grid-gap: 2.5rem;
  }
`

const Dropzone = styled.div`
  justify-self: center;
  align-self: center;
  position: relative;
  width: 20rem;
  height: 20rem;
  display: grid;
  justify-items: center;
  align-items: center;
  background: ${props => props.theme.grey[0]};
  background-image: ${props => (props.image ? `url("${props.image}")` : 'none')};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  border: ${props =>
    props.image ? `1px solid ${props.theme.grey[0]}` : `2px dashed ${props.theme.grey[5]}`};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => (props.image ? props.theme.shadows[1] : 'none')};
  cursor: pointer;
  input[type='file'] {
    display: none;
  }
  .message {
    display: ${props => (props.image ? 'none' : 'flex')};
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto Slab';
    background: transparent;
    & > :first-child {
      font-size: 1.5rem;
      color: ${props => props.theme.grey[10]};
    }
    & > :last-child {
      font-size: 1.25rem;
      color: ${props => props.theme.grey[5]};
    }
  }
`

const Uploader = styled.div`
  padding: 0.5rem;
  input[type='text'] {
    width: 100%;
    border: 0.5px dashed ${props => props.theme.grey[5]};
    outline: ${props => (props.copied ? `5px solid ${props.theme.primary}` : 'none')};
    background: ${props => props.theme.grey[0]};
    color: ${props => props.theme.grey[10]};
    font-family: 'Roboto Slab';
    font-size: 1rem;
    text-align: center;
    padding: 0.5rem 0.25rem;
  }
  input[type='file'] {
    display: none;
  }
  .icons {
    display: grid;
    grid-template-columns: 1fr repeat(2, 5rem);
    justify-content: flex-end;
    align-items: center;
    & > :first-child {
      font-family: 'Roboto Slab';
      font-size: 1.5rem;
      color: ${props => props.theme.grey[10]};
    }
    .icon {
      width: 5rem;
      display: grid;
      justify-items: center;
      align-items: center;
      color: ${props => props.theme.grey[10]};
      cursor: pointer;
      transition: color 0.25s;
      &:hover {
        color: ${props => props.theme.grey[13]};
      }
      svg {
        width: 2rem;
        height: 2rem;
        color: inherit;
      }
    }
  }
`

export default class Images extends React.Component {
  state = {
    imageUrl: '',
    copied: false
  }

  dropzone1 = React.createRef()
  dropzone2 = React.createRef()

  onFile = async (e, signS3, featured) => {
    const file = e.target.files[0]
    if (!file) return
    NProgress.start()
    const { id } = this.props.user
    const filename = formatFilename('images', id, file.name)
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
          featured && this.props.setImage(imageUrl)
          this.setState({ imageUrl })
        }
      }
    })
  }

  onCopyClick = () => {
    const { imageUrl } = this.state
    if (!imageUrl) return
    copyToClipboard(imageUrl)
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 5000)
    })
  }

  render() {
    const {
      state: { imageUrl, copied },
      props: { image }
    } = this
    return (
      <Mutation mutation={SIGN_S3_MUTATION}>
        {(signS3, { loading, error }) => (
          <Container>
            <div className="heading">Images</div>
            <div className="content">
              <Dropzone image={image} onClick={() => this.dropzone1.current.click()}>
                <div className="message">
                  <span>Featured Image</span> <span>{loading ? 'Uploading...' : 'Click to +'}</span>
                </div>
                <input
                  ref={this.dropzone1}
                  type="file"
                  accept="image/*"
                  multiple={false}
                  onChange={e => this.onFile(e, signS3, true)}
                />
              </Dropzone>
              <Uploader copied={copied}>
                <div className="icons">
                  <span>Upload Image</span>
                  <div className="icon" onClick={() => this.dropzone2.current.click()}>
                    <Upload />
                  </div>
                  <div className="icon" onClick={this.onCopyClick}>
                    <Copy />
                  </div>
                </div>
                <input
                  type="text"
                  value={copied ? 'Copied to clipboard 🌼' : imageUrl}
                  placeholder="Copy & paste urls from here into your post."
                  readOnly
                />
                <input
                  ref={this.dropzone2}
                  type="file"
                  accept="image/*"
                  multiple={false}
                  onChange={e => this.onFile(e, signS3, false)}
                />
              </Uploader>
            </div>
          </Container>
        )}
      </Mutation>
    )
  }
}

Images.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  image: PropTypes.string.isRequired,
  setImage: PropTypes.func.isRequired
}
