import { withApollo } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import TextareaAutosize from 'react-autosize-textarea'
import getCaretCoordinates from 'textarea-caret'
import { lighten } from 'polished'
import Toolbar1 from './Toolbar1'
import Toolbar2 from './Toolbar2'
import Preview from './Preview'
import getPopupPosition from '../lib/popupPosition'
import md from '../lib/md'
import Images from './Images'

const CREATE_POST_MUTATION = gql`
  mutation CREATE_POST_MUTATION {
    createPost {
      success
      message
      id
    }
  }
`

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 3fr 1fr;
`

const Editor = styled.div`
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
    justify-self: center;
    width: 75%;
    .title,
    .subtitle {
      position: relative;
      padding-left: 5rem;
      font-family: 'Roboto Slab';
      span {
        display: ${props => (props.showTitle ? 'block' : 'none')};
        position: absolute;
        top: 1.5rem;
        left: -6rem;
        font-size: 1.1rem;
        color: ${props => props.theme.grey[5]};
      }
      input {
        width: 100%;
        font-size: 4.25rem;
        font-family: inherit;
      }
    }
    .title {
      border-left: 0.5px solid ${props => (props.showTitle ? props.theme.grey[5] : 'none')};
    }
    .subtitle {
      border-left: 0.5px solid ${props => (props.showSubtitle ? props.theme.grey[5] : 'none')};
      span {
        display: ${props => (props.showSubtitle ? 'block' : 'none')};
        top: 0.5rem;
      }
      input {
        font-size: 2.5rem;
        color: ${props => props.theme.grey[10]};
      }
    }
    .body {
      position: relative;
      display: ${props => (props.preview ? 'none' : 'block')};
    }
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
    title: '',
    subtitle: '',
    body: md,
    expand: false,
    expandTop: 0.01,
    popup: false,
    popupTop: '',
    popupLeft: '',
    preview: false,
    image: ''
  }

  async componentDidMount() {
    if (this.props.id === 'new' || !this.props.id) {
      const res = await this.props.client.mutate({
        mutation: CREATE_POST_MUTATION
      })
      const { success, id } = res.data.createPost
      if (success) {
        this.setState({ id })
      }
    } else {
      //lookup post
    }
    this.textarea && this.textarea.focus()
  }

  componentWillUnmount() {
    document.body.removeEventListener('mousedown', this.onClosePopup)
  }

  onChange = e => {
    const { name, value } = e.target
    if (name === 'body') this.setExpanderTop()
    this.setState({ [name]: value })
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

  setImage = image => this.setState({ image })

  render() {
    const {
      state: {
        title,
        subtitle,
        body,
        expand,
        expandTop,
        popup,
        popupTop,
        popupLeft,
        preview,
        image
      },
      props: { user }
    } = this
    return (
      <Container>
        <Editor
          preview={preview}
          showTitle={Boolean(title.length)}
          showSubtitle={Boolean(subtitle.length)}
        >
          <div className="heading">{preview ? 'Preview' : 'Editor'}</div>
          <div className="content">
            <div className="title">
              <span>Title</span>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={title}
                onChange={this.onChange}
                onFocus={this.onFocus}
              />
            </div>
            <div className="subtitle">
              <span>Subtitle</span>
              <input
                type="text"
                name="subtitle"
                placeholder="Subtitle"
                value={subtitle}
                onChange={this.onChange}
                onFocus={this.onFocus}
              />
            </div>
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
            <Preview preview={preview} markdown={body} togglePreview={this.togglePreview} />
          </div>
        </Editor>
        <Images image={image} user={user} setImage={this.setImage} />
      </Container>
    )
  }
}

export default withApollo(PostEditor)