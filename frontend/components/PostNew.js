import styled from 'styled-components'
import { Camera } from 'styled-icons/feather'
import { Plus, Code, ArrowBack } from 'styled-icons/boxicons-regular'
import { Eye } from 'styled-icons/octicons'
import TextareaAutosize from 'react-autosize-textarea'
import getCaretCoordinates from 'textarea-caret'
import Markdown from 'markdown-to-jsx'

const Container = styled.div`
  position: relative;
  display: grid;
  justify-items: center;
  .editor {
    display: ${props => (props.preview ? 'none' : 'block')};
    width: 50%;
    margin-top: 5rem;
    .title,
    .subtitle {
      position: relative;
      padding-left: 5rem;
      span {
        display: ${props => (props.showTitle ? 'block' : 'none')};
        position: absolute;
        top: 1.5rem;
        left: -5rem;
        font-size: 1.3rem;
        color: ${props => props.theme.grey[5]};
      }
      input {
        width: 100%;
        font-size: 4.25rem;
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
      span {
        position: absolute;
        left: -5rem;
        top: ${props => `calc(${props.top}px + 4rem)`};
        width: 3rem;
        height: 3rem;
        display: grid;
        justify-items: center;
        align-items: center;
        opacity: ${props => (Boolean(props.top) ? 1 : 0)};
        background: ${props => props.theme.white};
        color: ${props => props.theme.grey[8]};
        border: 1px solid;
        border-radius: 50%;
        box-shadow: ${props => props.theme.shadows[1]};
        cursor: pointer;
        transition: color 0.1s, transform 0.2s;
        &:hover {
          color: ${props => props.theme.grey[12]};
        }
        svg {
          width: 2rem;
          height: 2rem;
          color: inherit;
        }
      }
      .plus {
        transform: rotate(${props => (props.expand ? '45deg' : 0)});
      }
      .camera {
        left: 0;
        transform: scale(${props => (props.expand ? 1 : 0)});
        transition: transform 0.2s ${props => (props.expand ? 0 : '.1s')};
        svg {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
      .code {
        left: 3.5rem;
        transform: scale(${props => (props.expand ? 1 : 0)});
        transition: transform 0.2s ${props => (props.expand ? '.2s' : 0)};
        svg {
          width: 1.75rem;
          height: 1.75rem;
        }
      }
      .eye {
        left: 6.95rem;
        transform: scale(${props => (props.expand ? 1 : 0)});
        transition: transform 0.2s ${props => (props.expand ? '.3s' : 0)};
        svg {
          width: 1.75rem;
          height: 1.75rem;
        }
      }
    }
  }
  .preview {
    display: ${props => (props.preview ? 'block' : 'none')};
    align-self: center;
    width: 50%;
    .header {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      svg {
        width: 3rem;
        height: 3rem;
      }
    }
  }
`

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  font-size: 1.75rem;
  padding-left: 5rem;
  margin-top: 5rem;
`

class PostNew extends React.Component {
  state = {
    title: '',
    subtitle: '',
    body: '',
    top: 0.01,
    expand: false,
    preview: false
  }

  componentDidMount() {
    this.textarea && this.textarea.focus()
  }

  onChange = e => {
    const { name, value } = e.target
    if (name === 'body') this.setTop()
    this.setState({ [name]: value })
  }

  onFocus = e => {
    const { name } = e.target
    if (name === 'body') this.setTop()
    else this.setState({ top: null })
  }

  setTop = () => {
    const { top } = getCaretCoordinates(this.textarea, this.textarea.selectionStart)
    this.setState({ top })
  }

  toggleExpand = () => this.setState(({ expand }) => ({ expand: !expand }))

  togglePreview = () => this.setState(({ preview }) => ({ preview: !preview, expand: false }))

  render() {
    const {
      state: { title, subtitle, body, top, expand, preview }
    } = this
    return (
      <Container
        preview={preview}
        showTitle={Boolean(title.length)}
        showSubtitle={Boolean(subtitle.length)}
        top={top}
        expand={expand}
      >
        <div className="editor">
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
            <span className="plus" onClick={this.toggleExpand}>
              <Plus />
            </span>
            <span className="camera">
              <Camera />
            </span>
            <span className="code">
              <Code />
            </span>
            <span className="eye" onClick={this.togglePreview}>
              <Eye />
            </span>
            <Textarea
              innerRef={el => (this.textarea = el)}
              placeholder={expand ? '' : 'Markdown your story...'}
              name="body"
              value={body}
              onChange={this.onChange}
              onFocus={this.onFocus}
              rows={20}
              maxRows={100}
            />
          </div>
        </div>
        <div className="preview">
          <div className="header">
            <span onClick={this.togglePreview}>
              <ArrowBack />
            </span>
            <span>Preview</span>
          </div>
          <Markdown children={body} options={{ overrides: { a: A } }} />
        </div>
      </Container>
    )
  }
}

const MarkdownLink = styled.a.attrs(props => ({
  href: props.href,
  title: props.title,
  target: 'blank'
}))`
  color: ${props => props.theme.secondary};
  text-decoration: underline;
`

const A = ({ children, ...props }) => <MarkdownLink {...props}>{children}</MarkdownLink>

export default PostNew
