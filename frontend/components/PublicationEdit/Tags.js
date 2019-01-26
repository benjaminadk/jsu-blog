import styled from 'styled-components'
import { Close } from 'styled-icons/material'
import { Row, Label } from '../styles/PublicationEditStyles'

const Container = styled.div`
  .tags {
    display: flex;
    flex-wrap: wrap;
    & > * {
      border-radius: ${props => props.theme.borderRadius};
      color: ${props => props.theme.grey[10]};
      background: ${props => props.theme.grey[1]};
      font-family: 'Roboto Slab';
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
    }
    .tag {
      display: flex;
      align-items: center;
      padding: 0.5rem 1rem;
      margin-right: 1rem;
      svg {
        width: 1rem;
        height: 1rem;
        margin-left: 0.5rem;
        cursor: pointer;
        &:hover {
          color: ${props => props.theme.error};
        }
      }
    }
  }
  .note {
    font-size: 1.25rem;
    font-family: 'Roboto Slab';
    color: ${props => props.theme.grey[5]};
  }
`

const TagInput = styled.input.attrs(props => ({
  type: 'text',
  placeholder: 'Add a tag...',
  spellCheck: false,
  style: {
    width: props.tag.length > 8 ? `${props.tag.length}rem` : '10rem'
  }
}))`
  display: ${props => (props.tags.length >= 5 ? 'none' : 'inline')};
  padding: 1rem;
`

class Tags extends React.Component {
  state = {
    tag: ''
  }

  onChange = e => {
    const { value } = e.target
    if (value[value.length - 1] === ',') {
      const { tags, setTags } = this.props
      tags.push(value.slice(0, value.length - 1))
      setTags(tags)
      return this.setState({ tag: '' })
    }
    this.setState({ tag: value })
  }

  onKeyDown = e => {
    if (e.keyCode === 13) {
      const {
        props: { tags, setTags },
        state: { tag }
      } = this
      if (!tag) return
      tags.push(tag)
      setTags(tags)
      return this.setState({ tag: '' })
    }
  }

  onDelete = index => {
    const { tags, setTags } = this.props
    setTags(tags.filter((t, i) => i !== index))
  }

  render() {
    const {
      props: { tags },
      state: { tag }
    } = this
    return (
      <Row>
        <Label>Tags</Label>
        <Container>
          <div className="tags">
            {tags.map((tag, i) => (
              <div key={tag} className="tag">
                {tag}
                <Close onClick={() => this.onDelete(i)} />
              </div>
            ))}
            <TagInput
              tags={tags}
              tag={tag}
              value={tag}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
            />
          </div>
          <div className="note">
            Adding tags (up to 5) allows people to search for and discover your publication.
          </div>
        </Container>
      </Row>
    )
  }
}

export default Tags
