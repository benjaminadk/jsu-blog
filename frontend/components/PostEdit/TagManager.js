import styled, { keyframes } from 'styled-components'
import { lighten, darken } from 'polished'
import { Hashtag } from 'styled-icons/fa-solid'
import { Close } from 'styled-icons/material'
import { Row, SubHeading, IconButton } from '../styles/PostEditStyles'

const grow = keyframes`
  from {
    width: 0%;
  }
  to {
    width: 50%;
  }
`

const Container = styled.div`
  align-self: flex-start;
  display: grid;
  grid-template-rows: 3rem 1fr;
  input[type='text'] {
    width: 50%;
    border: 1px dashed ${props => props.theme.grey[5]};
    background: ${props => props.theme.grey[0]};
    color: ${props => props.theme.grey[10]};
    font-family: 'Roboto Slab';
    font-size: 1rem;
    text-align: center;
    padding: 0.5rem 1rem;
    animation: ${grow} 0.5s;
  }
  .tags {
    align-self: center;
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem 0.75rem;
  }
  .no-tags {
    justify-self: center;
    font-family: 'Roboto Slab';
    font-size: 1rem;
    border: 1px dashed ${props => props.theme.grey[5]};
    background: ${props => props.theme.grey[0]};
    color: ${props => props.theme.grey[10]};
    padding: 0rem 0.5rem;
  }
`

const Tag = styled.div`
  display: flex;
  align-items: center;
  background: ${props => lighten(0.4, props.theme.primary)};
  color: ${props => darken(0.1, props.theme.primary)};
  border-radius: ${props => props.theme.borderRadius};
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
  margin-right: 0.5rem;
  span {
    font-family: 'Roboto Slab';
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  svg {
    width: 1rem;
    height: 1rem;
    cursor: pointer;
    &:hover {
      color: ${props => props.theme.error};
    }
  }
`

class TagManager extends React.Component {
  state = {
    show: false,
    tag: ''
  }

  toggleShow = () => {
    if (this.props.tags.length === 5) return
    this.setState(({ show }) => ({ show: !show }))
  }

  onDelete = tag => {
    const { tags, setTags } = this.props
    setTags(tags.filter(t => t !== tag))
  }

  onChange = e => this.setState({ tag: e.target.value })

  onKeyDown = ({ keyCode }) => {
    if (keyCode === 13) {
      const {
        props: { tags, setTags },
        state: { tag }
      } = this
      if (!tag) return
      if (tags.includes(tag)) return
      tags.push(tag)
      setTags(tags)
      this.setState({ tag: '' })
    }
  }

  renderTags = () => {
    const { tags } = this.props
    if (!tags.length) {
      return <div className="no-tags">Add tags to improve searchability</div>
    } else {
      return (
        <div className="tags">
          {tags.map(tag => (
            <Tag key={tag}>
              <span>{tag}</span>
              <Close onClick={() => this.onDelete(tag)} />
            </Tag>
          ))}
        </div>
      )
    }
  }

  render() {
    const {
      state: { show, tag }
    } = this
    return (
      <Container show={show}>
        <Row>
          <SubHeading>Tags</SubHeading>
          {show && (
            <input
              type="text"
              value={tag}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
              autoFocus
            />
          )}
          <IconButton onClick={this.toggleShow}>
            <Hashtag />
          </IconButton>
        </Row>
        {this.renderTags()}
      </Container>
    )
  }
}

export default TagManager
