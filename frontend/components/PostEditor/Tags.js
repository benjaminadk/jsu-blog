import styled from 'styled-components'
import { Row, SubHeading, IconButton } from '../styles/EditorStyles'
import { Hashtag } from 'styled-icons/fa-solid'
import { Close } from 'styled-icons/material'

const Container = styled.div`
  align-self: flex-start;
  display: grid;
  grid-template-rows: 3rem 1fr;
  .tags {
    align-self: center;
    display: flex;
    flex-wrap: wrap;
    padding: 0.5rem 0.75rem;
    .tag {
      display: flex;
      align-items: center;
      background: ${props => props.theme.grey[0]};
      color: ${props => props.theme.grey[10]};
      border: 1px dashed ${props => props.theme.grey[5]};
      padding: 0 0.5rem;
      margin-bottom: 0.5rem;
      margin-right: 0.5rem;
      span {
        font-family: 'Roboto Slab';
        font-size: 1rem;
        margin-right: 0.25rem;
      }
      svg {
        width: 1.1rem;
        height: 1.1rem;
        cursor: pointer;
        &:hover {
          color: ${props => props.theme.error};
        }
      }
    }
  }
`

class Tags extends React.Component {
  state = {
    show: false
  }

  toggleShow = () => this.setState(({ show }) => ({ show: !show }))

  render() {
    const {
      props: { tags },
      state: { show }
    } = this
    return (
      <Container show={show}>
        <Row>
          <SubHeading>Tags</SubHeading>
          <IconButton onClick={this.toggleShow}>
            <Hashtag />
          </IconButton>
        </Row>
        <div className="tags">
          {tags.map(tag => (
            <div key={tag} className="tag">
              <span>{tag}</span>
              <Close />
            </div>
          ))}
        </div>
      </Container>
    )
  }
}

export default Tags
