import styled from 'styled-components'
import TextareaAutosize from 'react-autosize-textarea'
import getCaretCoordinates from 'textarea-caret'
import { lighten } from 'polished'
import Toolbar1 from './Toolbar1'
import Toolbar2 from './Toolbar2'
import getPopupPosition from '../lib/popupPosition'

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-gap: 1rem;
  padding: 0 1rem;
  margin-top: 1rem;
  .heading {
    line-height: 1.5;
    font-size: 2rem;
    color: ${props => props.theme.grey[5]};
    border-bottom: 1px dashed ${props => props.theme.grey[1]};
  }
  .content {
    justify-self: center;
    width: 75%;
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
    }
  }
`

const Textarea = styled(TextareaAutosize)`
  width: 100%;
  font-size: 1.75rem;
  text-align: justify;
  padding-left: 5rem;
  margin-top: 5rem;
`

const lorem =
  'But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure'

export default class Editor extends React.Component {
  state = {
    title: '',
    subtitle: '',
    body: lorem,
    expand: false,
    expandTop: 0.01,
    popup: false,
    popupTop: '',
    popupLeft: ''
  }

  componentDidMount() {
    this.textarea && this.textarea.focus()
  }

  componentWillUnmount() {
    document.body.removeEventListener('mousedown', this.closePopup)
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

  onSelect = e => {
    const { value, selectionStart, selectionEnd } = e.target
    if (selectionStart === selectionEnd) return
    document.body.addEventListener('mousedown', this.closePopup)
    const selection = value.substring(selectionStart, selectionEnd)
    const [popupTop, popupLeft] = getPopupPosition(this.textarea)
    this.setState({ popup: true, popupTop, popupLeft })
  }

  closePopup = e => {
    const { tagName, className } = e.target
    const ignore = ['svg', 'path']
    if (className === 'action' || ignore.includes(tagName)) return
    document.body.removeEventListener('mousedown', this.closePopup)
    this.setState({ popup: false })
  }

  setTop = () => {
    const { top } = getCaretCoordinates(this.textarea, this.textarea.selectionStart)
    this.setState({ expandTop: top })
  }

  toggleExpand = () => this.setState(({ expand }) => ({ expand: !expand }))

  render() {
    const {
      state: { title, subtitle, body, expand, expandTop, popup, popupTop, popupLeft }
    } = this
    return (
      <Container
        showTitle={Boolean(title.length)}
        showSubtitle={Boolean(subtitle.length)}
        popup={popup}
        popupTop={popupTop}
        popupLeft={popupLeft}
      >
        <div className="heading">Editor</div>
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
              toggleExpand={this.toggleExpand}
              togglePreview={this.togglePreview}
            />
            <Toolbar2 show={popup} top={popupTop} left={popupLeft} />
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
        </div>
      </Container>
    )
  }
}
