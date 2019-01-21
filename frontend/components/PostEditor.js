import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import TextareaAutosize from 'react-autosize-textarea'
import getCaretCoordinates from 'textarea-caret'
import getPopupPosition from '../lib/popupPosition'
import { ME_QUERY } from './User'
import Title from './PostEditor/Title'
import Subtitle from './PostEditor/Subtitle'
import Toolbar1 from './PostEditor/Toolbar1'
import Toolbar2 from './PostEditor/Toolbar2'
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

class PostEditor extends React.Component {
  state = {
    id: '',
    title: '',
    subtitle: '',
    body: '',
    image: '',
    tags: [],
    published: false,
    clean: true,
    expand: false,
    expandTop: 0.01,
    popup: false,
    popupTop: '',
    popupLeft: '',
    preview: false
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
      const { id, title, subtitle, body, image, tags, published } = res.data.post
      this.setState({ id, title, subtitle, body, image, tags, published })
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener('mousedown', this.onClosePopup)
  }

  onUpdatePost = async updatePost => {
    const { id, title, subtitle, body, image, tags, published } = this.state
    const data = { title, subtitle, body, image, published, tags: { set: tags } }
    await updatePost({
      variables: { id, data },
      refetchQueries: [{ query: SINGLE_POST_QUERY, variables: { id } }]
    })
    this.setState({ clean: true })
  }

  onChange = e => {
    const { name, value } = e.target
    if (name === 'body') this.setExpanderTop()
    this.setState({ [name]: value, clean: false })
  }

  onFocus = e => {
    const { name } = e.target
    if (name === 'body') this.setExpanderTop()
    else this.setState({ top: null })
  }

  onSelect = e => {
    const { selectionStart, selectionEnd } = e.target
    if (selectionStart === selectionEnd) {
      return this.setState({ popup: false })
    }
    document.body.addEventListener('mousedown', this.onClosePopup)
    const [popupTop, popupLeft] = getPopupPosition(this.textarea)
    this.setState({ popup: true, popupTop, popupLeft })
  }

  onClosePopup = e => {
    const { tagName, className } = e.target
    const ignore = ['svg', 'path']
    if (className === 'action' || ignore.includes(tagName) || e.target === this.textarea) return
    document.body.removeEventListener('mousedown', this.onClosePopup)
    this.setState({ popup: false })
  }

  textDecorator = mode => {
    const { value, selectionStart: start, selectionEnd: end } = this.textarea
    const selection = value.substring(start, end)
    let body, cbMode
    if (mode === 'bold') {
      if (!selection.trim()) {
        cbMode = mode + '.add'
        body = value.substring(0, start) + ' **bold text** ' + value.substring(end)
      } else if (
        value.substring(start - 2, start) === '**' &&
        value.substring(end, end + 2) === '**'
      ) {
        cbMode = mode + '.sub'
        body = value.substring(0, start - 2) + selection + value.substring(end + 2)
      } else {
        cbMode = mode + '.add'
        body = value.substring(0, start) + `**${selection.trim()}**` + value.substring(end)
      }
    }
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

  setExpanderTop = () => {
    const { top } = getCaretCoordinates(this.textarea, this.textarea.selectionStart)
    this.setState({ expandTop: top })
  }

  toggleExpander = () => this.setState(({ expand }) => ({ expand: !expand }))

  togglePreview = () => this.setState(({ preview }) => ({ preview: !preview, expand: false }))

  setPublished = () => this.setState(({ published }) => ({ published: !published, clean: false }))

  setImage = image => this.setState({ image, clean: false })

  setTags = tags => this.setState({ tags, clean: false })

  render() {
    const {
      state: {
        title,
        subtitle,
        body,
        image,
        tags,
        published,
        clean,
        expand,
        expandTop,
        popup,
        popupTop,
        popupLeft,
        preview
      },
      props: { user }
    } = this
    return (
      <Container>
        <Editor preview={preview} showSubtitle={Boolean(subtitle.length)}>
          <Title title={title} onChange={this.onChange} onFocus={this.onFocus} />
          <Subtitle subtitle={subtitle} onChange={this.onChange} onFocus={this.onFocus} />
          <div className="body">
            <Toolbar1
              top={expandTop}
              expand={expand}
              toggleExpander={this.toggleExpander}
              togglePreview={this.togglePreview}
            />
            <Toolbar2
              show={popup}
              top={popupTop}
              left={popupLeft}
              textDecorator={this.textDecorator}
            />
            <Textarea
              innerRef={el => (this.textarea = el)}
              placeholder={expand ? '' : 'Markdown your story...'}
              name="body"
              value={body}
              onChange={this.onChange}
              onFocus={this.onFocus}
              onSelect={this.onSelect}
              rows={20}
              maxRows={100}
            />
          </div>
          <Preview preview={preview} markdown={body} />
        </Editor>
        <PostOptions
          preview={preview}
          image={image}
          published={published}
          tags={tags}
          clean={clean}
          user={user}
          setPublished={this.setPublished}
          setImage={this.setImage}
          setTags={this.setTags}
          onUpdatePost={this.onUpdatePost}
          togglePreview={this.togglePreview}
        />
      </Container>
    )
  }
}

export default withApollo(PostEditor)
