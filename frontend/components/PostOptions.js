import styled from 'styled-components'
import axios from 'axios'
import { Mutation } from 'react-apollo'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import { SIGN_S3_MUTATION } from './ProfileEdit'
import formatFilename from '../lib/formatFilename'
import copyToClipboard from '../lib/copyToClipboard'
import Mode from './PostEditor/Mode'
import SaveStatus from './PostEditor/SaveStatus'
import Published from './PostEditor/Published'
import TagManager from './PostEditor/TagManager'
import Uploader from './PostEditor/Uploader'
import Featured from './PostEditor/Featured'

const Container = styled.div`
  display: grid;
  grid-template-rows: 7rem 3rem 3rem 3rem 22rem 10rem 1fr;
  grid-gap: 1rem;
  align-items: center;
  padding: 0 1rem;
  margin-top: 1rem;
`

export default class PostOptions extends React.Component {
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
      props: {
        preview,
        image,
        published,
        tags,
        clean,
        setPublished,
        setImage,
        setTags,
        onUpdatePost,
        togglePreview
      }
    } = this
    return (
      <Mutation mutation={SIGN_S3_MUTATION}>
        {(signS3, { loading, error }) => (
          <Container>
            <SaveStatus clean={clean} onClick={onUpdatePost} />
            <Mode preview={preview} onClick={togglePreview} />
            <Published published={published} onClick={setPublished} />
            <Featured
              inputRef={this.dropzone1}
              image={image}
              onClick={() => this.dropzone1.current.click()}
              onChange={e => this.onFile(e, signS3, true)}
              onDelete={() => setImage('')}
            />
            <Uploader
              inputRef={this.dropzone2}
              copied={copied}
              imageUrl={imageUrl}
              onUploadClick={() => this.dropzone2.current.click()}
              onCopyClick={this.onCopyClick}
              onChange={e => this.onFile(e, signS3, false)}
            />
            <TagManager tags={tags} setTags={setTags} />
          </Container>
        )}
      </Mutation>
    )
  }
}

PostOptions.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired
  }),
  preview: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  clean: PropTypes.bool.isRequired,
  published: PropTypes.bool.isRequired,
  setPublished: PropTypes.func.isRequired,
  setImage: PropTypes.func.isRequired,
  onUpdatePost: PropTypes.func.isRequired
}
