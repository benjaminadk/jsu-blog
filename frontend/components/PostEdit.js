import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import TextareaAutosize from 'react-autosize-textarea'
import { getSelectionPosition } from '../lib/positionHelpers'
import formatText from '../lib/formatText'
import { ME_QUERY } from './User'
import Title from './PostEditor/Title'
import Subtitle from './PostEditor/Subtitle'
import Toolbar from './PostEditor/Toolbar'
import Preview from './Preview'
import PostOptions from './PostOptions'

const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST_MUTATION {
    createPost {
      success
      message
      id
    }
  }
`

const SINGLE_POST_QUERY = gql`
  query SINGLE_POST_QUERY($id: ID!) {
    post(id: $id) {
      id
      topic
      title
      subtitle
      body
      image
      tags
      published
      updatedAt
      createdAt
    }
  }
`

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 3fr 1fr;
`

const Editor = styled.div`
  justify-self: center;
  width: 75%;
  padding: 0 1rem;
  margin-top: 1rem;
  .body {
    position: relative;
    display: ${props => (props.preview ? 'none' : 'block')};
  }
`

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  font-size: 1.4rem;
  font-family: 'Roboto';
  padding-left: 5rem;
  margin-top: 5rem;
`

class PostEdit extends React.Component {
  state = {
    preview: false,
    topic: '',
    id: '',
    title: '',
    subtitle: '',
    body: '',
    image: '',
    tags: [],
    published: false,
    clean: true,
    show: false,
    top: '',
    left: ''
  }

  async componentDidMount() {
    let res
    if (this.props.id === 'new' || !this.props.id) {
      res = await this.props.client.mutate({
        mutation: CREATE_POST_MUTATION,
        refetchQueries: [{ query: ME_QUERY }]
      })
      const { success, id } = res.data.createPost
      if (success) {
        this.setState({ id })
      }
    } else {
      res = await this.props.client.query({
        query: SINGLE_POST_QUERY,
        variables: { id: this.props.id }
      })
      const { id, topic, title, subtitle, body, image, tags, published } = res.data.post
      this.setState({ id, topic, title, subtitle, body, image, tags, published })
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('mousedown', this.onClosePopup)
  }

  onUpdatePost = async updatePost => {
    const { id, topic, title, subtitle, body, image, tags, published } = this.state
    const data = { topic, title, subtitle, body, image, published, tags: { set: tags } }
    await updatePost({
      variables: { id, data },
      refetchQueries: [{ query: SINGLE_POST_QUERY, variables: { id } }]
    })
    this.setState({ clean: true })
  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value, clean: false })
  }

  onSelect = e => {
    const { selectionStart, selectionEnd } = e.target
    if (selectionStart === selectionEnd) {
      return this.setState({ show: false })
    }
    document.body.addEventListener('mousedown', this.onClosePopup)
    const [top, left] = getSelectionPosition(this.textarea)
    this.setState({ show: true, top, left })
  }

  onClosePopup = e => {
    const { tagName, className } = e.target
    const ignore = ['svg', 'path']
    if (className === 'action' || ignore.includes(tagName) || e.target === this.textarea) return
    document.body.removeEventListener('mousedown', this.onClosePopup)
    this.setState({ show: false })
  }

  textDecorator = mode => {
    const [cbMode, body, start, end] = formatText(mode, this.textarea)
    this.setState({ body }, () => this.textDecoratorCallback(cbMode, start, end))
  }

  textDecoratorCallback = (mode, start, end) => {
    let offset
    if (mode === 'bold.add') {
      offset = 2
    } else if (mode === 'bold.sub') {
      offset = -2
    }
    this.textarea.setSelectionRange(start + offset, end + offset)
    this.textarea.focus()
  }

  setPreview = () => this.setState(({ preview }) => ({ preview: !preview }))

  setPublished = () => this.setState(({ published }) => ({ published: !published, clean: false }))

  setImage = image => this.setState({ image, clean: false })

  setTags = tags => this.setState({ tags, clean: false })

  render() {
    const {
      state: {
        topic,
        title,
        subtitle,
        body,
        image,
        tags,
        published,
        clean,
        show,
        top,
        left,
        preview
      },
      props: { user }
    } = this
    return (
      <Container>
        <Editor preview={preview}>
          <Title title={title} onChange={this.onChange} />
          <Subtitle subtitle={subtitle} onChange={this.onChange} />
          <div className="body">
            <Toolbar show={show} top={top} left={left} textDecorator={this.textDecorator} />
            <Textarea
              innerRef={el => (this.textarea = el)}
              placeholder="Markdown your story..."
              name="body"
              value={body}
              onChange={this.onChange}
              onSelect={this.onSelect}
              rows={20}
              maxRows={100}
              spellCheck={false}
            />
          </div>
          <Preview preview={preview} markdown={body} />
        </Editor>
        <PostOptions
          topic={topic}
          preview={preview}
          image={image}
          published={published}
          tags={tags}
          clean={clean}
          user={user}
          onChange={this.onChange}
          setPublished={this.setPublished}
          setImage={this.setImage}
          setTags={this.setTags}
          onUpdatePost={this.onUpdatePost}
          setPreview={this.setPreview}
        />
      </Container>
    )
  }
}

export default withApollo(PostEdit)
